import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDDeesignIcon from 'react-native-vector-icons/AntDesign'; 
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; 
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';



export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  return (
    <View style={styles.destination_Container}>
      <Image source={item.image} style={{ width: wp(100), height: hp(45) }} />
      <SafeAreaView style={styles.InsideView}>
        <TouchableOpacity style={{ padding: 2, borderRadius: 9999, marginLeft: 16, backgroundColor: 'rgba(255,255,255,0.5)' }} onPress={() => navigation.goBack()}>
          <Ionicon name='chevron-back-outline' strokeWidth={4} color={'white'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ padding: 5, borderRadius: 9999, marginRight: 16, backgroundColor: 'rgba(255,255,255,0.5)' }}>
          <Ionicon name="heart" size={30} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>

      </SafeAreaView>
      <View style={styles.destination_Content} >

        <ScrollView style={{ marginVertical: 5 }}>

          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'flex-start'}}>
            <Text style={{ fontSize: wp(7),flex: 1, fontWeight: 'bold', color: '#4A5568'}}>
              {item?.title}
            </Text>
            <Text style={{ fontSize: wp(7), color: theme.text , fontWeight: '600'}}>
              $ {item?.price}
            </Text>
          </View>
          <Text style={{fontSize: wp(3.7), marginBottom: 8, color: '#4A5568', letterSpacing: 1}}>{item?.longDescription}</Text>
          <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginHorizontal: 7}}>
                    <View style={{flexDirection: 'row', marginVertical:12, alignItems:'flex-start'}}>
                        <AntDDeesignIcon name='clockcircleo' size={wp(6)} color="skyblue" style={{marginTop:5}}/>
                        <View style={{ display:'flex', marginHorizontal:12}}>
                            <Text style={{fontSize: wp(4.5),fontWeight: 'bold', color: '#4A5568'}}>{item.duration}</Text>
                            <Text style={{color: '#718096',letterSpacing: 1}}>Duration</Text>
                        </View>
                        </View>
                        <View style={{flexDirection: 'row', marginVertical:12, alignItems:'flex-start'}}>
                        <FontAwesome5Icon name='map-marker-alt' size={wp(6)} color="hotpink" style={{marginTop:5}}/>
                        <View style={{ display:'flex', marginHorizontal:12}}>
                            <Text style={{fontSize: wp(4.5),fontWeight: 'bold', color: '#4A5568'}}>{item.distance}</Text>
                            <Text style={{color: '#718096',letterSpacing: 1}}>Distance</Text>
                        </View>
                        </View>

                        <View style={{flexDirection: 'row', marginVertical:12, alignItems:'flex-start'}}>
                        <Ionicon name='sunny' size={wp(6)} color="gold" style={{marginTop:5}}/>
                        <View style={{ display:'flex', marginHorizontal:12}}>
                            <Text style={{fontSize: wp(4.5),fontWeight: 'bold', color: '#4A5568'}}>{item.weather}</Text>
                            <Text style={{color: '#718096',letterSpacing: 1}}>Sunny</Text>
                        </View>
                        </View>
                    </View>
        </ScrollView>
        <TouchableOpacity style={styles.BookButton}>
                <Text style={{fontSize: wp(5.5), color: '#FFFFFF', fontWeight: 'bold'}}>Book now</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  destination_Container: {
    backgroundColor: 'white',
    flex: 1,
  },
  InsideView: {
    marginTop: Platform.OS === 'android' ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  destination_Content: {
    paddingHorizontal: 10,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'mintcream',
    paddingTop: 50,
    marginTop: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  BookButton:{
    backgroundColor: theme.bg(0.8), 
    height: wp(15), 
    width: wp(50),
    marginBottom: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  }
});