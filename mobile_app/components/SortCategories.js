import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { sortCategoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';


export default function SortCategories() {
    const [activeSort, setActiveSort] = useState('Popular');
    return (
        <View style={styles.container}>
            {
                sortCategoryData.map((sort, index) => {
                    let isActive = sort == activeSort;
                    let activeButtonClass = isActive ? styles.activeButton : null;
                    return (
                        <TouchableOpacity
                            onPress={() => setActiveSort(sort)}
                            style={[styles.sortCategory, activeButtonClass]}
                        >
                            <Text
                                style={[
                                    styles.sortCategoryText,
                                    {
                                        color: isActive ? theme.text : 'rgba(0, 0, 0, 0.6)',
                                        fontSize: wp(4), // Replace `wp(4)` with the desired width calculation function
                                    },
                                ]}
                            >{sort}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 4,
        backgroundColor: '#f3f3f3',
        borderRadius: 9999,
        padding: 2,
        paddingHorizontal: 4,
    },
    sortCategory: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 9999,
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortCategoryText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
});