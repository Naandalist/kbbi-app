jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    GestureHandlerRootView: ({children, style}) =>
      React.createElement(View, {style}, children),
  };
});

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-flash-message', () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

jest.mock('@rozenite/network-activity-plugin', () => ({
  useNetworkActivityDevTools: jest.fn(),
}));

jest.mock('@rozenite/performance-monitor-plugin', () => ({
  usePerformanceMonitorDevTools: jest.fn(),
}));

jest.mock('@rozenite/react-navigation-plugin', () => ({
  useReactNavigationDevTools: jest.fn(),
}));

jest.mock('./src/router', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: () => React.createElement(View, {testID: 'router'}),
  };
});

jest.mock('react-native-google-mobile-ads', () => {
  const noop = () => null;
  return {
    __esModule: true,
    default: () => ({initialize: jest.fn().mockResolvedValue(undefined)}),
    AdsConsent: {
      gatherConsent: jest.fn().mockResolvedValue({canRequestAds: false}),
      getConsentInfo: jest.fn().mockResolvedValue({canRequestAds: false}),
    },
    NativeAd: {
      createForAdRequest: jest.fn().mockRejectedValue(new Error('no fill')),
    },
    NativeAdView: noop,
    NativeAsset: noop,
    NativeMediaView: noop,
    NativeAssetType: {},
    NativeAdEventType: {},
    NativeMediaAspectRatio: {ANY: 1, LANDSCAPE: 2, PORTRAIT: 3, SQUARE: 4},
    TestIds: {NATIVE: 'ca-app-pub-3940256099942544/2247696110'},
  };
});
