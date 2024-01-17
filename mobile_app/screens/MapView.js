import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Plcaelat} from '../constants/index';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../constants/index';

export default MapViewScreen = ({mainData, resData, lat, lng}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const combinedData = [...mainData, ...resData];

  useEffect(() => {
    navigation.setOptions({

    });
  }, []);

  const focus = () => {
    const originalRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    mapRef.current?.animateCamera({center:originalRegion, zoom: 10}, {duration: 1000});
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
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          ref={mapRef}
          onRegionChangeComplete={onRegionChange}
        >
{mainData && mainData.slice(0, 2).map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
                            >
            <Callout tooltip>
                <View style={{ padding: 5,backgroundColor: 'white'}}>
                <Text>{marker.name}</Text>
                <Text>
                <Image
                source={{uri: marker?.photo?.images?.thumbnail?.url ? marker?.photo?.images?.thumbnail?.url: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}}
                style={{width:60, height: 60}}
                resizeMode='cover'
                /></Text>
                </View>
            </Callout>  
            </Marker>
          ))}
          {resData && resData.slice(0, 2).map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
              >
            <Callout tooltip>
                <View style={{ padding: 5,backgroundColor: 'white'}}>
                <Text>{marker.name}</Text>
                <View>
                <Text style={{ alignContent:'center'}}>
                <Image
                 source={{uri: marker?.photo?.images?.thumbnail?.url ? marker?.photo?.images?.thumbnail?.url: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}}
                 style={{width:60, height: 60, alignSelf:'center'}}
                 resizeMode='cover'
                /></Text>
                </View>
                </View>
            </Callout>  
            </Marker>
          ))}
{combinedData && combinedData.slice(0, combinedData.length - 1).map((marker, index) => (
  <MapViewDirections
    key={index}
    origin={{
      latitude: parseFloat(combinedData[0].latitude),
      longitude: parseFloat(combinedData[0].longitude)
    }}
    destination={{
      latitude: parseFloat(combinedData[1].latitude),
      longitude: parseFloat(combinedData[1].longitude)
    }}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='hotpink'
  />
))}
             <MapViewDirections
    origin={{
      latitude: parseFloat(combinedData[1].latitude),
      longitude: parseFloat(combinedData[1].longitude)
    }}
    destination={{
      latitude: parseFloat(combinedData[2].latitude),
      longitude: parseFloat(combinedData[2].longitude)
    }}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='hotpink'
  />
              <MapViewDirections
    origin={{
      latitude: parseFloat(combinedData[2].latitude),
      longitude: parseFloat(combinedData[2].longitude)
    }}
    destination={{
      latitude: parseFloat(combinedData[3].latitude),
      longitude: parseFloat(combinedData[3].longitude)
    }}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor='hotpink'
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