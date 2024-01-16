import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PlanType } from '../constants';

export default function PlanNavBar() {
  const [DayIndex, setDayIndex] = React.useState(0);

  return (
    <View style={styles.catContainer}>
      {PlanType.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={[
            styles.catItem,
            DayIndex === index && styles.selectedCatItem,
          ]}
          onPress={() => setDayIndex(index)}
        >
          <View style={{ flexDirection: 'column', alignItems:'center' }}>
            <Text
              style={[
                styles.catTitle,
                DayIndex === index && styles.selectedCatTitle,
              ]}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
  },
  catItem: {
    flex: 1, // Set the flex property to 1 for equal-width columns
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  catTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',

  },
  selectedCatItem: {
    backgroundColor: '#333',
  },
  selectedCatTitle: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',

  },
});