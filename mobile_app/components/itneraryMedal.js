import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView, Image } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from "pinar";
import { destinationData } from '../constants';

export default function ItneraryMedal({ placeData }) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const height = Dimensions.get('window').height;

  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity style={styles.WordContainer} onPress={showModal}>
        <View>
          <View style={{ alignSelf: 'center' }}>
            <MaterialCommunityIcon name='book-marker' size={30} color='#3D3B40' />
          </View>
          <Text style={{ color: '#424769', fontWeight: '700' }}>Itinerary</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={visible} onRequestClose={hideModal} animationType='fade' transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

          <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: 50, width: 50, backgroundColor: '#D8D9DA', borderRadius: 999, }} onPress={hideModal}>
            <View >
              <MaterialCommunityIcon name='close-thick' size={30} color='#3D3B40' />

            </View>
          </TouchableOpacity>
          <Carousel style={styles.carousel}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            showsControls={false}
          >
            {placeData && placeData.map((data, dayIndex) => (

              <View key={dayIndex} style={styles.slide1}>

                <Text style={{alignSelf:'center', fontWeight: 500, fontSize:30}}>Day{dayIndex + 1}</Text>
                {data?.places && data.places.map((place, index) => {
                  return (
                    <View key={index}>
                                      <Image
                  style={styles.medalImg}
                  source={{uri: place?.photo?.images?.medium?.url ? place?.photo?.images?.medium?.url: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}}
                />
                      <Text style={{fontSize:15}}>{place?.activity_info?.transportation?.details}</Text>
                      <Text style={{fontSize:15}}>{place?.activity_info?.activities_content_description}</Text>

                    </View>
                  );
                })}
              </View>


            ))}

          </Carousel>
        </View>
      </Modal>
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
    height: 720,
    borderRadius: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    marginLeft: 50,

    backgroundColor: "#a3c9a8"
  },
  slide2: {
    width: 315,
    height: 700,
    borderRadius: 20,
    marginTop: 80,
    marginLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84b59f"
  },
  slide3: {
    width: 315,
    height: 700,
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
  carousel: {
    height: '100%',
    width: '100%',
  },
  dotStyle: {
    backgroundColor: 'lightgrey',
    height: 6,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 3
  },
  activeDotStyle: {
    backgroundColor: 'white',
    height: 6,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 3
  },
  medalImg: {
    width: 110,
    height: 110,
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical: 10,
  }
});