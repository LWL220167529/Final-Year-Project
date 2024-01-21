import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { weather } from '../constants';
import  FontAwesome5IconButton from 'react-native-vector-icons/FontAwesome5';
export default function DaySelection({ day, onDayIndexChange, AllDates }) {
  const [DayIndex, setDayIndex] = React.useState(0);


  const renderContainers = () => {
    const containers = [];
    for (let i = 0; i < day; i++) {
      containers.push(
        <View style={{ marginHorizontal: 5 }}>
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            style={[
              styles.catItem,
              DayIndex === i && styles.selectedCatItem,
            ]}
            onPress={() => {
              setDayIndex(i);
              onDayIndexChange(i + 1); // Call the callback function to pass the value to the parent component
            }}
          >
            <Text
              style={[
                styles.catTitle,
                DayIndex === i && styles.selectedCatTitle,
              ]}
            >
              Day {i + 1}
            </Text>
            <Text
              style={[
                styles.catDate,
                DayIndex === i && styles.selectedCatTitle,
              ]}
            >
              {AllDates ? AllDates[i].toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : ''}
            </Text>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <FontAwesome5IconButton  name={weather[i].name} size={15} color={weather[i].color}/>
                    <Text
                      style={[
                        styles.catDate,
                        DayIndex === i && styles.selectedCatTitle,
                      ]}
                    >
                      {weather[i].title}
                    </Text>
                  </View>  
          </TouchableOpacity>
        </View>
      );
    }
    return containers;
  };

  return <View style={styles.catContainer}>{renderContainers()}</View>;
}


const styles = StyleSheet.create({
  catContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
  },
  catItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  catTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',

  },
  catDate: {
    fontSize: 12,

  },
  selectedCatItem: {
    backgroundColor: '#333',
  },
  selectedCatTitle: {
    color: '#fff',
  },
});