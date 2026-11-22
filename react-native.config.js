module.exports = {
  dependencies: {
    // 6.0.0 still reads StartupLogger getters removed in RN 0.88
    // (getRunJSBundleEndTime, getInitReactRuntimeEndTime). Keep the JS
    // package for Rozenite; skip the broken iOS native module.
    'react-native-performance': {
      platforms: {
        ios: null,
      },
    },
  },
};
