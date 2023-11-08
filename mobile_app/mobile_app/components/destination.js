import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HeartIcon from 'react-native-vector-icons/Ionicons';
export default function Destinations() {
    const navigation = useNavigation();
  return (
    <View style={styles.destination_Container}>
      {
        destinationData.map((item, index)=>{
            return (
                <DestinationCard navigation={navigation} item={item} key={index} />
            )
        })
      }
    </View>
  )
}

const DestinationCard = ({item, navigation})=>{
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity style={styles.destination_Card}
            onPress={()=> navigation.navigate('Destination', {...item})}
            >
                <Image
                    source={item.image}
                    style={{ width: wp(44), height: wp(65), borderRadius: 35, position:'absolute'}}
                />
<LinearGradient
  colors={['transparent', 'rgba(0,0,0,0.8)']}
  style={styles.gradient}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
/>
<TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={styles.heartIconContainer}
      >
        <HeartIcon name="heart"   size={wp(6)}  color={isFavourite? "red": "white"}/>
</TouchableOpacity>

<Text  style={styles.cardtitle}>{item.title}</Text>
<Text  style={styles.cardtext}>{item.shortDescription}</Text>


        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
  destination_Container: {
    paddingTop: 30,
    margin: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }, 
  destination_Card: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    padding: 20,
    paddingBottom: 24,
    marginTop: 10,
    marginBottom: 5,
    width: wp(44), 
    height: wp(65),
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  gradient: {
    width: wp(44),
    height: hp(15),
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    position: 'absolute',
    bottom: 0,
  },
  cardtitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  cardtext: {
    fontSize: wp(2.2),
    color: 'white',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 10,
    zIndex: 1,
  },
});
