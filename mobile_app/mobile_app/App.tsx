import * as React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DestinationScreen from './screens/DestinationScreen';
import WelcomeScreen from './screens/WelcomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
