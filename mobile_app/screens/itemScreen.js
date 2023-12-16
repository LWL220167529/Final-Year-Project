import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const ItemScreen = ({ route }) => {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const data = route?.params?.param;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []
    );

    console.log(data);

    return (
        <View style={styles.destination_Container}>
            <Image source={{
                uri: data?.photo?.images?.medium?.url ?
                    data?.photo?.images?.medium?.url : 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'
            }} style={{ width: wp(100), height: hp(45) }} />
            <SafeAreaView style={styles.InsideView}>
                <TouchableOpacity style={{ padding: 2, borderRadius: 9999, marginLeft: 16, backgroundColor: 'rgba(255,255,255,0.5)' }} onPress={() => navigation.goBack()}>
                    <Ionicon name='chevron-back-outline' strokeWidth={4} color={'green'} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ padding: 5, borderRadius: 9999, marginRight: 16, backgroundColor: 'green' }}>
                    <Ionicon name="heart" size={30} color={isFavourite ? "red" : "white"} />
                </TouchableOpacity>

            </SafeAreaView>
            <View style={styles.destination_Content} >
            <Text style={styles.locationTxt}>
                            {data?.name}
                        </Text>
                        <View style={styles.locationflex}>
                            <FontAwesomeIcon name="map-marker" size={wp(3.5)} color="#8C9EA6" />
                            <Text style={styles.textSecondary}>
                                {data?.location_string}
                            </Text>
                        </View>
                <ScrollView >
                    <View style={{ marginTop: 10 }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 7 }}>
                            <View style={{ flexDirection: 'row', marginVertical: wp(8), alignItems: 'flex-start' }}>
                                <View style={styles.iconbox}>
                                    <AntDesignIcon name='star' size={wp(6)} color="#FF9900" />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 700 }}> {data?.rating}</Text>
                                    <Text> Rating</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: wp(8), alignItems: 'flex-start' }}>
                                <View style={styles.iconbox}>
                                    <MaterialIcons name='attach-money' size={wp(6)} color="yellow" />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 700 }}> {data?.price_level}</Text>
                                    <Text> Price level</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: wp(8), alignItems: 'flex-start' }}>
                                <View style={styles.iconbox}>
                                    <FontAwesome5Icon name='map-signs' size={wp(6)} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 700 }}> {data?.bearing}</Text>
                                    <Text> bearing</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontSize: wp(3.5), marginBottom: 8, color: '#4A5568', letterSpacing: 1 }}>{data?.description}</Text>
                        <View style={{ flexWrap:'wrap', flexDirection: 'row', gap: 5, justifyContent: 'flex-start', marginHorizontal: 7,marginVertical: 7, alignItems: 'center' }}>
                            {data?.cuisine.map((n) => (
                                <TouchableOpacity key={n.key} style={styles.catButton}>
                                    <Text>{n.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{
                            padding: wp(2), marginTop: wp(1), backgroundColor: '#CCFFFF', borderRadius: 10, paddingHorizontal: 10,
                        }}>
                            <View style={{ alignItems: 'center,', flexDirection: 'row', padding: 6 }}>
                                <FontAwesomeIcon name='phone' size={wp(5)} color="#66BB55" />
                                <Text style={{ paddingLeft: 10 }}>{data?.phone}</Text>
                            </View>
                            <View style={{ alignItems: 'center,', flexDirection: 'row', padding: 4 }}>
                                <FontAwesomeIcon name='envelope' size={wp(5)} color="#66BB55" />
                                <Text style={{ paddingLeft: 10 }}>{data?.email}</Text>
                            </View>
                            <View style={{ alignItems: 'center,', flexDirection: 'row', padding: 6 }}>
                                <FontAwesomeIcon name='map-pin' size={wp(5)} color="#66BB55" />
                                <Text style={{ paddingLeft: 10 }}>{data?.address}</Text>
                            </View>
                            <TouchableOpacity style={styles.BookButton}>
                <Text style={{fontSize: wp(5.5), color: '#FFFFFF', fontWeight: 'bold'}}>Book now</Text>
            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )

}

export default ItemScreen;

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
        marginBottom: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'mintcream',
        paddingTop: 20,
        marginTop: -50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    BookButton: {
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
    },
    locationTxt: {
        fontSize: wp(5.5),
        color: '#428288', /* This is the text color */
        fontWeight: 'bold',
        marginHorizontal: 12,
        marginBottom: 10,
    },
    locationflex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        paddingHorizontal: 2, // Adjust according to your space-x-2 class equivalent
    },
    textSecondary: {
        color: '#8C9EA6',
        fontSize: wp(3.5),
        fontWeight: 'bold',
        marginLeft: 4,
    },
    iconbox: {
        width: wp(10), // You will need to adjust this based on your design scale
        height: wp(10), // You will need to adjust this based on your design scale
        borderRadius: 10, // This is an estimated value for 2xl, adjust as needed
        backgroundColor: '#fecaca', // This is an estimated hex code for red-100, adjust as needed
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 3, // for Android
    },
    catButton: {
        paddingHorizontal: 8, // Tailwind's px-2 is 0.5rem, 1rem is typically 16px in React Native.
        paddingVertical: 4, // Tailwind's py-1 is 0.25rem, hence 4px in React Native.
        borderRadius: 6, // Adjusted for React Native, may need to be tuned.
        backgroundColor: '#ccf3e9', // Approximate color for Tailwind's bg-emerald-100.
    },
});