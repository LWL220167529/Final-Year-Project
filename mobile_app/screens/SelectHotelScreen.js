import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import react, { useEffect, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getHotelData } from '../api';
import { Hotels } from '../constants';


const SelectHotel = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { destination, name, date, numberOfDays, AllDates } = route.params;
    const [bl_lat, setbl_lat] = useState(destination[0]);
    const [bl_lng, setbl_lng] = useState(destination[1]);
    const [tr_lat, settr_lat] = useState(destination[2]);
    const [tr_lng, settr_lng] = useState(destination[3]);
    const [displayedHotels, setDisplayedHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [SelectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const HotData = await Promise.all([getHotelData(lat = (bl_lat + tr_lat) / 2, lng = (bl_lng + tr_lng) / 2)]);
                const mappedHotData = HotData.map((item) => {
                    const Hotel = item?.propertySearch.properties;

                    const HotelData = Hotel.map((property) => {
                        const ImageSrc = property?.propertyImage?.image?.url || null;
                        const hotelName = property?.name || null;
                        const distanceFromDestination =
                            property?.destinationInfo?.distanceFromDestination.value || null;
                        const price = property.mapMarker?.label || null;
                        const currency =
                            property?.priceAfterLoyaltyPointsApplied?.lead?.currencyInfo?.code ||
                            null;
                        coordinate = property?.mapMarker?.latLong || null;
                        const Score = property?.reviews?.score || null;
                        const reviewCount = property?.reviews?.total || null;
                        const category = property?.neighborhood?.name || null;

                        return {
                            Hotel: hotelName,
                            rating: Score,
                            reviewCount,
                            category,
                            distanceFromDestination,
                            ImageSrc,
                            price: { currency, price },
                            coordinate,
                        };
                    });
                    return {
                        HotelData,
                    };
                });
                const firstEightHotels = mappedHotData[0]?.HotelData?.slice(0, 8) || [];
                setDisplayedHotels(firstEightHotels); // Update the state
                setInterval(() => {
                    setIsLoading(false);
                }, 3000);
                console.log('getHotelData:', mappedHotData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log('getHotelDisplayData:', displayedHotels);
    }, [displayedHotels]);
    useEffect(() => {
        console.log('SelectedHotel:', SelectedHotel);
    }, [SelectedHotel]);

    const handleHotelPress = (item) => {
        console.log('Selected hotel from SelectHotelScreen:', item);
        setSelectedHotel(item);
        setInterval(() => {
          navigation.navigate('PlanGeneration', {
            destination: destination,
            name: name,
            date: date,
            numberOfDays: numberOfDays,
            AllDates: AllDates,
            SelectedHotel: item,
          });
        }, 1200);
      };


    return (
        <View style={{ backgroundColor: '#FBF9F1', flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title} >Choose a hotel you would like to stay</Text>
            </View>
            {isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={100} color="#00ff00" />
                <Text style={{ fontSize: 20 }}>Please wait for moments until Screen is displayed</Text>
            </View>) : (

                <ScrollView style={{ marginTop: 10, marginBottom: 10 }}>
                    {
                        displayedHotels &&
                        displayedHotels.length > 0 &&
                        displayedHotels.map((item, index) => {
                            return (
                                <TouchableOpacity>
                                    <View style={styles.HotelBox}>
                                        <View>
                                            <Image style={styles.thumbnail} source={{ uri: item?.ImageSrc ? item?.ImageSrc : 'https://freepngimg.com/thumb/building/156842-building-hotel-vector-free-download-png-hq.png' }} />
                                        </View>
                                        <View style={{ marginLeft: 10, justifyContent: 'space-around' }}>
                                            <Text style={{ fontSize: 15, fontWeight: 600, maxWidth: 200, }} numberOfLines={1} ellipsizeMode="tail" >{item.Hotel}</Text>
                                            <Text style={{ fontSize: 12, }}>{item?.category}</Text>
                                            <View style={{ flexDirection: 'row', gap: 30 }}>
                                                <Text style={{ backgroundColor: 'green', color: 'white', paddingHorizontal: 5, borderRadius: 15, fontSize: 13 }}>{item?.price?.currency} {item?.price?.price}</Text><Text style={{ color: 'white', backgroundColor: '#FF9800', paddingHorizontal: 5, borderRadius: 15, fontSize: 13 }}>rating: {item?.rating}({item.reviewCount})</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#3559E0', padding: 5, borderRadius: 5, color: 'white', paaddingBottom: 10, position: 'absolute', bottom: 10, right: 10 }}>
                                            <TouchableOpacity
                                            onPress={() => {
                                                handleHotelPress(item);
                                                
                                            }
                                            }
                                            >
                                                <Text style={{ color: 'white' }}>Select</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        )
                    }
                </ScrollView>
            )}
        </View>
    )
}

export default SelectHotel;

const styles = StyleSheet.create({
    title: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    HotelBox: {
        padding: 10,
        width: 370,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    }
});