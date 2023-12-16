import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Platform } from 'react-native';
// Assume DatePicker and Stepper have been imported correctly
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const TravelPreferencesForm = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date()); // Changed to string to simplify validation
  const [numberOfDays, setNumberOfDays] = useState();
  const [showPicker, setShowPicker] = useState(false);
  // You would replace '' with whatever default non-value you have for date
  // If using a date object, you might check if date.toString() === new Date().toString() as the non-value condition
  const navigation = useNavigation();

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) => {
      if (type == 'set') {
        const currentDate = selectedDate;
        setDate(currentDate);
        if (Platform.OS === 'android') {
          togglePicker();
          setDateOfBirth(currentDate.toDateString());
        }
      } else {
        togglePicker();
      }
  };

  const isFormValid = () => destination !== ''&& numberOfDays!== ''&& date !== '';

  // Handlers for setting state
  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDaysChange = (newNumberOfDays) => {
    setNumberOfDays(newNumberOfDays);
  };

  // Placeholder for form submission
  const handleSubmit = () => {
    // Handle the submission of the form
    console.log(destination, date, numberOfDays);
  };

  return (
    <LinearGradient
    colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
    style={{ flex: 1, width: '100%' }}
>
<View style={styles.container}>

        <Text style={{ fontSize: 25, fontWeight: 700, }}>Tell us your travel preferences</Text>
      <View style={{gap: 15, flex:1, justifyContent: 'center'}}>
      <Text style={{ fontSize: 15 }}>What is your destination of choice?</Text>
      <View style={styles.Textinput}>
      <TextInput
        value={destination}
        onChangeText={handleDestinationChange}
        placeholder="Enter destination..."
      />
      </View>
      {/* Insert DatePicker component here and pass `date` and `onDateChange` */}
      <Text style={{ fontSize: 15 }}>When are you planning to travel?</Text>

      
      <View style={styles.Textinput}>
      <Pressable onPress={togglePicker}>
    <TextInput style={{color: 'black'}}
      value={date}
      onChangeText={setDate}
      placeholder="Sat Aug 21 2023"
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
          />
          )}

      <Text>How many days are you planning to travel?</Text>
      {/* Insert Stepper component here and pass `numberOfDays` and `onValueChange` */}
      <View style={styles.Textinput}>
      <TextInput
        value={numberOfDays}
        onChangeText={handleDaysChange}
        placeholder="Enter day..."
        keyboardType="numeric" // Add this prop to restrict input to numbers only

      />
      </View>
      </View>
      {isFormValid() && (
        <Button title="Next" onPress={()=> navigation.navigate("InterestCon2")} />
      )}
    </View>
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
    height: 48,
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingleft: 22,
  },
});
export default TravelPreferencesForm;
