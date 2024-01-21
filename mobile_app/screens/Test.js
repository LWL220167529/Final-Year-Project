import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHotelData } from '../api';

export default function Test() {
  
const handleHotelData = () => {
    getHotelData().then((data) => {
        console.log(JSON.stringify(data));
    });

}

        

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleHotelData}>
            <Text style={{ fontSize: 20 }}>Test</Text>
        </TouchableOpacity>
      </View>
    );
  }