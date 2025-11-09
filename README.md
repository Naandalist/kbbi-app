# KBBI App

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com/Naandalist/kbbi-app)
[![React Native](https://img.shields.io/badge/React%20Native-0.80-61DAFB.svg)](https://reactnative.dev)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A React Native application for Indonesian dictionary (Kamus Besar Bahasa Indonesia).

## Prerequisites

- Node.js >= 18
- Yarn 4.11.0
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))

## Installation

```sh
yarn install
```

### iOS Setup

```sh
bundle install
bundle exec pod install
```

## Development

```sh
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

## Build

```sh
# Clean Android build
yarn clean

# Build APK
yarn build-apk

# Build AAB
yarn build-aab

# Test release build
yarn test-release
```

## Tech Stack

- React Native 0.80
- React Navigation
- Axios
- React Native Reanimated
- jail-monkey (Security)

## Security Features

- Jailbreak detection
- Debug mode detection
- Auto-exit on insecure devices (production only)
