import * as React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/itemScreen';
import InterestScreen from './screens/InterestScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SplashScreen from "./screens/SplashScreen";
import PlanGeneration from './screens/PlanGeneration';
import InterestCon2 from "./screens/InterestCon2";
import InterestCon3 from "./screens/InterestCon3";
import InterestCon4 from "./screens/InterestCon4";
import MapView from './screens/MapView';
import PlanList from "./screens/PlanList";
import InterestScreenCon from "./screens/InterestScreenCon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./screens/Profile";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon2 from 'react-native-vector-icons/FontAwesome';
import DrawerMenu from "./components/DrawerMenu";
import UserListScreen from "./screens/UserListScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: () => <MaterialIcons name="travel-explore" size={25} /> }}

      />
      <Tab.Screen name="Welcome" component={WelcomeScreen}
        options={{ tabBarIcon: () => <FontAwesomeIcon name="home" size={25} /> }}

      />
      <Tab.Screen name="Profile" component={Profile}
        options={{ tabBarIcon: () => <FontAwesomeIcon2 name="user" size={25} /> }}
      />
      <Tab.Screen name="PlanList" component={PlanList}
        options={{ tabBarIcon: () => <FontAwesomeIcon2 name="plane" size={25} /> }}
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
        <Stack.Navigator initialRouteName='MapView'>
          <Stack.Screen name="PlanGeneration" component={PlanGeneration} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MapView" component={MapView} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="UserListScreen" component={UserListScreen} />
          <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }}
          />
          <Stack.Screen name="PlanList" component={PlanList}
          />
          <Stack.Screen name="Interest" component={InterestScreen} options={{ headerShown: false }}
          />
          <Stack.Screen name="InterestCon4" component={InterestCon4} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon" component={InterestScreenCon} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon2" component={InterestCon2} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon3" component={InterestCon3} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}
