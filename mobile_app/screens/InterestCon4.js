import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InterestCon3() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, name, date, numberOfDays, AllDates, budget } = route.params;
  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    console.log(selectedOptions);
  };

  const handleContinue = () => {
    // Perform navigation to the home page
    // You can replace the console.log with the actual navigation logic
    console.log('Navigating to the home page...');
  };

  const activityData = [
    {
      id: 1,
      name: 'Beaches',
    },
    {
      id: 2,
      name: 'City sightseeing',
    },
    {
      id: 3,
      name: 'Festival',
    },
    {
      id: 4,
      name: 'Outdoor',
    },
    {
      id: 5,
      name: 'Food exploration',
    },
    {
      id: 6,
      name: 'NightLife',
    },
    {
      id: 7,
      name: 'Shopping',
    },
    {
      id: 8,
      name: 'Spa wellness',
    },

  ];


  return (
    <LinearGradient
      colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
      style={{ flex: 1, width: '100%' }}
    >
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <View style={styles.container}>
          <Text>{destination[0]}</Text>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>What do you plan on traveling with on your next adventure?</Text>
          <View style={styles.genderBox}>
          {activityData.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.genderOption,
                  selectedOptions.includes(activity.name) && styles.selectedOption,
                ]}
                activeOpacity={0.7}
                onPress={() => handleOptionPress(activity.name)}
              >
                <Text style={styles.genderOptionText}>{activity.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedOptions.length > 0 && (
            <Button title="Continue" onPress={() => navigation.navigate("PlanGeneration", {
              destination: destination,
              name: name,
              date: date,
              numberOfDays: numberOfDays,
              AllDates: AllDates,
              budget: budget,
              activity: selectedOptions,
            })} />
          )}
        </View>
        <View></View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  genderBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genderOption: {
    borderRadius: 15,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: 'white',
  },
  genderOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});