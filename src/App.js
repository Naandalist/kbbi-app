import '../ReactotronConfig';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import Router from './router';

export default function App() {
  return <MainApp />;
}

function MainApp() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
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
