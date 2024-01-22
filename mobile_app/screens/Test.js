import React, { useState } from 'react';
import { Dimensions,StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView, Image } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from "pinar";
import { destinationData } from '../constants';

export default function TestScreen() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const height = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

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

    <TouchableOpacity style={{ marginTop:20,justifyContent:'center',alignItems:'center',alignSelf:'center',height:50,width: 50,backgroundColor: '#D8D9DA', borderRadius:999, }} onPress={hideModal}>
      <View >
    <MaterialCommunityIcon name='close-thick' size={30} color='#3D3B40' />

      </View>
    </TouchableOpacity>
          <Carousel style={styles.carousel}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          showsControls={false}
          >
      {destinationData.map((item, index) => (
        <View key={item.id} style={styles.slide1}>
<Image
  style={styles.medalImg}
  source={require('../image/forest.png')}
/> 
<View>
         <Text style={styles.text}>{item.title}</Text>
          <Text>{item.shortDescription}</Text>
          </View>
        </View>
      ))}
    <View style={styles.slide2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.slide3}>
      <Text style={styles.text}>3</Text>
    </View>
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