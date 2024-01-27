import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import react, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function InterestCon2() {
    const navigation = useNavigation();
    const route = useRoute();
    const {userID, destination,Country,TravelDate, numberOfDays, AllTravelDates } = route.params;
    const budgetData = [
        {
            id: 1,
            name: 'Low',
            price: '0-1000 USD',
        },
        {
            id: 2,
            name: 'Medium',
            price: '1000-2500 USD',
        },
        {
            id: 3,
            name: 'High',
            price: '2500+ USD',
        },
    ];
    const handlePassData = (name) => {
        setBudget(name);
        navigation.navigate("InterestCon3", {
            userID, 
            destination,
            Country,
            TravelDate, 
            numberOfDays, 
            AllTravelDates,
            budget: name,
        });
    }

    const [budget, setBudget] = useState('');


console.log(route.params);
    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ flex: 1, width: '100%' }}
        >
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 30, fontWeight: 700, }}>What is Your Budget?</Text>
                    <Text style={{ fontSize: 15 }}>The budget is exclusively allocated </Text>
                    <Text style={{ fontSize: 15 }}>for activities and dining purposes.</Text>
                    <View style={styles.genderBox}>
                        {budgetData.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => handlePassData(item.name)}>
                                <View style={{ flex: 1, borderRadius: 15, margin: 10, padding: 10, maxHeight: 100, aspectRatio: 1, backgroundColor: 'white' }}>
                                    <Ionicon name='male' size={30} />
                                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{item.name}</Text>
                                    <Text style={{ fontSize: 15 }}>{item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

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
