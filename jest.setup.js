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
