import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation() {
    const [name, setName] = useState('');
  
    useEffect(() => {
      const fetchName = async () => {
        try {
          const data = await AsyncStorage.getItem('UserData');
          const parsedData = JSON.parse(data);
          const userName = parsedData.user.userName;
          setName(userName);
          console.log('name: ' + userName);
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
  
      fetchName();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={100} color="#00ff00" />
        <Text style={{ fontSize: 20 }}>Welcome, {name}</Text>
      </View>
    );
  }