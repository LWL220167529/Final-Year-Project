import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InterestCon3() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, name,date, numberOfDays, AllDates } = route.params;
  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleContinue = () => {
    // Perform navigation to the home page
    // You can replace the console.log with the actual navigation logic
    console.log('Navigating to the home page...');
  };

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
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Beaches') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Beaches')}
            >
              <Text style={styles.genderOptionText}>Beaches</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('City sightseeing') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('City sightseeing')}
            >
              <Text style={styles.genderOptionText}>City sightseeing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Festival') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Festival')}
            >
              <Text style={styles.genderOptionText}>Festival</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Outdoor') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Outdoor')}
            >
              <Text style={styles.genderOptionText}>Outdoor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Food exploration') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Food exploration')}
            >
              <Text style={styles.genderOptionText}>Food exploration</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('NightLife') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('NightLife')}
            >
              <Text style={styles.genderOptionText}>NightLife</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Shopping') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Shopping')}
            >
              <Text style={styles.genderOptionText}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedOptions.includes('Spa wellness') && styles.selectedOption]}
              activeOpacity={0.7}
              onPress={() => handleOptionPress('Spa wellness')}
            >
              <Text style={styles.genderOptionText}>Spa wellness</Text>
            </TouchableOpacity>
          </View>
          {selectedOptions.length > 0 && (
            <Button title="Continue" onPress={()=> navigation.navigate("PlanGeneration", {
              destination: destination,
              name: name,
              date: date,
              numberOfDays: numberOfDays,
              AllDates : AllDates,
                        })}  />
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