import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcons } from 'react-native-vector-icons/Entypo';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's Discover</Text>
          <TouchableOpacity>
            <Image source={require('../image/avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      
        <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
        <Text>abc</Text>

            <TextInput
              placeholder='Search destination'
              placeholderTextColor='gray'
              style={styles.searchTextInput}
            />
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
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
    height: wp(12),
    width: wp(12),
  },
  searchContainer: {
    marginHorizontal: 5,
    marginBottom: 4,
  },
  searchInput: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
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