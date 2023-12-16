import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useNavigation } from '@react-navigation/native';



const ItemCardContainer = ({ imageSrc, title, location, data}) => {
 const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ItemScreen", { param:data })} style={styles.card}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <Text style={styles.title}>
        {title?.length > 14 ? `${title.slice(0, 14)}...` : title}
      </Text>

      <View style={styles.locationContainer}>
        <FontAwesome name="map-marker" size={24} color="black" />
        <Text style={styles.location}>
          {location?.length > 14 ? `${location.slice(0, 14)}...` : location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    width: 182,
    marginVertical: 8,
    // Shadow styles for iOS
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    // For Android, you will use elevation
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    color: '#428288',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    color: '#428288',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default ItemCardContainer;