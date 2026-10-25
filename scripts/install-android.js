#!/usr/bin/env node
'use strict';

/**
 * Install a locally built Android artifact onto a connected device.
 *
 *   node scripts/install-android.js apk [--variant release|debug] [options]
 *   node scripts/install-android.js aab [options]
 *   node scripts/install-android.js devices
 *
 * Options:
 *   --serial <serial>   target a specific device (otherwise ANDROID_SERIAL)
 *   --downgrade         allow adb to install a lower versionCode
 *   --uninstall         uninstall the app first (useful when the signature changed)
 *   --launch            launch the app after a successful install
 *
 * Device selection order: --serial, then ANDROID_SERIAL, then the only
 * connected device. When more than one device is attached the script refuses
 * to guess and prints the available serials instead.
 *
 * An AAB cannot be pushed to a device directly, so it is converted to device
 * specific APKs with bundletool first, then installed from there.
 */

const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const APP_ID = 'com.naandalist.kamus_kbbi';
const ROOT = path.resolve(__dirname, '..');
const OUTPUTS = path.join(ROOT, 'android', 'app', 'build', 'outputs');

function fail(message, hint) {
  console.error(`\nError: ${message}`);
  if (hint) {
    console.error(`\n${hint}`);
  }
  process.exit(1);
}

function info(message) {
  console.log(message);
}

function which(bin) {
  const probe = os.platform() === 'win32' ? 'where' : 'which';
  const res = spawnSync(probe, [bin], {encoding: 'utf8'});
  if (res.status !== 0 || !res.stdout) return null;
  const first = res.stdout
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)[0];
  return first || null;
}

function sdkRoots() {
  const roots = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    path.join(os.homedir(), 'Library', 'Android', 'sdk'),
    path.join(os.homedir(), 'Android', 'Sdk'),
  ];
  return roots.filter(Boolean);
}

function resolveAdb() {
  if (process.env.ADB_PATH && fs.existsSync(process.env.ADB_PATH)) {
    return process.env.ADB_PATH;
  }
  for (const root of sdkRoots()) {
    const candidate = path.join(root, 'platform-tools', 'adb');
    if (fs.existsSync(candidate)) return candidate;
  }
  return which('adb') || null;
}

function resolveBundletool() {
  const explicit = process.env.BUNDLETOOL_PATH;
  if (explicit && fs.existsSync(explicit)) {
    return explicit.endsWith('.jar')
      ? {command: 'java', args: ['-jar', explicit]}
      : {command: explicit, args: []};
  }
  const onPath = which('bundletool');
  if (onPath) {
    return {command: onPath, args: []};
  }
  const jars = [
    ...sdkRoots().map(root => path.join(root, 'bundletool', 'bundletool.jar')),
    path.join(os.homedir(), 'bundletool', 'bundletool.jar'),
    path.join(os.homedir(), 'bundletool-all.jar'),
    path.join(ROOT, 'bundletool.jar'),
    path.join(ROOT, 'tools', 'bundletool.jar'),
  ];
  for (const jar of jars) {
    if (fs.existsSync(jar)) {
      return {command: 'java', args: ['-jar', jar]};
    }
  }
  return null;
}

function capture(command, args) {
  const res = spawnSync(command, args, {encoding: 'utf8'});
  if (res.error) throw res.error;
  if (res.status !== 0) {
    const detail = (res.stderr || res.stdout || '').trim();
    throw new Error(detail || `${command} exited with code ${res.status}`);
  }
  return res.stdout || '';
}

function listDevices(adb) {
  const output = capture(adb, ['devices', '-l']);
  const devices = [];
  for (const line of output.split('\n').slice(1)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const [serial, state, ...rest] = trimmed.split(/\s+/);
    if (state !== 'device') continue;
    const model = rest.find(token => token.startsWith('model:'));
    devices.push({serial, model: model ? model.slice('model:'.length) : ''});
  }
  return devices;
}

