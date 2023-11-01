/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, Component} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/Entypo';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Dimensions, ImageBackground, TextInput, FlatList,Alert
} from 'react-native';

import { NativeBaseProvider, Box,  Input, FormControl, List, Checkbox,Container,Button } from "native-base";
export default class App extends Component {
  state = {
    userName: '',
    password: ''
  };
  


  handleLoginPress = async () => {
    const { userName, password } = this.state;
    const data = { userName, password };

    try {
      const url = `http://157.230.39.43:5000/login?userName=${userName}&password=${password}`;
      const response = await fetch(url, {
        method: 'GET',
      });

      const json = await response.json();
      console.log(json);
      Alert.alert(json.message);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (< NativeBaseProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}
        showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('./image/view.jpg')}
          style={{ height: Dimensions.get('window').height / 2.5 }}>
                          
          <View style={styles.brandView}>
          <FontAwesomeIcon name="location-pin" size={100} color={'#ffffff'}/>
            <Text style={styles.brandViewText}>Travel Go</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomView}>
          <View style={{ padding: 40 }}>
            <Text style={{ color: '#4632A1', fontSize: 34 }}>Welcome</Text>
            <Text>Don't you have an account?
              <Text style={{ color: 'red', fontStyle: 'italic' }}>{' '}Register Now!</Text>
            </Text>
            <View style={{ marginTop: 50 }}>
              <FormControl style={{ borderColor: '#4632A1' }}>
                <Box>Username: </Box>
                <Input onChangeText={(text) => this.setState({ userName: text })} placeholder='E.g:Peter_123' keyboardType='email-address' InputRightElement={
                  <Box mr={4}>
                      <FontAwesomeIcon name='check' color={'green'} size={20} /></Box>
  
      }/>
              </FormControl>
              <FormControl style={{ borderColor: '#4632A1', marginTop: 20 }}>
                <Box>Password</Box>
                <Input onChangeText={(text) => this.setState({ password: text })} secureTextEntry placeholder='********' keyboardType='visible-password' InputRightElement={
                  <Box mr={4}>
                      <FontAwesomeIcon name='eye' color={'grey'} size={20} /></Box>
  
      }/>
              </FormControl>
              { }
              <View style={styles.forgotPassView}>
                <View style={{ flex: 1, marginLeft: -20 }}>
                <Container style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Checkbox borderRadius={15} value="test" color="#4632A1" accessibilityLabel="This is a dummy checkbox" defaultIsChecked style={{ marginLeft: 10 }} />
    <Text style={{ color: '#8f9195', marginLeft: 10 }}>Remember Me</Text>
  </Container>
                </View>
                <View style={{ flex: 1, marginRight: -30 }}>
                    <Container>
                      <Text style={{ color: '#8f9195', alignSelf: 'flex-end' }}>Forgot Password</Text>
                    </Container>
  
                </View>
              </View>
              <View style={{
                height:100, justifyContent : 'center', alignItems:'center',
              }}>
    <Button style={[styles.loginBtn, styles.shadowBtn, {shadowColor:'#00acee'}]} onPress={this.handleLoginPress}>
      <Text style={{color: '#ffffff'}}>Login</Text>
    </Button>
    </View>
    <View style={{flex:1}}>
              <Text style={{textAlign: 'center'}}>or Login with</Text>
              {}
              <View style={styles.socialLoginView}>
        <Button style={[styles.shadowBtn, {backgroundColor:'#4267b2'}]} borderRadius={15} padding={3}>
          <FontAwesomeIcon name='facebook' color={'white'} size={20}/>
        </Button>
        <Button style={[styles.shadowBtn, {backgroundColor:'#00acee'}]} borderRadius={15} padding={3}>
          <FontAwesomeIcon name='twitter' color={'white'} size={20}/>
        </Button>
        <Button  onPress={this.handleLoginPress} style={[styles.shadowBtn, {backgroundColor:'#db4a39'}]} borderRadius={15} padding={3}>
          <FontAwesomeIcon name='google-' color={'white'} size={20}/>
        </Button>
      </View>
    </View>
  
            </View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
    );
  };

        
      
}



const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  forgotPassView: {
    height: 50,
    marginTop: 20,
    flexDirection: 'row'
  },
  loginBtn:{
    borderRadius: 20,
    alignSelf: 'center',
     justifyContent: 'center',
     backgroundColor: '#6d28d9',
     fontWeight: 700,
     width: Dimensions.get('window').width/2,
  },
  socialLoginView:{
    flexDirection:'row',
    flex:1,
    justifyContent: 'space-around',
    marginTop:20,
  },

  shadowBtn:{
    textShadowOffset:{width:1, height:5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  }
});

