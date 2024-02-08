import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, TextInput, Modal, SafeAreaView, Image, Pressable } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();
  // Function to handle changes in the verification code input
  const handleVerificationCodeChange = (code) => {
    setVerificationCode(code);
  };

  // Function to handle button click
  const handleButtonPress = () => {
 
    console.log('Verification code:', verificationCode);
    navigation.navigate('EmailNav');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{backgroundColor: 'lightgreen', padding: 35, borderRadius:999, marginVertical: 120}}>
        <FontAwesome6Icon name="envelope-open-text" size={80} color="blue" />  

      </View>
      <Text style={{fontSize: 20, fontWeight: '700', color: 'blue'}}>Email Verification</Text>
      <Text style={{fontSize: 15, fontWeight: '500', color: 'grey', marginVertical: 20}}>Please check your email for the verification code</Text>
      {/* Four separate input boxes for the verification code */}
      <View style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          value={verificationCode[0]}
          onChangeText={(text) => handleVerificationCodeChange(text + verificationCode.substring(1))}
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          value={verificationCode[1]}
          onChangeText={(text) => handleVerificationCodeChange(verificationCode.substring(0, 1) + text + verificationCode.substring(2))}
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          value={verificationCode[2]}
          onChangeText={(text) => handleVerificationCodeChange(verificationCode.substring(0, 2) + text + verificationCode.substring(3))}
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          value={verificationCode[3]}
          onChangeText={(text) => handleVerificationCodeChange(verificationCode.substring(0, 3) + text)}
        />
      </View>
      <View style={{flexDirection:'row', marginTop: 20}}><Text>Didn't receive the code?</Text><Pressable><Text style={{fontWeight: 500, color: 'blue'}}> Resend</Text></Pressable>
      </View>
      {/* Button to trigger verification */}
      {verificationCode.length === 4 && (
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={{flexDirection:'row'}}><Text style={styles.buttonText}>Verify</Text>
          <View style={{marginLeft: 10}}><FontAwesome6Icon name="circle-arrow-right" size={25} color="white" />  
          </View></View>
        </TouchableOpacity>
      )}
      
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