function describeDevices(devices) {
  return devices
    .map(
      device =>
        `  - ${device.serial}${device.model ? ` (${device.model})` : ''}`,
    )
    .join('\n');
}

function pickDevice(adb, explicitSerial) {
  const devices = listDevices(adb);
  const requested = explicitSerial || process.env.ANDROID_SERIAL;

  if (devices.length === 0) {
    fail(
      'tidak ada device yang terhubung',
      'Colok device dengan USB debugging aktif, atau nyalakan emulator, lalu cek dengan:\n  npm run adb-devices',
    );
  }

  if (requested) {
    const match = devices.find(device => device.serial === requested);
    if (!match) {
      fail(
        `device "${requested}" tidak ada di daftar`,
        `Device yang tersedia:\n${describeDevices(devices)}`,
      );
    }
    return match.serial;
  }

  if (devices.length > 1) {
    fail(
      'lebih dari satu device terhubung, tentukan target',
      `Device yang tersedia:\n${describeDevices(
        devices,
      )}\n\nPilih salah satu:\n  npm run install-apk -- --serial <serial>\n  atau set ANDROID_SERIAL=<serial> sebelum menjalankan perintahnya`,
    );
  }

  return devices[0].serial;
}

function resolveApk(variant) {
  const dir = path.join(OUTPUTS, 'apk', variant);
  const expected = path.join(dir, `app-${variant}.apk`);
  if (fs.existsSync(expected)) return expected;
  if (!fs.existsSync(dir)) return null;
  const candidates = fs
    .readdirSync(dir)
    .filter(name => name.endsWith('.apk'))
    .map(name => path.join(dir, name));
  if (candidates.length === 0) return null;
  return candidates.sort(
    (a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs,
  )[0];
}

function resolveAab() {
  const dir = path.join(OUTPUTS, 'bundle', 'release');
  const expected = path.join(dir, 'app-release.aab');
  if (fs.existsSync(expected)) {
    return expected;
  }
  if (!fs.existsSync(dir)) {
    return null;
  }
  const candidates = fs
    .readdirSync(dir)
    .filter(name => name.endsWith('.aab'))
    .map(name => path.join(dir, name));
  if (candidates.length === 0) {
    return null;
  }
  return candidates.sort(
    (a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs,
  )[0];
}

function readKeystoreProperties() {
  const file = path.join(ROOT, 'android', 'keystore.properties');
  if (!fs.existsSync(file)) {
    return null;
  }
  const values = {};
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }
    values[trimmed.slice(0, separator).trim()] = trimmed
      .slice(separator + 1)
      .trim();
  }
  const storeFile = values.MYAPP_UPLOAD_STORE_FILE;
  const keyAlias = values.MYAPP_UPLOAD_KEY_ALIAS;
  if (!storeFile || !keyAlias) {
    return null;
  }
  return {
    // The path in keystore.properties is relative to the android/app folder.
    storeFile: path.resolve(ROOT, 'android', 'app', storeFile),
    keyAlias,
    storePassword: values.MYAPP_UPLOAD_STORE_PASSWORD || '',
  };
}

function printInstalledVersion(adb, serial) {
  try {
    const dump = capture(adb, [
      '-s',
      serial,
      'shell',
      'dumpsys',
      'package',
      APP_ID,
    ]);
    const versionName = dump.match(/versionName=(\S+)/);
    const versionCode = dump.match(/versionCode=(\d+)/);
    const parts = [];
    if (versionName) parts.push(`versionName=${versionName[1]}`);
    if (versionCode) parts.push(`versionCode=${versionCode[1]}`);
    if (parts.length > 0) info(`Terpasang: ${parts.join(' ')}`);
  } catch {
    // The dump is only a convenience, never fail the install because of it.
  }
}

function launchApp(adb, serial) {
  try {
    capture(adb, [
      '-s',
      serial,
      'shell',
      'monkey',
      '-p',
      APP_ID,
      '-c',
      'android.intent.category.LAUNCHER',
      '1',
    ]);
    info(`Aplikasi ${APP_ID} dijalankan.`);
  } catch {
    info('Gagal menjalankan aplikasi, tapi instalasi tetap sukses.');
  }
}

