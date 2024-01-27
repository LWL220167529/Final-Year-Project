import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResData, getPlacesData } from '../api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Attractions } from '../constants';
import { getBigCityData } from '../api';


export default function GenPlanLoading() {
  const route = useRoute();
  const { userID,
    destination,
    Country,
    TravelDate,
    numberOfDays,
    AllTravelDates,
    budget,
    activity,
    HotelData } = route.params;
  const navigation = useNavigation();
  const [HollyData, setHollyData] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const input = Country;
        const parts = input.split(', ');

        const lastTwoParts = parts.slice(-2);
        const modifyString = lastTwoParts.join(', ');

        const cityData = await getBigCityData(modifyString);
        if (cityData) {
          const url = 'http://127.0.0.1:5000/AIPlan';
          const data = {
            userID: userID,
            destination: destination,
            Country: Country,
            TravelDate: TravelDate,
            numberOfDays: numberOfDays,
            AllTravelDates: AllTravelDates,
            budget: budget,
            activity: activity,
            HotelData: HotelData,
            CityData: cityData,
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Updated data:', responseData);
            setHollyData(responseData);
          } else {
            throw new Error('Request failed with status: ' + response.status);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    if (HollyData) {
      console.log(HollyData);
      navigation.navigate("PlanTest", { HollyData }); // Pass transferData as a parameter
    }
  }, [HollyData, navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showError ? (
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          Error occurred while generating the plan. Please try again later.
        </Text>
      ) : (
        <>
          <ActivityIndicator size={100} color="#00ff00" />
          <Text style={{ fontSize: 20 }}>Now we help you generate a Plan.</Text>
          <Text style={{ fontSize: 20 }}>Please wait for a moment.</Text>
        </>
      )}
    </View>
  );
}