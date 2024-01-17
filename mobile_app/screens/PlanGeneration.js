import React, {useEffect, useState} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, ScrollView, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FeaturedRow from '../components/featuredrow';
import { destinationData } from '../constants';
import { EstimatedBudgetData } from '../constants';
import Categories from '../components/Categories';
import DaySelection from '../components/DaySelection';
import EveryDayContent from '../components/EveryDayContent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getPlacesData, getResData, getHotData, getBigCityData } from '../api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ItemCardContainer from '../components/itemCardContainer';
import {useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewScreen from './MapView';
import SelectList from 'react-native-dropdown-select-list'
const PlanGeneration = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, name, date, numberOfDays, AllDates } = route.params;
  const [day, setDay] = useState(numberOfDays);
  const [dayIndex, setDayIndex] = useState(1);
  const [type, setType] = useState('attractions');
  const [restype, setresType] = useState('restaurants');
  const [isLoading, setIsLoading] = useState(false);
  const [bl_lat, setbl_lat] = useState( destination[0]);
  const [bl_lng, setbl_lng] = useState (destination[1]);
  const [tr_lat, settr_lat] = useState( destination[2]);
  const [tr_lng, settr_lng] = useState( destination[3]);
  const [mainData, setMainData] = useState([]);
  const [resData, setResData] = useState([]);
  const [hotData, setHotData] = useState([]);
  const [myInput, setMyInput] = useState('   ');
  const parsedDay = parseInt(day, 10);
  const [AddPlaceIndex, setAddPlaceIndex] = useState(day*2);
  const [showPlanBtn, setshowPlanBtn] = useState(false); // Changed to string to simplify validation
  const [SveBtnColor, setSveBtnColor] = useState('#D8D9DA'); // Changed to string to simplify validation
  const [CityData, setCityData] = useState([]);
  const [CityString, setCityString] = useState('');
  const [combineData, setCombineData] = useState([]);
  const [selected, setSelected] = useState("");
  const [listData, setListData] = useState([]);


  useEffect(() => {
const input = name; // Replace this with your actual input
const parts = input.split(", ");

const lastTwoParts = parts.slice(-2);
const ModifyString = lastTwoParts.join(", ");
setCityString(ModifyString);
console.log(CityString); 
    
    setIsLoading(true);
    getBigCityData(CityString).then((data) => {
      setCityData(data);
      console.log(data[0]?.result_object?.photo?.images?.thumbnail?.url);
      console.log(data[0]?.result_object?.geo_description);
      setInterval(() => {
        setIsLoading(false);
      }, 4000);
    });

    Promise.all([
      getBigCityData(CityString),
      getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type),
      getResData(bl_lat, bl_lng, tr_lat, tr_lng),
      getHotData(bl_lat, bl_lng, tr_lat, tr_lng)
    ]).then(([cityData, mainData, resData, hotData]) => {
      setCityData(cityData);
      setMainData(mainData);
      setResData(resData);
      setHotData(hotData);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
      sliceDaySchedule();
    }).catch(error => {
      // Handle any errors that occur during data fetching
      console.log('Error:', error);
    });
    
    if (showPlanBtn) {
      setSveBtnColor('red');
    } else {
      setSveBtnColor('#3E3232');
    }
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type, showPlanBtn, CityString]);

  const handleDayIndexChange = (index) => {
    setDayIndex(index);
  };

  const togglePlan = () => {
    setshowPlanBtn(!showPlanBtn);
    
  };
  const handleInputChange = (text) => {
    setMyInput(text);
  };

  const sliceDaySchedule = () => {
    const n = 3;
    const indexesPerDay = 2;
    const totalIndexes = n * indexesPerDay;
  
    const result = [];
  
    for (let i = 0; i < n; i++) {
      const startIndex = i * indexesPerDay;
      const endIndex = startIndex + indexesPerDay;
  
      const restaurantIndexes = resData.slice(startIndex, endIndex);
      console.log('It is res', restaurantIndexes);
  
      console.log(restaurantIndexes[0]?.location_string);
      const attractionIndexes = mainData.slice(startIndex, endIndex);
      console.log('It is attractio', attractionIndexes);
  
      const dayData = [...restaurantIndexes, ...attractionIndexes];
      for (let j = 0; j < dayData.length; j++) {
        const item = dayData[j];
  
        if (item.latitude && item.longitude) {
          const latitude = item.latitude;
          const longitude = item.longitude;
  
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }
      }
  
      result.push(dayData);
      setCombineData(result);
      console.log('result:', result[0][0]?.latitude, result[0][0]?.longitude);
    }
  
    console.log(result);
  
 
  };
  



  const handlePlaceChange = () => {
    console.log(day);
    setAddPlaceIndex(prevIndex => prevIndex + 1);
    console.log(day);
    console.log(AddPlaceIndex);
  };

  const handleSavePlan = () => {
    const planData = {
      mainData,
      resData,
      hotData,
      // Add other relevant data here
    };
    alert('Plan Saved!');
    navigation.navigate('Home');
  };
    return (
      <View style={{backgroundColor:'lightgrey'}}>

<ScrollView>
<View  style={{backgroundColor:'white', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 30, elevation: 5, paddingBottom:20}}>
<View style={{ position: 'relative'}}>
{isLoading ? (
  <View style={styles.isLoadingScreen}>
    <ActivityIndicator size="large" color="#0B646B" />
  </View>
) : (
  CityData && CityData.length > 0 ? (
  <Image
    source={{
      uri: CityData[0]?.result_object?.photo?.images?.original?.url || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'
    }}
    style={[styles.image, { shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 9 }]}
  />
) : (
  <Text>No data available</Text>
)
)}
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
  {numberOfDays} days trip on {CityString}
</Text>
        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
          <Fontisto name="date" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={{ fontSize: 15, marginLeft: 5, color: 'rgba(255, 255, 255, 0.7)' }}>  {AllDates && AllDates.length > 0 ? 
    `${AllDates[0].toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} - ${AllDates[AllDates.length - 1].toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}` : 
    ''}</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
  <View style={{ marginTop: 280, mnpmarginLeft: 10,  }}>
    <Text style={{fontSize: 30, fontWeight: 'bold',}}>Description</Text>
    <TouchableOpacity style={{backgroundColor: '#FAE7F3', paddingVertical: 25, borderRadius: 20, marginTop: 10,}}  onPress={sliceDaySchedule}>
      
    </TouchableOpacity>
    {isLoading ? (
  <View style={styles.isLoadingScreen}>
    <ActivityIndicator size="large" color="#0B646B" />
  </View>
) : (
  CityData && CityData.length > 0 ? (
  <Text>
  {CityData[0]?.result_object?.geo_description ? CityData[0]?.result_object?.geo_description : 'This is a good Place For visiting'}
      </Text>
    ) : (
      <Text>No data available</Text>
    )
    )}
  </View>
</View>
<View  style={styles.recommendbox}>
<Text style={{fontWeight:600, fontSize:20, marginBottom:10, borderBottomWidth: 1,borderBottomColor: '#F2F1EB', fontSize: 20, fontWeight: 'bold'}}>Recommending Place</Text>    
<View>
  <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  >
    {mainData.map((item, index) => {
      // Show only the first five items
      if (index < 5) {
        return (
          <FeaturedRow
            key={index}
            title={item?.name}
            description={item?.description}
            rating={item?.rating}
            location={item?.location_string}
            imageSrc={item?.photo?.images?.medium?.url}
            data = {item}
          />
        );
      }
      return null; // Skip rendering for other items
    })}
  </ScrollView>
</View>
</View>

<View style={styles.ScheduleBox}> 
<Text style={{fontSize: 30, fontWeight: 'bold',}}>Schedule</Text>
<View style={{flexDirection:'row'}}>
  <View style={{backgroundColor: '#FAE7F3', paddingVertical: 25}}>
<MaterialCommunityIcon name='menu-left' size={30} color='black' />
</View>
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  >
<View style= {{alignContent:'center', gap:5}}>
<DaySelection
    day={day}
    onDayIndexChange={handleDayIndexChange}
    AllDates={AllDates}
/>
</View>
</ScrollView>
<View style={{backgroundColor: '#FAE7F3', paddingVertical: 25}}>
<MaterialCommunityIcon name='menu-right' size={30} color='black' />
</View>
</View>
<View>
  <View style={{    paddingVertical:10,height: 300,
    width: 400,borderRadius: 20}}>
    <MapViewScreen
    mainData={mainData}
    resData={resData}
    lat= {(bl_lat+tr_lat)/2}
    lng= { (bl_lng+tr_lng)/2}
    />
  </View>
<View style={{marginTop:15}}>


    </View>
<Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8}}>Hotel</Text>