function installApk(options) {
  const adb = resolveAdb();
  if (!adb) {
    fail(
      'adb tidak ditemukan',
      'Pasang Android SDK Platform Tools, atau set ADB_PATH ke path adb yang benar.',
    );
  }

  const variant = options.variant || 'release';
  const apkPath = resolveApk(variant);
  if (!apkPath) {
    fail(
      `APK varian ${variant} belum ada`,
      `Buat dulu dengan:\n  npm run build-apk${
        variant === 'debug' ? ':debug' : ''
      }`,
    );
  }

  const serial = pickDevice(adb, options.serial);
  const relative = path.relative(ROOT, apkPath);
  const size = (fs.statSync(apkPath).size / (1024 * 1024)).toFixed(1);
  info(`Device  : ${serial}`);
  info(`APK     : ${relative} (${size} MB)`);

  if (options.uninstall) {
    const installed = capture(adb, [
      '-s',
      serial,
      'shell',
      'pm',
      'list',
      'packages',
      APP_ID,
    ]);
    if (installed.includes(APP_ID)) {
      info('Menghapus versi lama dari device...');
      const uninstall = spawnSync(adb, ['-s', serial, 'uninstall', APP_ID], {
        encoding: 'utf8',
      });
      if (uninstall.stdout) process.stdout.write(uninstall.stdout);
      if (uninstall.stderr) process.stderr.write(uninstall.stderr);
      if (uninstall.status !== 0) {
        info('Peringatan: uninstall gagal, lanjutkan instalasi.');
      }
    } else {
      info('Aplikasi belum terpasang di device ini, uninstall dilewati.');
    }
  }

  const args = ['-s', serial, 'install', '-r'];
  if (options.downgrade) args.push('-d');
  args.push(apkPath);

  info('Memasang...');
  const res = spawnSync(adb, args, {encoding: 'utf8'});
  if (res.stdout) process.stdout.write(res.stdout);
  if (res.stderr) process.stderr.write(res.stderr);

  if (res.status !== 0) {
    const output = `${res.stdout || ''}${res.stderr || ''}`;
    let hint = null;
    if (output.includes('INSTALL_FAILED_UPDATE_INCOMPATIBLE')) {
      hint =
        'Tanda tangan APK berbeda dengan yang terpasang. Coba:\n  npm run install-apk -- --uninstall';
    } else if (output.includes('INSTALL_FAILED_VERSION_DOWNGRADE')) {
      hint =
        'versionCode di device lebih besar. Flag --downgrade hanya berlaku bila aplikasi yang terpasang bisa di-debug, jadi biasanya perlu:\n  npm run install-apk -- --uninstall';
    }
    fail('instalasi gagal', hint);
  }

  info('Instalasi berhasil.');
  printInstalledVersion(adb, serial);
  if (options.launch) launchApp(adb, serial);
}

