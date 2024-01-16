import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Plcaelat} from '../constants/index';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../constants/index';

export default MapViewScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({

    });
  }, []);

  const focus = () => {
    const originalRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    mapRef.current?.animateCamera({center:originalRegion, zoom: 12}, {duration: 1000});
  };

  onRegionChange = (region) => {
    console.log(region);
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      

      <View style={styles.container}>
      
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          ref={mapRef}
          onRegionChangeComplete={onRegionChange}
        >
        {Plcaelat.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
            >
            <Callout tooltip>
                <View style={{ padding: 5,backgroundColor: 'white'}}>
                <Text>{marker.title}</Text>
                <Text>
                <Image
                source={require('../image/Ocean.png')}
                style={{width:60, height: 60}}
                resizeMode='cover'
                /></Text>
                </View>
            </Callout>  
            </Marker>
          ))}
          <MapViewDirections
    origin={
        {latitude: 37.78825,
            longitude: -122.4324}
    }
    destination={
        {latitude: 37.76517930317627,
            longitude: -122.43440782651305}
    }
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='hotpink'
  />
            <MapViewDirections
    origin={
        {latitude: 37.76517930317627,
            longitude: -122.43440782651305}
    }
    destination={
        {latitude: 37.78894577400723,
            longitude: -122.45118169113994}
    }
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='red'
  />
              <MapViewDirections
    origin={
        {latitude: 37.78894577400723,
            longitude: -122.45118169113994}
    }
    destination={
        {latitude: 37.80201958608362,
            longitude: -122.44858229532838}
    }
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='green'
  />
          </MapView>
          
      </View>
      <TouchableOpacity onPress={focus}>
          <View style={ styles.focusBtn}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    marginRight: 10,

  },
  focusBtn: {
    padding: 10, 
    backgroundColor:'lightgrey', 
    zIndex:1 , 
    borderColor:'grey',
    bottom:-150, 
    position: 'absolute', 
    right: -180,
    borderRadius: 5,
    borderWidth:1,
  }
});