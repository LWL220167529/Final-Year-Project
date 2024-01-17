import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { weather } from '../constants';
import  FontAwesome5IconButton from 'react-native-vector-icons/FontAwesome5';
export default function SaveSelection() {
  const [DayIndex, setDayIndex] = React.useState(0);
  const PlanList = ['My Plan', 'My Draft'];

  const renderContainers = () => {
    const containers = [];
    for (let i = 0; i < 2; i++) {
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
            }}
          >
            <Text
              style={[
                styles.catTitle,
                DayIndex === i && styles.selectedCatTitle,
              ]}
            >
              {PlanList[i]}
            </Text>
 
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

    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2, // 設置邊框寬度為1
  },
  catItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    borderBottomColor: '#FF6868',
    borderBottomWidth: 4, // 設置邊框寬度為1
  },
  selectedCatTitle: {
    color: '#FF6868',
  },
});