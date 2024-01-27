import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function PlanListNav() {
    const [HollyData, setPlanData] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                const id = await AsyncStorage.getItem('planID');
                const response = await fetch('http://127.0.0.1:5000/getAIPlanByID', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ planID: id}),
                });
        
                const data = await response.json();
                console.log(JSON.stringify(data));
                setPlanData(data);
        
                // Navigate to the home screen (replace 'Home' with the actual screen name)
              } catch (error) {
                // Handle any errors that occur during the fetch request
                console.error(error);
              }
        };

        fetchPlanData();
    }, []);


    useEffect(() => {
        if (HollyData != null) {
            navigation.navigate('PlanGeneration', { HollyData:HollyData?.plan?.plan });
        }
    }
        , [HollyData]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={100} color="#00ff00" />
            <Text style={{ fontSize: 20 }}>We naavigate you to Plan Page</Text>
        </View>
    );
}