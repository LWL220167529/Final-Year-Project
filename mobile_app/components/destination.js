import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Destinations() {
    const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
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
        <TouchableOpacity
            onPress={()=> navigation.navigate('Destination', {...item})}
            style={{width: wp(44), height: wp(65)}}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
                <Image
                    source={item.image}
                    style={{width: wp(44), height: wp(65), borderRadius: 35}}
                    className="absolute"
                />

            



        </TouchableOpacity>
    )
}

