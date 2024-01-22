import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import react from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';




export default function InterestCon3() {
    const navigation = useNavigation();
    const route = useRoute();
    const { destination, name, date, numberOfDays, AllDates} = route.params;
    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ flex: 1, width: '100%' }}
        >
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
                <View style={styles.container}>
                    <Text>{destination}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 700, }}>Who do you plan on traveling with on your next adventure?
</Text>            
                    <View style={styles.genderBox}>
                        <TouchableOpacity onPress={()=> navigation.navigate("InterestCon4", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={styles.selectbox}>
                                <Image source={require('../image/solo.jpg')} style={styles.image} />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Solo </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate("InterestCon4", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={styles.selectbox}>
                                <Image source={require('../image/couple.jpg')} style={styles.image} />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Couple </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate("InterestCon4", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={styles.selectbox}>
                                <Image source={require('../image/family.jpg')} style={styles.image} />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Family </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate("InterestCon4", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={styles.selectbox}>
                                <Image source={require('../image/friends.jpg')} style={styles.image} />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Friends </Text>
                                </View>
                            </TouchableOpacity>

                    </View>
                </View>
                <View>


                </View>
            </SafeAreaView>


        </LinearGradient>


    )

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
