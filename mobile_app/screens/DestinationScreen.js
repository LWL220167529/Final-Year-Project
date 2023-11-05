import { View, Text, Image, TouchableOpacity, ScrollView, Platform,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';



export default function DestinationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

  return (
    <View style={styles.destination_Container}>
        {/* destination image */}
        <Image source={item.image} style={{width: wp(100), height: hp(55)}} />

        <SafeAreaView className="flex-row justify-between items-center w-full absolute ">
            <TouchableOpacity>
                <Ionicon name='chevron-circle-left' strokeWidth={4} color="white" />
            </TouchableOpacity>

        </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({
    destination_Container: {
        backgroundColor: 'white',
        flex: 1,
    },
  });