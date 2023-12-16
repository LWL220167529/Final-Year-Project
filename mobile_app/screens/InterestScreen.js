import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import react from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



export default function InterestScreen() {
    const navigation = useNavigation();
    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ flex: 1, width: '100%' }}
        >
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 30, fontWeight: 700, }}>Welcome to Travel Go</Text>
                    <Text style={{ fontSize: 15 }}>We would like to know more about you.</Text>
                    <Text style={{ fontSize: 15 }}>Please select your gender:</Text>
                    <View style={styles.genderBox}>
                        <TouchableOpacity onPress={()=> navigation.navigate("InterestCon")} >
                            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ borderRadius: 9999, margin: 10, width: 100, height: 100, backgroundColor: 'powderblue' }}>
                                    <Ionicon name='male' color={'#3081D0'} size={40} style={{ alignSelf: 'center', marginTop: 30 }} />
                                </View>
                                <Text style={{ fontSize: 15, color: '#3081D0', fontWeight: 500 }}>Boy</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=> navigation.navigate("InterestCon")}>
                                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ borderRadius: 9999, margin: 10, width: 100, height: 100, backgroundColor: 'pink' }}>
                                        <Ionicon name='female' color={'#BE3144'} size={40} style={{ alignSelf: 'center', marginTop: 30 }} />
                                    </View>
                                    <Text style={{ fontSize: 15, alignItems: 'center', color: '#BE3144' }}>girl</Text>
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
        flex: 1, // The flex property ensures that the container takes all available space
        alignItems: 'center',
        marginTop: 50,
    },
    genderBox: {
        paddingTop: 30,
        gap: 30,
        flex: 1, // The flex property ensures that the container takes all available space
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
