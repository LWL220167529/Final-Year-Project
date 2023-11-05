import { View, Text, TouchableOpacity, ScrollView, Image,StyleSheet } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories() {
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
        contentContainerStyle={{paddingHorizontal: 15}}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {
            categoriesData.map((cat,index)=>{
                return (
                    <TouchableOpacity key={index} className="flex items-center space-y-2">
                        <Image source={cat.image} style={styles.catItem} />
                        <Text style={styles.catTitle}>{cat.title}</Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: wp(20), 
    height: wp(19),
    borderRadius: 20,
    margin: 10,
    marginTop: 30,
  },
  catTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

});