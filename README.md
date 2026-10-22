# KBBI App

[![Version](https://img.shields.io/badge/version-7.1.2-blue.svg)](https://github.com/Naandalist/kbbi-app)
[![React Native](https://img.shields.io/github/package-json/dependency-version/Naandalist/kbbi-app/react-native?logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![Astro](https://img.shields.io/github/package-json/dependency-version/Naandalist/kbbi-app/astro?filename=website%2Fpackage.json&logo=astro&logoColor=white&color=FF5D01)](https://astro.build)
[![Website](https://img.shields.io/github/actions/workflow/status/Naandalist/kbbi-app/pages.yml?branch=main&label=website)](https://github.com/Naandalist/kbbi-app/actions/workflows/pages.yml)
[![Google Play](https://img.shields.io/badge/Google_Play-Kamus_KBBI-3DDC84?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.naandalist.kamus_kbbi)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A React Native application for Indonesian dictionary (Kamus Besar Bahasa Indonesia).

This repository holds the Android app and its landing page.

| Path | What it is | Stack |
| --- | --- | --- |
| Repo root | App (`com.naandalist.kamus_kbbi`) | React Native, React |
| [`website/`](./website) | Landing at [kbbi.naandalist.com](https://kbbi.naandalist.com) | Astro, React, Tailwind |

Play: [Kamus KBBI VI on Google Play](https://play.google.com/store/apps/details?id=com.naandalist.kamus_kbbi). Contact: [dev@naandalist.com](mailto:dev@naandalist.com).

## Prerequisites

- Node.js >= 18
- npm
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))

Lockfile is `package-lock.json`. The app is not a Yarn or pnpm project. `website/` is a separate npm project. Metro ignores it.

## Installation

```sh
npm install
```

If npm 7+ rejects peer dependencies, use `npm install --legacy-peer-deps`.

### iOS Setup

```sh
bundle install
bundle exec pod install
```

## Development

```sh
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Build

```sh
# Clean Android build
npm run clean

# Build APK
npm run build-apk

# Build AAB
npm run build-aab

# Test release build
npm run test-release
```

## Website

Astro 5 + React + Tailwind 3. Pages: home, [privacy](https://kbbi.naandalist.com/privacy/), [terms](https://kbbi.naandalist.com/terms/). `app-ads.txt` is served from `website/public/`.

```bash
cd website
npm install
npm run dev
npm run build
```

Output is `website/dist`. GitHub Actions (`.github/workflows/pages.yml`) deploys that folder to GitHub Pages on push to `main` when `website/**` or the workflow file changes.

Privacy policy URL for Play: `https://kbbi.naandalist.com/privacy/`.

## Tech Stack

- React Native 0.80
- React Navigation
- Axios
- React Native Reanimated

## Layout

```
src/               App screens, components, dictionary data
android/           Native Android project
ios/               Native iOS project
website/           Public landing, privacy, terms
```
