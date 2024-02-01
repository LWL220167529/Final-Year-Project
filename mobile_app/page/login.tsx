import React, { Component } from 'react'
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
      const url = `http://10.0.2.2:5000/login?userName=${userName}&password=${password}`;
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => this.setState({ userName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
