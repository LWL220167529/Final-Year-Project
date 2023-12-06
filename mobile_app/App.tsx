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
import SplashScreen from "./screens/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Profile from "./screens/Profile";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon2 from 'react-native-vector-icons/FontAwesome';
import DrawerMenu from "./components/DrawerMenu";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();





function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
      options={{ tabBarIcon: () => <MaterialIcons name="travel-explore" size={25} />}}

/>
      <Tab.Screen name="Welcome" component={WelcomeScreen} 
            options={{ tabBarIcon: () => <FontAwesomeIcon name="home" size={25} />}}

      />
      <Tab.Screen name="Profile" component={Profile} 
                  options={{ tabBarIcon: () => <FontAwesomeIcon2 name="user" size={25} />}}
                  />

    </Tab.Navigator>
  );

}


export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000);
  }, []);

  return (
    <NavigationContainer >
      {hideSplashScreen ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Destination" component={DestinationScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}
