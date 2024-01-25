import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';

export default function EhotelContent({ title, rating, category,imageSrc}) {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);  


  const HandledataChange = () => {
    setCount(count +1);
    setCurrentData(mainData[daylength+count]);
  }

  return (
    <View>
      <View style={styles.boxContainer}>
        <View style={{borderRadius:30, width:20, aspectRatio:1, backgroundColor:'black', position:'absolute', top:-6}}>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <View style={{flexDirection:'row'}}>
            <AntDesign name="star" size={15} color="#F9A825" />
            <Text style={styles.descriptionText}>{rating}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <FontAwesome5 name="map-marker-alt" size={15} color="#lightgrey" />
            <Text style={{maxWidth: 150,}}  numberOfLines={1} ellipsizeMode="tail"> {category}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5}}>
            <TouchableOpacity onPress={HandledataChange}>
              <View style={{ backgroundColor: '#FF9843', padding: 8, borderRadius: 15, width: 40, alignContent:'center' }}>
                <Foundation  name="refresh" size={18} color="black" style={{alignSelf:'center'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ItemScreen", { param: currentData })}>
              <View style={{ backgroundColor: '#3468C0', padding: 8, borderRadius: 15, width: 40, alignContent:'center' }}>
                <Foundation  name="eye" size={18} color="white" style={{alignSelf:'center'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image style={styles.image} source={{ uri: imageSrc ? imageSrc : 'https://freepngimg.com/thumb/building/156842-building-hotel-vector-free-download-png-hq.png' }} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  boxContainer: {
    marginTop: 15,

    padding:10,
    backgroundColor: '#F8F4EC',
    marginHorizontal: 10,
    borderRadius: 15, 
    borderWidth: 4,
    borderColor: '#E5E5E5',   
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 8,
      height: -5,
    },
    shadowRadius:10,
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
alignItems:'center',  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 15,
  },
  textContainer: {
    alignSelf:'flex-start',
    paddingHorizontal:10,
    marginTop: 5,
    maxWidth: 150, // Adjusted maxWidth to match the width of the image
  },
  titleText: {

    fontSize: 15,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    marginLeft: 5,
  },
});