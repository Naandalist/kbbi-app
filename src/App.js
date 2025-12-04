import 'react-native-gesture-handler';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {usePerformanceMonitorDevTools} from '@rozenite/performance-monitor-plugin';
import {useReactNavigationDevTools} from '@rozenite/react-navigation-plugin';

import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import Router from './router';
import {useRef} from 'react';

export default function App() {
  return <MainApp />;
}

function MainApp() {
  const navigationRef = useRef(null);
  useReactNavigationDevTools({ref: navigationRef});

  useNetworkActivityDevTools();
  usePerformanceMonitorDevTools();

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" duration={3000} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
