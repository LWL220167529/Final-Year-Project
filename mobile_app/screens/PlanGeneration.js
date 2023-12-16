import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FeaturedRow from '../components/featuredrow';
import { destinationData } from '../constants';
const PlanGeneration = () => {
    return (
      <View style={{backgroundColor:'lightgrey'}}>
<ScrollView>
<View  style={{backgroundColor:'white', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 30, elevation: 5, paddingBottom:20}}>
  <View style={{ position: 'relative'}}>
    <Image source={require('../image/Tokyo.jpg')} style={[styles.image, { shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 9 }]} />
    <LinearGradient
      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
      style={{
        width: wp(100),
        height: hp(30),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', margin: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>
          3 days trip on Tokyo, Japan
        </Text>
        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
          <Fontisto name="date" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={{ fontSize: 15, marginLeft: 5, color: 'rgba(255, 255, 255, 0.7)' }}>15 Dec, 2023 - 17 Dec, 2023</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
  <View style={{ marginTop: 280, mnpmarginLeft: 10,  }}>
    <Text style={{fontSize: 30, fontWeight: 'bold',}}>Description</Text>
  <Text>
    Tokyo officially the Tokyo Metropolis is the capital of Japan and the most populous city in the world with a population of over 14 million residents as of 2023.[8] The Tokyo metropolitan area, which includes Tokyo and nearby prefectures, is the world's most-populous metropolitan area with 40.8 million residents as of 2023
    </Text>
  </View>
</View>
<View  style={styles.recommendbox}>
<Text style={{fontWeight:600, fontSize:20, marginBottom:10, borderBottomWidth: 1,borderBottomColor: '#F2F1EB', fontSize: 20, fontWeight: 'bold'}}>Recommending Place</Text>    
<View>
  <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  >
    {destinationData.map((item, index) => {
      return (
        <FeaturedRow
          key={index}
          title={item.title}
          description={item.description}
          rating={item.rating}
        />)
})
}
  </ScrollView>
</View>
</View>

<View style={styles.ScheduleBox}> 
<Text style={{fontSize: 30, fontWeight: 'bold',}}>Schedule</Text>

</View>
</ScrollView>

</View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: '100%',
        height: hp(30),
        resizeMode: 'cover',
        position: 'absolute',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    recommendbox: {
      backgroundColor:'white', 
      marginTop:20, 
      padding:10, 
      height: 230,
      elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius:15,
    
    },
    ScheduleBox: {
      backgroundColor:'white', 
      marginTop:20, 
      padding:10, 
      height: 230,
      elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.2,
    shadowRadius:15,
    
    },

});

export default PlanGeneration;
