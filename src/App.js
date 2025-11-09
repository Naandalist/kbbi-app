import '../RozeniteConfig';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import Router from './router';

export default function App() {
  return <MainApp />;
}

function MainApp() {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" duration={3000} />
    </>
  );
}
