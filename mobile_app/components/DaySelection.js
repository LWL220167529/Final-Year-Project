import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import { DayTime } from '../constants';


export default function DaySelection() {
    const [DayIndex, setDayIndex] = React.useState(0);

    return (
        <View style={styles.catContainer}>
            {DayTime.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={[
                        styles.catItem,
                        DayIndex === index && styles.selectedCatItem,
                    ]}
                    onPress={() => setDayIndex(index)}
                >
                    <View style={{flexDirection:'column'}}>
                    <Text
                        style={[
                            styles.catTitle,
                            DayIndex === index && styles.selectedCatTitle,
                        ]}
                    >

                        {item}
                    </Text>
                    <Text
                        style={[
                            styles.catDate,
                            DayIndex === index && styles.selectedCatTitle,
                        ]}
                    >Fri 15, Dec</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    catContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 20,
    },
    catItem: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
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
        backgroundColor: '#333',
    },
    selectedCatTitle: {
        color: '#fff',
    },
});