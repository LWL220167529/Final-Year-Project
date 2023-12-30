import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function EveryDayContent({ title, rating, description, index }) {
  return (
      <View>

        <View style={styles.boxContainer}>
        <View style={{borderRadius:30, width:20, aspectRatio:1, backgroundColor:'black', position:'absolute', top:-6}}>
                <Text style={{color:'white', alignSelf:'center'}}>{index+1}</Text>
            </View>
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
          <Image
            style={styles.image}
            source={require('../image/hotel.png')}
          />
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 15   
  },
  boxContainer: {
    marginTop: 15,

    padding:10,
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