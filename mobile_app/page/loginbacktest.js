import React, { Component } from 'react'
import {Icon} from 'native-base'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'

export default class App extends Component {
  state = {
    userName: '',
    password: ''
  };

  action = async () => {
    return 2;
  };

  handleLoginPress = async () => {
    const { userName, password } = this.state;
    const data = { userName, password };

    try {
      const response = await fetch('http://10.0.2.2:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),//upload data to api
      });//address host 因人而異-->(:5000)
      //我估唔洗全部解釋 如果要chat room ask me

      const json = await response.json();//get json from api
      console.log(json);//output json to console
      Alert.alert(json.message);//output message at alert
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
