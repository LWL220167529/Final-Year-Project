import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MenuContainer = ({ title, imageSrc, type, setType }) => {
    const handleType = () => {
        setType(title.toLowerCase());
    }
    return (
        <TouchableOpacity  onPress={handleType}>
            <View style={styles.outcontainer}>
            <View style={type === title.toLowerCase()? styles.imageContainer : null}>
                <Image source={imageSrc} style={styles.catItem} />
                <Text style={styles.catTitle}>{title}</Text>
            </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    imageContainer:{
        borderRadius: 10,
        backgroundColor: 'grey',
    },
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
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 5,
        width: wp(20),
        height: wp(19),
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: 'white',
        padding: 15,
    },
    selectedCatItem: {
        backgroundColor: 'grey', // Set the selected category background color
        borderColor: 'grey', // Set the selected category border color
    },

    catImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    catTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default MenuContainer;