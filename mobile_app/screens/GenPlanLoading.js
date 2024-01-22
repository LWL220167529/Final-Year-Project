import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResData, getPlacesData } from '../api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Attractions } from '../constants';

export default function GenPlanLoading() {
  const route = useRoute();
  const { destination, name, date, numberOfDays, AllDates, SelectedHotel } = route.params;
  const [bl_lat, setbl_lat] = useState(destination[0]);
  const [bl_lng, setbl_lng] = useState(destination[1]);
  const [tr_lat, settr_lat] = useState(destination[2]);
  const [tr_lng, settr_lng] = useState(destination[3]);
  const [ResData, setResData] = useState(null);
  const [AttrData, setAttrData] = useState(null);
  const [HotData, setHotData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchResdata, fetchAttrdata] = await Promise.all([
          getResData(bl_lat, bl_lng, tr_lat, tr_lng),
          getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, 'attractions')
        ]);

        const mappedResData = fetchResdata.map((item) => {
          const { name, latitude, longitude, ranking, rating, distance, distance_string, hours, cuisine } = item;
          const weekRanges = hours && hours.week_ranges ? hours.week_ranges : [];

          return {
            name,
            latitude,
            longitude,
            ranking,
            rating,
            hours: weekRanges,
            distance,
            distance_string,
            cuisine
          };
        });

        const mappedAttrData = fetchAttrdata.map((item) => {
          const { name, latitude, longitude, ranking, rating, distance, distance_string, subcategory } = item;

          return {
            name,
            latitude,
            longitude,
            subcategory,
            ranking,
            rating,
            distance,
            distance_string
          };
        });

        setResData(mappedResData);
        setAttrData(mappedAttrData);
        setHotData(SelectedHotel);
        console.log('selectedResData: ' + JSON.stringify(mappedResData));
        console.log('selectedAttractionData: ' + JSON.stringify(mappedAttrData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('SelectedHotelEffect:', route.params.SelectedHotel);
  }, []);

  useEffect(() => {
    if (ResData !== null && AttrData !== null) {
      
      const Transferdata = {
        userID: 5,
        destination: {
          bl_lat: destination[0],
          bl_lng: destination[1],
          tr_lat: destination[2],
          tr_lng: destination[3]
        },
        Country: name,
        TravelDate: date,
        numberOfDays: numberOfDays,
        AllTravelDates: AllDates,
        RestaurantData: ResData,
        AttractionData: AttrData,
        HotelData: SelectedHotel
      };
      
      navigation.navigate('PlanGeneration', { Transferdata });
      console.log('Transferdata: ' + JSON.stringify(Transferdata));
      console.log('HotelData??: ' + SelectedHotel);

      // Rest of your code using the selectedData
    }
  }, [ResData, AttrData]);



      
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={100} color="#00ff00" />
        <Text style={{ fontSize: 20 }}>Now we help you generate Plan.</Text>
        <Text style={{ fontSize: 20 }}>Please wait for mement.</Text>

      </View>
    );
  }