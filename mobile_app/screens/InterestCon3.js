import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import react from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';




export default function InterestCon3() {
    const navigation = useNavigation();
    const route = useRoute();
    const { destination, name, date, numberOfDays, AllDates, budget } = route.params;
    const personData = [
      {
        id: 1,
        name: 'Solo',
        image: require('../image/solo.jpg'),
      },
      {
        id: 2,
        name: 'Couple',
        image: require('../image/couple.jpg'),
      },
      {
        id: 3,
        name: 'Family',
        image: require('../image/family.jpg'),
      },
      {
        id: 4,
        name: 'Friends',
        image: require('../image/friends.jpg'),
      },
    ];
  
    return (
      <LinearGradient
        colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
        style={{ flex: 1, width: '100%' }}
      >
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
          <View style={styles.container}>
            <Text>{destination}</Text>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>
              Who do you plan on traveling with on your next adventure?
            </Text>
            <View style={styles.genderBox}>
              {personData.map((person) => (
                <TouchableOpacity
                  key={person.id}
                  onPress={() =>
                    navigation.navigate('InterestCon4', {
                      destination: destination,
                      name: name,
                      date: date,
                      numberOfDays: numberOfDays,
                      AllDates: AllDates,
                      budget: budget,
                    })
                  }
                >
                  <View style={styles.selectbox}>
                    <Image source={person.image} style={styles.image} />
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{person.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View></View>
        </SafeAreaView>
      </LinearGradient>
    );
  }


const styles = StyleSheet.create({

    container: {
        marginTop: 50,
        alignItems: 'center',

    },
    genderBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    selectbox: {
        alignItems:'center',
        borderRadius: 15, 
        margin: 10, 
        padding:10, 
        backgroundColor:'white',
        width: 100,
    },
    image:{
        width: 50,
        height: 50,
    }
});
