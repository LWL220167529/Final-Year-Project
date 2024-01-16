import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import SaveSelection from "./SaveSelection";
import SaveContent from "./SaveContent";
import SaveContentIn from "./SaveContentIn";


const SaveList = ({ handleCloseModal }) => {
    const [showAccept, setShowAccept] = React.useState(false);

    return (
        <View style={styles.container}>
            <SaveSelection />
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <ScrollView>
                    {showAccept ?
                        <SaveContentIn setShowAccept={setShowAccept}/> :
                        <SaveContent setShowAccept={setShowAccept} />
                    }
                        </ScrollView>
                </View>
            </View>
            <View style={styles.cancel}>
                <TouchableOpacity onPress={handleCloseModal}>
                    <Text style={styles.fontstyle}>Cancel</Text>
                </TouchableOpacity>
                {showAccept &&
                    <TouchableOpacity onPress={handleCloseModal}>
                        <Text style={styles.fontstyle}>Accept</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 90,
        left: 50,
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        width: '58%', 
        borderColor: 'grey',
        borderLeftWidth: 2,
        marginBottom: 8,
        height: 300,
        elevation: 3, // Add elevation for box shadow (Android)
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowRadius: 10,
        elevation: 3,
    },
    cancel: {
        width: '100%',
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    fontstyle: {
        color: '#3468C0',
        fontWeight: 'bold',

    },
})

export default SaveList;

