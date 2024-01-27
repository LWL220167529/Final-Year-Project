import React, { useEffect, useState } from 'react';
import { Dimensions,StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView, Image } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from "pinar";
import { destinationData } from '../constants';
import {TransferData} from '../TestData';
import { useRoute } from '@react-navigation/native';

export default function TestScreen() {
  const route = useRoute();
  const { HollyData } = route.params;
  const [bl_lat, setbl_lat] = useState(HollyData?.initial_input?.destination?.bl_lat);
  const [bl_lng, setbl_lng] = useState(HollyData?.initial_input?.destination?.bl_lng);
  const [tr_lat, settr_lat] = useState(HollyData?.initial_input?.destination?.tr_lat);
  const [tr_lng, settr_lng] = useState(HollyData?.initial_input?.destination?.tr_lng);

  console.log("the page has been passs"+JSON.stringify(HollyData));

  console.log("the page has been passbllat"+HollyData?.initial_input?.destination?.bl_lat+",   "+HollyData?.initial_input?.destination?.bl_lng);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  WordContainer: {
    position: 'absolute',
    backgroundColor: '#B19470',
    paddingLeft: 25,
    borderRightWidth: 0,
    paddingRight: 15,
    alignSelf: 'flex-end',
    alignContent: 'left',
    borderWidth: 3,
    borderColor: '#fff',
    top: 160,
    right: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 8,
      height: -5,
    },
    shadowRadius: 10,


  },
  slide1: {
    width: 315,
    height:700,
    borderRadius: 20,
    marginTop: 80,
    marginLeft: 50,

    backgroundColor: "#a3c9a8"
  },
  slide2: {
    width: 315,
    height:700,
    borderRadius: 20,
    marginTop: 80,
    marginLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84b59f"
  },
  slide3: {
    width: 315,
    height:700,
    borderRadius: 20,
    marginTop: 80,
    marginLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#69a297"
  },
  text: {
    color: "#1f2d3d",
    opacity: 0.7,
    fontSize: 20,
    fontWeight: "bold"
  },
  carousel:{
    height : '100%',
    width : '100%',
  },
  dotStyle:{
    backgroundColor:'lightgrey',
    height: 6,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 3
  },
  activeDotStyle:{
    backgroundColor:'white',
    height: 6,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 3
  },
  medalImg:{
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});