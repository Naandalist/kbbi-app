import {HomeScreen, DetailScreen, SecurityWarning} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="SecurityWarning"
        component={SecurityWarning}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
