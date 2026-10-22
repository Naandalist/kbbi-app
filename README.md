# KBBI App

[![Version](https://img.shields.io/badge/version-7.1.2-blue.svg)](https://github.com/Naandalist/kbbi-app)
[![React Native](https://img.shields.io/badge/React%20Native-0.80-61DAFB.svg)](https://reactnative.dev)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A React Native application for Indonesian dictionary (Kamus Besar Bahasa Indonesia).

## Prerequisites

- Node.js >= 18
- npm
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))

Lockfile is `package-lock.json`.

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

## Tech Stack

- React Native 0.80
- React Navigation
- Axios
- React Native Reanimated
