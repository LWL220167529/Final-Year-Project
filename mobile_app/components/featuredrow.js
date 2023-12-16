import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function FeaturedRow({ title, rating, description }) {
  return (
    <TouchableWithoutFeedback >
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Image
            style={styles.image}
            source={require('../image/hotel.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            <View style={{flexDirection:'row'}}>
            <AntDesign name="star" size={15} color="#F9A825" />
            <Text style={styles.descriptionText}>{rating}</Text>
            <Text style={{fontWeight:700}}>. SightSeeing</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <FontAwesome5 name="map-marker-alt" size={15} color="#lightgrey" />
    <Text style={{maxWidth: 150,}}  numberOfLines={1} ellipsizeMode="tail"> Tokyo, Tokyo Streey, Tokoe</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 10    
  },
  boxContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,    
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 8,
      height: -5,
    },
    shadowRadius:10,
  },
  image: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textContainer: {
    gap: 1,
    paddingHorizontal:10,
    marginTop: 5,
    maxWidth: 150, // Adjusted maxWidth to match the width of the image
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    marginLeft: 5,
  },
});