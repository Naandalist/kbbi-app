const {withRozenite} = require('@rozenite/metro');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const defaultBlockList = defaultConfig.resolver.blockList;
const websiteBlock = /[\\/]website[\\/].*/;

const config = {
  resolver: {
    // website/ is a separate Astro app with its own node_modules.
    blockList: Array.isArray(defaultBlockList)
      ? [...defaultBlockList, websiteBlock]
      : [defaultBlockList, websiteBlock],
  },
};

module.exports = withRozenite(mergeConfig(defaultConfig, config), {
  enabled: process.env.WITH_ROZENITE === 'true',
});
