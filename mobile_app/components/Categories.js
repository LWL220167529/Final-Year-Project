import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (index) => {
    setSelectedCategory(index);
  };

  return (
    <View style={styles.outcontainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { color: theme.text }]}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.catItem,
              selectedCategory === index && styles.selectedCatItem,
            ]}
            onPress={() => handleCategoryPress(index)}
          >
            <View style={styles.imageContainer}>
              <Image source={cat.image} style={styles.catImage} />
            </View>
            <Text style={styles.catTitle}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outcontainer: {
    padding: 10,
  },
  container: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 16,
    color: '#333',
  },
  catItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
    width: wp(20),
    height: wp(19),
    borderRadius: 20,
    margin: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
  },
  selectedCatItem: {
    backgroundColor: 'grey', // Set the selected category background color
    borderColor: 'grey', // Set the selected category border color
  },
  imageContainer: {
    width: '70%',
    aspectRatio: 1, // Make the image square by setting the aspect ratio to 1
    borderRadius: 10,
    overflow: 'hidden',
  },
  catImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  catTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});