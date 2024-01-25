import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, ScrollView, SectionList, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FeaturedRow from '../components/featuredrow';
import { destinationData } from '../constants';
import { EstimatedBudgetData } from '../constants';
import Categories from '../components/Categories';
import DaySelection from '../components/DaySelection';
import EveryDayContent from '../components/EveryDayContent';
import ItneraryMedal from '../components/itneraryMedal';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getPlacesData, getResData, getHotData, getBigCityData } from '../api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ItemCardContainer from '../components/itemCardContainer';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewScreen from './MapView';
import SelectList from 'react-native-dropdown-select-list'
import EhotelContent from '../components/EhotelContent';
import { HollyData } from '../TestData';
import Carousel from "pinar";

const PlanGenerationTest = () => {
  const navigation = useNavigation();

  {/* worditernaray button */ }
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  const [showPlanBtn, setshowPlanBtn] = useState(false); // Changed to string to simplify validation
  const [SveBtnColor, setSveBtnColor] = useState('#D8D9DA'); // Changed to string to simplify validation
  const [bl_lat, setbl_lat] = useState(HollyData?.initial_input?.destination?.bl_lat);
  const [bl_lng, setbl_lng] = useState(HollyData?.initial_input?.destination?.bl_lng);
  const [tr_lat, settr_lat] = useState(HollyData?.initial_input?.destination?.tr_lat);
  const [tr_lng, settr_lng] = useState(HollyData?.initial_input?.destination?.tr_lng);
  const [dayIndex, setDayIndex] = useState(1);
  const [DataDay, setDataDay] = useState(HollyData);
  const [initial_input, setinitial_input] = useState(HollyData?.initial_input);


  {/* Data set */ }
  const [placeData, setPlaceData] = useState(
    HollyData?.itinerary
      ?.flatMap((day) => ({
        day: day.day,
        places: day.place,
      }))
  );
  const [hotelData, setHotelData] = useState(HollyData?.itinerary[0]?.place[0]);
  const [AttrData, setAttrData] = useState(
    HollyData?.itinerary
      ?.flatMap((day) => ({
        day: day.day,
        places: day.place.filter((place) => place?.category?.key === 'attraction')
      }))
  );

  const [ResData, setResData] = useState(
    HollyData?.itinerary
      ?.flatMap((day) => ({
        day: day.day,
        places: day.place.filter((place) => place?.category?.key === 'restaurant')
      }))
  );
  const handleDayIndexChange = (index) => {
    setDayIndex(index);
  };
  const togglePlan = () => {
    setshowPlanBtn(!showPlanBtn);

  };

  useEffect(() => {
    if (showPlanBtn) {
      setSveBtnColor('#FFC542');
    } else {
      setSveBtnColor('#D8D9DA');
    }
  }, [showPlanBtn]);

console.log(placeData?.places)


  return (

    <View style={{ backgroundColor: 'white', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 30, elevation: 5, paddingBottom: 20 }}>
      {/*itnerary medal */}

      <ItneraryMedal placeData={placeData} />
      <ImageBackground source={require('../image/headerbackground.jpg')} style={styles.Header}>
        <MaterialCommunityIcon style={styles.HeaderIcon} name='star-face' size={30} color='gold' />
        <Text style={styles.HeaderText}>Travel Plan</Text>
        <MaterialCommunityIcon style={styles.HeaderIcon} name='star-face' size={30} color='gold' />
      </ImageBackground>

      <ScrollView>
        <View style={{ marginTop: 1, backgroundColor: 'white', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 30, elevation: 5, paddingBottom: 20 }}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{
                uri: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'
              }}
              style={[styles.image, { shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 9 }]}
            />

            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              style={{
                width: wp(100),
                height: hp(30),
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}

            >
              <View style={{ flex: 1, justifyContent: 'flex-end', margin: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {initial_input?.numberOfDays} days trip on {initial_input?.Country}
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                  <Fontisto name="date" size={20} color="rgba(255, 255, 255, 0.7)" />
                  <Text style={{ fontSize: 15, marginLeft: 5, color: 'rgba(255, 255, 255, 0.7)' }}>
                    {initial_input?.AllTravelDates && initial_input?.AllTravelDates.length > 0 ?
                      `${new Date(initial_input?.AllTravelDates[0]).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} - ${new Date(initial_input?.AllTravelDates[initial_input?.AllTravelDates.length - 1]).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}` :
                      ''}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            {/*description */}
          </View>
          <View style={{ marginTop: 280, mnpmarginLeft: 10, }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', }}>Description</Text>

            <Text>
              This is a good Place For visiting
            </Text>

          </View>

        </View>

        <View style={styles.ScheduleBox}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', }}>Schedule</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#FAE7F3', paddingVertical: 25 }}>
              <MaterialCommunityIcon name='menu-left' size={30} color='black' />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ alignContent: 'center', gap: 5 }}>
                <DaySelection
                  day={initial_input?.numberOfDays}
                  onDayIndexChange={handleDayIndexChange}
                  AllDates={initial_input?.AllTravelDates}
                />
              </View>
            </ScrollView>
            <View style={{ backgroundColor: '#FAE7F3', paddingVertical: 25 }}>
              <MaterialCommunityIcon name='menu-right' size={30} color='black' />
            </View>
          </View>
          <View style={{
            paddingVertical: 10, height: 300,
            width: 400, borderRadius: 20
          }}>
            {/*mapscreen*/}
            <MapViewScreen
              dayIndex={dayIndex}
              placeData={placeData}
              lat={(bl_lat + tr_lat) / 2}
              lng={(bl_lng + tr_lng) / 2}
            />
          </View>
          <View style={{ marginTop: 15 }}>


          </View>
          <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8 }}>Selected Hotel</Text>
          <EhotelContent
            title={hotelData?.name}
            rating={hotelData?.rating}
            category={hotelData?.category}
            imageSrc={hotelData?.imageSrc || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
          />
          <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8 }}>Attractions</Text>
          {AttrData && AttrData.length > 0 && AttrData[dayIndex - 1] && AttrData[dayIndex - 1].places.length > 0 ? (
            AttrData[dayIndex - 1].places.map((place, index) => (
              <EveryDayContent
                key={index}
                index={index}
                title={place?.name}
                rating={place?.rating}
                imageSrc={place?.photo?.images?.medium?.url || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
                location_string={place?.location_string}
                type={place?.subcategory?.name}
                mainData={place}
              />
            ))
          ) : (
            <Text>No Data shown</Text>
          )}

          <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8 }}>Restaurants</Text>
          {ResData && ResData.length > 0 && ResData[dayIndex - 1] && ResData[dayIndex - 1].places.length > 0 ? (
            ResData[dayIndex - 1].places.map((place, index) => (
              <EveryDayContent
                key={index}
                index={index}
                title={place?.name}
                rating={place?.rating}
                imageSrc={place?.photo?.images?.medium?.url || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
                location_string={place?.location_string}
                type={place?.subcategory?.name}
                mainData={place}
              />
            ))
          ) : (
            <Text>No Data shown</Text>
          )}
        </View>
        <View style={styles.ScheduleBox}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', }}>Estimate Budget</Text>
          <View style={{ borderBottomWidth: 3, borderBottomColor: 'lightgrey' }}>
            <SectionList
              sections={EstimatedBudgetData}
              renderItem={({ item }) => (
                <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: 1, margin: 5 }}>
                  <Text style={{ fontSize: 15, }}>{item.category}</Text>
                  <Text style={{ fontSize: 13 }}>{item.budget}</Text>

                </View>
              )}
              renderSectionHeader={({ section }) => (
                <View style={{ flexDirection: 'row', gap: 5, paddingTop: 12 }}>
                  <MaterialIcons name={section.icon} size={20} color={section.color} />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{section.type}</Text>
                </View>
              )}
            />

          </View>

        </View>
      </ScrollView>

      {showPlanBtn && (
        <View style={{ width: '95%', alignSelf: 'center' }}>
          <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: 180, width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#272829', padding: 10, borderRadius: 10, marginTop: 10 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0' }}>Save as Plan</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: 110, width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#61677A', padding: 10, borderRadius: 10, marginTop: 10 }}
              onPress={() => navigation.navigate("Home")}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0' }}>Save as Draft</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: 70, width: '100%', backgroundColor: 'white', paddingHorizontal: 10, paddingBottom: 10 }}>
        <TouchableOpacity
          onPress={togglePlan}
          style={{ backgroundColor: SveBtnColor, padding: 10, borderRadius: 10, marginTop: 10 }}
        >
          {showPlanBtn ? <View style={{ alignItems: 'center' }}><MaterialCommunityIcon name='close-thick' size={26} color='black' /></View>
            : <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0' }}>Save Plan</Text>}

        </TouchableOpacity>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9', // Set your desired background color or image here
    height: 70,
    flexDirection: 'row',
    shadowColor: 'black',
    width: '100%',
    elevation: 3, // Add elevation for box shadow (Android)
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 12,

  },
  image: {
    width: '100%',
    height: hp(30),
    resizeMode: 'cover',
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommendbox: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    height: 230,
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius: 15,

  },
  ScheduleBox: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius: 15,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  WordContainer: {
    position: 'absolute',
    backgroundColor: '#B19470',
    paddingLeft: 25,
    borderRightWidth: 0,
    paddingRight: 15,
    alignSelf: 'flex-end',
    alignContent: 'left',
    borderWidth: 3,
    borderColor: '#fff',
    top: 160,
    right: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 8,
      height: -5,
    },
    shadowRadius: 10,


  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3652AD',
    letterSpacing: 1,
    flexDirection: 'row',
  },
  HeaderIcon: {
    color: '#3652AD',

  },
});

export default PlanGenerationTest;
