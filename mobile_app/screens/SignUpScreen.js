/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
*/
import React, { Component, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Dimensions, ImageBackground, TextInput, FlatList, Alert, TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Box, Input, FormControl, List, Checkbox, Container, Button } from "native-base";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



export default function LoginScreen () {

  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');

  const handleSignup = () => {
    navigation.navigate('emailVertification');
  };

    {/*  const handleSignup = async () => {
          const url = 'http://159.223.94.246:5000/register';
    const data = {
      userName: 'google',
      password: 'google1',
      email: 'google@google.com',
      phone: 43223222,
    }; 
      try {
      const response = await axios.post(url, data);
      console.log(response.data);
      Alert.alert('Success', 'You have successfully registered an account', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LoginScreen'),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong!', [{ text: 'OK' }]);
    }
  };
*/}
  


  return (
    <NativeBaseProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.brandView}>
            <Text style={{ fontSize: 25, fontWeight: 500 }}>Create Account</Text>
            <Text>Planning your schedule by your own!</Text>

            <View style={{ margin: 10 }}>
              <Text>Email Address:</Text>
              <View style={{ borderRadius: 15, marginTop: 5 }}>
                <Input placeholder="Enter your email address" onChangeText={setEmail} />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>Mobile Number:</Text>
              <View style={{ borderRadius: 15, marginTop: 5 }}>
                <Input placeholder="Enter your mobile number" onChangeText={setMobileNumber} />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>User ID:</Text>
              <View style={{ borderRadius: 15, marginTop: 5 }}>
                <Input placeholder="Enter your UserID" onChangeText={setUserID} />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>User Name:</Text>
              <View style={{ borderRadius: 15, marginTop: 5 }}>
                <Input placeholder="Enter your Username" onChangeText={setUserName} />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>Password:</Text>
              <View style={{ borderRadius: 15, marginTop: 5 }}>
                <Input placeholder="Enter your Password" onChangeText={setPassword} />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Button onPress={handleSignup}>Sign Up</Button>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </NativeBaseProvider>
  );
  }

const styles = StyleSheet.create({
  brandView: {
    gap: 5,
    margin: 20,
    marginBottom: 20,
  },
});

