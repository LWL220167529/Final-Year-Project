import React, {useState, useEffect} from 'react';
import { ActivityIndicator,View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesomeIcons from 'react-native-vector-icons/Entypo';
import Categories from '../components/Categories';
import MenuContainer from '../components/MenuContainer';
import {Hotels, Restaurants, Attractions} from "../constants";
import SortCategories from '../components/SortCategories';
import Destinations from '../components/destination';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ItemCardContainer from '../components/itemCardContainer';
import { getPlacesData } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

handleLoginPress = async () => {
  const { userName, password } = this.state;
  const data = { userName, password };
  
  try {
    const url = `http://159.223.94.246:5000/getAttraction`;
    const response = await fetch(url, {
      method: 'GET',
    });

    const json = await response.json();
    console.log(json);
    Alert.alert(json.id);
  } catch (error) {
    console.error(error);
  }
}


export default function HomeScreen() {
  const [type, setType] = useState('restaurants');
  const [isLoading, setIsLoading] = useState(false);
  const [bl_lat, setbl_lat] = useState(null);
  const [bl_lng, setbl_lng] = useState(null);
  const [tr_lat, settr_lat] = useState(null);
  const [tr_lng, settr_lng] = useState(null);
  const [mainData, setMainData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [userDetail, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [id, setID] = useState('');

  useEffect(() => {
    setIsLoading(true);
      const fetchName = async () => {
        try {
          const data = await AsyncStorage.getItem('UserData');
          const parsedData = JSON.parse(data);
          const userName = parsedData.user.userName;
          setName(userName);
          setID(parsedData.user.id);
          console.log('name: ' + userName);
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
      fetchName();

    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    getUserData();

  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  const getUserData = async () => {
    try {
      const url = 'http://159.223.94.246:5000/getUserByID';
      const data = {
        userID: 5,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
  
      Alert.alert(json.message);
      const stringValue = JSON.stringify(json);
      console.log(stringValue);
      storeSessionData('userData', stringValue);
      setHasData(!json.error);
    } catch (error) {
      console.error(error);
      storeSessionData('userData', JSON.stringify(error));

    }
  };
  
  const showUserData = () => {
    const data = getSessionData('userData');
    setUserData(data);
};

const  storeSessionData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing session data:', error);
  }
};

// Retrieving session data
const  getSessionData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving session data:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
        <Text style={styles.title}>Let's Discover</Text>
        <Text style={{fontSize:17}}> User: {name} (id: {id})</Text>
        </View>
        <TouchableOpacity
        >
          
{ hasData ? (
  <Image
  source={require("../assets/group31.png")}
    style={styles.avatar}
  />
) : (
  <Image source={require("../assets/group31.png")} style={styles.avatar} />
)}
        </TouchableOpacity>
      </View>


      <View style={styles.searchContainer} >
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder='Search destination'
          placeholderTextColor='grey'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setbl_lat(details?.geometry?.viewport?.southwest?.lat)
            setbl_lng(details?.geometry?.viewport?.southwest?.lng)
            settr_lat(details?.geometry?.viewport?.northeast?.lat)
            settr_lng(details?.geometry?.viewport?.northeast?.lng)
          }}
          query={{
            key: 'AIzaSyDb4iE2zwfaw7lxIavF6cTt4sjoiM4cDGc',
            language: 'en',
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
    >
      {/*test userdata
            <TouchableOpacity onPress={getUserData}>
        <View style={{padding: 10, backgroundColor: 'red'}}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={showUserData}>
        <View style={{padding: 10, backgroundColor: 'blue'}}></View>
      </TouchableOpacity>
      <Text>{JSON.stringify(userDetail)}</Text>
      */}
        <View style={styles.catContainer}>
          <MenuContainer
          key={"hotel"}
          title= "Hotels"
          imageSrc={Hotels}
          type={type}
          setType={setType}
           />
          <MenuContainer
          key={"restaurants"}
          title= "Restaurants"
          imageSrc={Hotels}
          type={type}
          setType={setType}
           />
          <MenuContainer
          key={"attractions"}
          title= "Attractions"
          imageSrc={Attractions}
          type={type}
          setType={setType}
           />

        </View>
        </ScrollView>
        <View style={{ marginBottom: 4 }}>
          <SortCategories />
        </View>
        {isLoading ? (
          <View style={styles.isLoadingScreen}>
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <View style={styles.ContentContainer}>
            {mainData?.map((data,i) => (
            <ItemCardContainer 
            key={i} 
            imageSrc={data?.photo?.images?.medium?.url ?
              data?.photo?.images?.medium?.url : 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png'
            }
            title={data?.name}
            location={data?.location_string}
            data={data}
            />
          )
          )
          }
          </View>
        )}
      </ScrollView>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
isLoadingScreen: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
  ContentContainer:{
    paddingHorizontal: 16, // This assumes 1 Tailwind unit is 4 pixels
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  catContainer :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: 'gray',
  },
  avatar: {
    height: wp(15),
    width: wp(15),
    borderRadius: 999,
    borderColor: 'gray',
    borderWidth: 2,
  },
  searchGlass: {
    height: wp(6),
    width: wp(6),
    marginRight: 4,
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
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingLeft: 16,
  },
  searchTextInput: {
    flex: 1,
    fontSize: wp(4),
    marginBottom: 1,
    paddingLeft: 6,
    letterSpacing: 1,
  },
});