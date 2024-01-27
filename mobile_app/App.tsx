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
import SelectHotel from "./screens/SelectHotelScreen";
import Navigation from "./screens/Navigation";
import GenPlanLoading from './screens/GenPlanLoading';
import TestScreen from './screens/Test';
import PlanGenerationTest from './screens/PlanGenerationTest';
import PlanListNav from './screens/PlaanListNav';
import ProfileDetail from './screens/ProfileDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: () => <MaterialIcons name="travel-explore" size={25} /> }}

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
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="PlanGeneration" component={PlanGeneration} options={{ headerShown: false }} />
          <Stack.Screen name="GenPlanLoading" component={GenPlanLoading} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />

          
          <Stack.Screen name="PlanTest" component={PlanGenerationTest} options={{ headerShown: false }}/>
          <Stack.Screen name="PlanListNav" component={PlanListNav} />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SelectHotel" component={SelectHotel} />
          
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="UserListScreen" component={UserListScreen} />
          <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }}
          />
          <Stack.Screen name="Test" component={TestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PlanList" component={PlanList}
          />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}
          />
          <Stack.Screen name="Interest" component={InterestScreen} options={{ headerShown: false }}
          />
          <Stack.Screen name="InterestCon4" component={InterestCon4} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon" component={InterestScreenCon} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon2" component={InterestCon2} options={{ headerShown: false }} />
          <Stack.Screen name="InterestCon3" component={InterestCon3} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}
          />
          <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }}
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
