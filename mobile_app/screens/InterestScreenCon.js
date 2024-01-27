import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Platform, TouchableOpacity, Image } from 'react-native';
// Assume DatePicker and Stepper have been imported correctly
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SelectList } from 'react-native-dropdown-select-list'
import { Plcaelat } from '../constants';

const TravelPreferencesForm = () => {
  const [date, setDate] = useState(new Date()); // Changed to string to simplify validation
  const [numberOfDays, setNumberOfDays] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [bl_lat, setbl_lat] = useState(null);
  const [bl_lng, setbl_lng] = useState(null);
  const [tr_lat, settr_lat] = useState(null);
  const [tr_lng, settr_lng] = useState(null);
  const [description, setPlaceName] = useState('');
  const [showhiddenText, sethiddenText] = useState(false);
  const [startdate, setStartDate] = useState(null); // Changed to string to simplify validation
  const [enddate, setEndDate] = useState(null); // Changed to string to simplify validation
  const [AllDates, setAlldates] = useState(null); // Changed to string to simplify validation
  const [showPlanBtn, setshowPlanBtn] = useState(false); // Changed to string to simplify validation
  const [CityData, setCityData] = useState(null); // Changed to string to simplify validation
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = React.useState("");

  
  const navigation = useNavigation();


  useEffect(() => {
    const input = description; // Replace this with your actual input
const parts = input.split(", ");

const lastTwoParts = parts.slice(-2);
const CityString = lastTwoParts.join(", ");

console.log(CityString); 
    handleTest();
    setIsLoading(true);
    
  }, [numberOfDays, description]);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
      

  };
  
  const listData = Plcaelat.map((place, index) => {
    return {
      key: (index + 1).toString(),
      value: place.title
    };
  });


  const isFormValid = () => numberOfDays!== ''&& date !== '' && description !== '';

 

  const handleDaysChange = (newNumberOfDays) => {
    setNumberOfDays(newNumberOfDays);
    if (newNumberOfDays !== '') {
      sethiddenText(true);
    } else {
      sethiddenText(false); // 將 showhiddenText 設置為 false
    }
    handleTest();
  };

  const handleTest = () => {
    const options = { day: 'numeric', month: 'short' };
    const startDate = new Date(date);
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    setStartDate(formattedStartDate);
  
    const AllDates = [];
    for (let i = 0; i < parseInt(numberOfDays); i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      AllDates.push(nextDate);
      console.log('nextDate'+i+': '+nextDate);
    }
  
    let formattedEndDate = '';
    if (AllDates.length > 0) {
      formattedEndDate = AllDates[AllDates.length - 1].toLocaleDateString('en-US', options);
    }
    console.log(formattedEndDate);
    setEndDate(formattedEndDate);
    setAlldates(AllDates);
    console.log('AAlldate:'+AllDates);
  };
 
  return (

    <LinearGradient
    colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
    style={{ flex: 1, width: '100%' }}
>
<View style={styles.container}>

        <Text style={{ fontSize: 25, fontWeight: 700, }}>Tell us your travel preferences</Text>
      <View style={{gap: 15, flex:1}}>

      {/* Insert DatePicker component here and pass `date` and `onDateChange` */}
      <Text style={{ fontSize: 15 }}>When are you planning to travel?</Text>

      <View style={styles.Textinput}>
      <Pressable onPress={togglePicker}>
    <TextInput style={{color: 'black'}}
      value={date.toString().substr(4, 12)}
      onChangeText={setDate}
      placeholder={date.toString().substr(4, 12)}
      placeholderTextColor='#11182744'
      editable={false}
    />
    </Pressable>
    </View>


{showPicker && (
          <DateTimePicker
          mode="date"
          is24Hour={true}
          value={date}
          onChange={onChange}
          display='spinner'
          minimumDate={new Date()} // 不允許選擇過去日期
          />
          )}

      <Text>How many days are you planning to travel?</Text>
      {/* Insert Stepper component here and pass `numberOfDays` and `onValueChange` */}
      <View style={styles.Textinput}>
      <TextInput
  value={numberOfDays}
  onChangeText={handleDaysChange}
  placeholder="Enter day..."
  keyboardType="numeric"
/>
      </View>
      {showhiddenText && (
      <Text style={styles.hiddenDateText}>The trip would ranged between <Text style={{color:'#FF9843'}}>{startdate}</Text> and <Text style={{color:'#FF9843'}}>{enddate}</Text></Text>
      )}
      <Text style={{ fontSize: 15 }}>What is your destination of choice?</Text>

      <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder='Your favourite attraction'
          placeholderTextColor='grey'
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'grey',
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
            },
            textInput: {
              height: 36,
              color: 'black',
              fontStyle: 'italic',
              fontSize: 16,
            },    predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setbl_lat(details?.geometry?.viewport?.southwest?.lat)
            setbl_lng(details?.geometry?.viewport?.southwest?.lng)
            settr_lat(details?.geometry?.viewport?.northeast?.lat)
            settr_lng(details?.geometry?.viewport?.northeast?.lng)
            setPlaceName(data.description)
            console.log(data.description);
          }}
          query={{
            key: 'AIzaSyDb4iE2zwfaw7lxIavF6cTt4sjoiM4cDGc',
            language: 'en',
          }}
          editable={false}

        />
      </View>
      {isFormValid() && (
        <Button title="Next" onPress={()=> navigation.navigate("InterestCon2", {
          userID: 5,
          destination: {bl_lat, bl_lng, tr_lat, tr_lng},
          Country: description,
          TravelDate: date.toString(),
          numberOfDays: numberOfDays,
          AllTravelDates: AllDates.map(date => date.toString()),

        })} />
      )}

    </View>
    {/*<SelectList 
    onSelect={(selectedValue) => setSelected(selectedValue) } 
    setSelected={setSelected} 
      fontFamily='lato'
      data={listData}  
      search={false} 
      boxStyles={{borderRadius:0}} //override default styles
      defaultOption={{ key:'1', value:'Place A' }}   //default selected option
      />*/}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({

  container: {
      flex: 1, // The flex property ensures that the container takes all available space
      margin: 10,
      marginVertical:15
  },

  Textinput: {
    width: '100%',
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingleft: 22,
  },
  hiddenDateText: {
    fontSize: 13,
    padding: 6,
    color: '#F6F7C4',
    borderRadius: 10,
    backgroundColor: '#3D3B40',
    margin: 5, 
    fontWeight: 'bold'
  }
});
export default TravelPreferencesForm;