function installAab(options) {
  const adb = resolveAdb();
  if (!adb) {
    fail(
      'adb tidak ditemukan',
      'Pasang Android SDK Platform Tools, atau set ADB_PATH ke path adb yang benar.',
    );
  }

  const bundletool = resolveBundletool();
  if (!bundletool) {
    fail(
      'bundletool tidak ditemukan',
      'AAB tidak bisa dipasang langsung dengan adb, butuh bundletool. Pasang salah satu:\n  brew install bundletool\n  atau unduh manual:\n  curl -L -o ~/bundletool.jar https://github.com/google/bundletool/releases/latest/download/bundletool-all.jar\n  lalu set BUNDLETOOL_PATH=~/bundletool.jar',
    );
  }

  const bundlePath = resolveAab();
  if (!bundlePath) {
    fail('AAB belum ada', 'Buat dulu dengan:\n  npm run build-aab');
  }

  const serial = pickDevice(adb, options.serial);
  const relative = path.relative(ROOT, bundlePath);
  const size = (fs.statSync(bundlePath).size / (1024 * 1024)).toFixed(1);
  info(`Device  : ${serial}`);
  info(`AAB     : ${relative} (${size} MB)`);

  const apksPath = path.join(OUTPUTS, 'bundle', 'release', 'app-release.apks');
  const buildArgs = [
    'build-apks',
    `--bundle=${bundlePath}`,
    `--output=${apksPath}`,
    '--overwrite',
  ];

  const keystore = readKeystoreProperties();
  if (keystore && fs.existsSync(keystore.storeFile)) {
    buildArgs.push(
      `--ks=${keystore.storeFile}`,
      `--ks-key-alias=${keystore.keyAlias}`,
      `--ks-pass=pass:${keystore.storePassword}`,
    );
    info('Menandatangani APK dengan keystore upload.');
  } else {
    info(
      'Keystore upload tidak ditemukan, APK hasil konversi memakai debug signature.',
    );
  }

  info('Membuat APK dari AAB...');
  const build = spawnSync(
    bundletool.command,
    [...bundletool.args, ...buildArgs],
    {
      encoding: 'utf8',
    },
  );
  if (build.stdout) process.stdout.write(build.stdout);
  if (build.stderr) process.stderr.write(build.stderr);
  if (build.status !== 0) {
    fail('bundletool build-apks gagal');
  }

  info('Memasang APK hasil konversi...');
  const installArgs = [
    'install-apks',
    `--apks=${apksPath}`,
    `--device-id=${serial}`,
    `--adb=${adb}`,
  ];
  if (options.downgrade) {
    installArgs.push('--allow-downgrade');
  }
  const install = spawnSync(
    bundletool.command,
    [...bundletool.args, ...installArgs],
    {
      encoding: 'utf8',
    },
  );
  if (install.stdout) process.stdout.write(install.stdout);
  if (install.stderr) process.stderr.write(install.stderr);
  if (install.status !== 0) {
    fail('bundletool install-apks gagal');
  }

  info('Instalasi berhasil.');
  printInstalledVersion(adb, serial);
  if (options.launch) launchApp(adb, serial);
}

function showDevices() {
  const adb = resolveAdb();
  if (!adb) {
    fail(
      'adb tidak ditemukan',
      'Pasang Android SDK Platform Tools, atau set ADB_PATH ke path adb yang benar.',
    );
  }
  const devices = listDevices(adb);
  if (devices.length === 0) {
    info('Tidak ada device yang terhubung.');
    return;
  }
  info(`${devices.length} device terhubung:`);
  for (const device of devices) {
    info(`  - ${device.serial}${device.model ? ` (${device.model})` : ''}`);
  }
}

function parseArgs(argv) {
  const options = {
    variant: null,
    serial: null,
    downgrade: false,
    uninstall: false,
    launch: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--variant') {
      options.variant = argv[(index += 1)];
    } else if (arg === '--serial') {
      options.serial = argv[(index += 1)];
    } else if (arg === '--downgrade') {
      options.downgrade = true;
    } else if (arg === '--uninstall') {
      options.uninstall = true;
    } else if (arg === '--launch') {
      options.launch = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      fail(`argumen tidak dikenal: ${arg}`);
    }
  }
  return options;
}

const USAGE = `
node scripts/install-android.js apk [--variant release|debug] [--serial <serial>] [--downgrade] [--uninstall] [--launch]
node scripts/install-android.js aab [--serial <serial>] [--launch]
node scripts/install-android.js devices
`;

function main() {
  const argv = process.argv.slice(2);
  const mode = (argv[0] || 'apk').toLowerCase();
  const options = parseArgs(argv.slice(1));

  if (options.help || mode === 'help') {
    info(USAGE.trim());
    return;
  }

  if (mode === 'devices') {
    showDevices();
    return;
  }
  if (mode === 'apk') {
    installApk(options);
    return;
  }
  if (mode === 'aab') {
    installAab(options);
    return;
  }
  fail(`mode "${mode}" tidak dikenal`, USAGE.trim());
}

main();
