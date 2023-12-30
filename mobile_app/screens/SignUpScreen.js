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




export default function LoginScreen ({ navigation }) {

  state = {
    userName: '',
    password: ''
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');

  const handleSignup = async () => {
    try {
      const url = 'http://159.223.94.246:5000/signUp';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          mobileNumber,
          userName,
          password,
          userID,
        }),
      });

      const json = await response.json();
      console.log(json);

      Alert.alert(json.message);

      if (json.signUp) {
        // Navigate to the Home screen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };





    return (< NativeBaseProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}
        showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.brandView}>
              <Text style={{fontSize: 25, fontWeight: 500}}>Create Account</Text>
              <Text>Planning your schedule by your own!</Text>

      <View style={{margin:10}}>
      <Text>Email Address:</Text>
      <View style= {{borderRadius:15, marginTop:5}}>
        <Input
          placeholder="Enter your email address"
          onChangeText={setEmail}

        />
      </View>
      </View>
      <View style={{margin:10}}>
      <Text>Mobile Number:</Text>
      <View style= {{borderRadius:15, marginTop:5}}>
        <Input
          placeholder="Enter your mobile number"
          onChangeText={setMobileNumber}

        />
      </View>
      </View>
      <View style={{margin:10}}>
      <Text>User ID:</Text>
      <View style= {{borderRadius:15, marginTop:5}}>
        <Input
          placeholder="Enter your UserID"
          onChangeText={setUserID}

        />
      </View>
      </View>
      <View style={{margin:10}}>
      <Text>User Name:</Text>
      <View style= {{borderRadius:15, marginTop:5}}>
        <Input
          placeholder="Enter your Username"
          onChangeText={setUserName}

        />
      </View>
      </View>
      <View style={{margin:10}}>
      <Text>Password:</Text>

      <View style= {{borderRadius:15, marginTop:5}}>
        <Input
          placeholder="Enter your password"
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          InputRightElement={
            <View style={{marginRight: 15}}>
<Entypo
          name={isPasswordVisible ? 'eye-with-line' : 'eye'}
          size={20}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}/>
          </View>
          }
        />
        
      </View>
      </View>
<TouchableOpacity>
  <View style={{backgroundColor:'grey', fontSize:15, fontWeight:'bold', textAlign:'center'}}>
  <Text  onPress={handleSignup}  style={{color:'white', fontSize:15, fontWeight:'bold', textAlign:'center'}}>Create Account</Text>
  </View>
</TouchableOpacity>
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