{isLoading ? (
  <View style={styles.isLoadingScreen}>
    <ActivityIndicator size="large" color="#0B646B" />
  </View>
) : (
  hotData && hotData.length > 0 ? (
hotData.map((item, index) => {

  if (index == 1)
    return (
      <EveryDayContent
        key={index}
        index={index}
        title={item.name}
        description={item.description}
        rating={item.rating}
        imageSrc={item?.photo?.images?.medium?.url ? item?.photo?.images?.medium?.url: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
        data = {item}

        />
    );
})
  ) : (
    <Text>No data available</Text>
  )
)
}

<Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8}}>Attractions</Text>
          
{isLoading ? (
  <View style={styles.isLoadingScreen}>
    <ActivityIndicator size="large" color="#0B646B" />
  </View>
) : (
  mainData && mainData.length > 0 ? (
    mainData.map((item, index) => {
      const dayi = dayIndex;
      const dayiBefore = dayIndex - 1;
      
      if (index >= dayiBefore * 2 && index < dayi * 2) {
        return (
          <EveryDayContent
            key={index}
            index={index}
            description={item.description}
            rating={item.rating}
            imageSrc={item?.photo?.images?.medium?.url || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
            OnDataChange={handlePlaceChange}
            data={item}
            mainData={mainData}
            daylength={numberOfDays * 2}
          />
        );
      }
      return null;
    })
  ) : (
    <Text>No data available</Text>
  )
)}
<Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 15, marginLeft: 8}}>Restaurants</Text>

