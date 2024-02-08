import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, TextInput, Modal, SafeAreaView, Image, Pressable } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
export default function EmailNav() {
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();
  // Function to handle changes in the verification code input
  const handleVerificationCodeChange = (code) => {
    setVerificationCode(code);
  };
useEffect(() => {
    setTimeout(() => {
        console.log('Verification code:', verificationCode);
        navigation.navigate('Login');
    }
    , 3000);
}
, []);

      

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <LottieView
        source={require('../image/tickAnim.json')}
        autoPlay
        loop={false}
        style={{width: 200, height: 200}}/>


      {/* Button to trigger verification */}
          <Text style={{fontSize: 20}}>You are success to create an account!</Text>
          <View style={{marginLeft: 10}}>
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  codeInput: {
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: 50,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});