import React from 'react';
import {HomeScreen, SplashScreen, DetailScreen} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
