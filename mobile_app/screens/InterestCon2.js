import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import react from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function InterestCon2() {
    const navigation = useNavigation();
    const route = useRoute();
    const { destination,name,date, numberOfDays, AllDates} = route.params;

    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ flex: 1, width: '100%' }}
        >
            <SafeAreaView style={{ flex: 1, width: '100%'}}>
                <View style={styles.container}>
                    <Text>  {AllDates && AllDates.length > 0 ? 
    `${AllDates[0].toLocaleDateString('en-US')} - ${AllDates[AllDates.length - 1].toLocaleDateString('en-US')}` : 
    ''}</Text>
                    <Text style={{ fontSize: 30, fontWeight: 700, }}>What is Your Budget?</Text>
                    <Text style={{ fontSize: 15 }}>The budget is exclusively allocated </Text>
                    <Text style={{ fontSize: 15 }}>for activities and dining purposes.</Text>
                    <View style={styles.genderBox}>
                        <TouchableOpacity onPress={()=> navigation.navigate("InterestCon3", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={{ flex:1,borderRadius: 15, margin: 10, padding:10, maxHeight: 100,aspectRatio: 1,backgroundColor:'white'}}>
                                    <Ionicon name='male'  size={30}  />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Low </Text>
                                    <Text style={{ fontSize: 15 }}>0 - 1000 USD</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> navigation.navigate("InterestCon3", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={{flex:1, borderRadius: 15, margin: 10, padding:10, maxHeight: 100,aspectRatio: 1,backgroundColor:'white'}}>
                                    <Ionicon name='male'  size={30}  />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>Medium </Text>
                                    <Text style={{ fontSize: 15 }}>0 - 1000 USD</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> navigation.navigate("InterestCon3", {
          destination: destination,
          name: name,
          date: date,
          numberOfDays: numberOfDays,
            AllDates: AllDates
        })} >
                                <View style={{ flex:1, borderRadius: 15, margin: 10, padding:10, maxHeight: 100,aspectRatio: 1,backgroundColor:'white'}}>
                                    <Ionicon name='male'  size={30}  />
                                    <Text style={{ fontSize: 15, fontWeight: 700, }}>High </Text>
                                    <Text style={{ fontSize: 15 }}>+2500 USD</Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>    
            </SafeAreaView>


        </LinearGradient>


    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1, // The flex property ensures that the container takes all available space
        alignItems: 'center',
        marginTop: 50,
    },
    genderBox: {
        paddingTop: 30,
        margin: 10,
        flex: 1, // The flex property ensures that the container takes all available space

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
