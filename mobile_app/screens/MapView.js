import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Plcaelat} from '../constants/index';

export default MapViewScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focus}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
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
      <View style={{ padding: 100 }}></View>
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
          </MapView>
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});