{isLoading ? (
  <View style={styles.isLoadingScreen}>
    <ActivityIndicator size="large" color="#0B646B" />
  </View>
) : (resData && resData.length > 0 ? (
  resData.map((item, index) => {
    const dayi = dayIndex;
    const dayiBefore = dayIndex - 1;

    if (index >= dayiBefore * 2 && index < dayi * 2) {
      return (
        <EveryDayContent
          key={index}
          index={index}
          title={item.name}
          description={item.description}
          rating={item.rating}
          imageSrc={item?.photo?.images?.medium?.url || 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'}
          OnDataChange={handlePlaceChange}
          data={item}
        />
      );
    }
    return null;
  }) ) : (<Text>No data available</Text>)
)}

</View>
</View>
<View style={styles.ScheduleBox}> 
<Text style={{fontSize: 30, fontWeight: 'bold',}}>Estimate Budget</Text>
<View style={{borderBottomWidth:3, borderBottomColor: 'lightgrey'}}>
<SectionList
  sections={EstimatedBudgetData}
  renderItem={({item}) => (
    <View style= {{borderBottomColor:'lightgrey', borderBottomWidth:1,margin:5}}>
      <Text style={{fontSize: 15, }}>{item.category}</Text>
      <Text style={{fontSize: 13}}>{item.budget}</Text>

    </View>
  )}
  renderSectionHeader={({section}) => (
    <View style={{flexDirection: 'row', gap: 5,paddingTop:12}}>
      <MaterialIcons name={section.icon} size={20} color={section.color} />
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{section.type}</Text>
    </View>
  )}
/>

</View>

</View>
</ScrollView>

{showPlanBtn && (
  <View style={{width: '95%', alignSelf: 'center'}}>
    <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: 120, width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
      <TouchableOpacity style={{ backgroundColor: '#272829', padding: 10, borderRadius: 10, marginTop: 10 }}
            onPress={()=> navigation.navigate("Home")}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0' }}>Save as Plan</Text>
      </TouchableOpacity>
    </View>
    <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: 60, width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
      <TouchableOpacity style={{ backgroundColor: '#61677A', padding: 10, borderRadius: 10, marginTop: 10 }}
      onPress={()=> navigation.navigate("Home")}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0' }}>Save as Draft</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

    <View style={{flex:1, position: 'absolute', flex:1, justifyContent: 'flex-end', bottom: 0, width: '100%', backgroundColor: 'white', paddingHorizontal: 10, paddingBottom: 10}}>
<TouchableOpacity 
 onPress={togglePlan}
  style={{backgroundColor: SveBtnColor, padding:10, borderRadius:10, marginTop:10}}
>
  {showPlanBtn ?  <View style={{alignItems: 'center'}}><MaterialCommunityIcon name='close-thick' size={26} color='black' /></View>
  :<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#FFF6E0'}}>Save Plan</Text>}

</TouchableOpacity>
  </View>

</View>
    );
};

const styles = StyleSheet.create({
    container: {
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
      backgroundColor:'white', 
      marginTop:20, 
      padding:10, 
      height: 230,
      elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius:15,
    
    },
    ScheduleBox: {
      backgroundColor:'white', 
      marginTop:20, 
      padding:10, 
      elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius:15,
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
});

export default PlanGeneration;
