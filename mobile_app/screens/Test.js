import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Test() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.WordContainer} onPress={showModal}>
        <View>
          <View style={{ alignSelf: 'center' }}>
            <MaterialCommunityIcon name='book-marker' size={30} color='#3D3B40' />
          </View>
          <Text style={{ color: '#424769', fontWeight: '700' }}>Itinerary</Text>
        </View>
      </TouchableOpacity>
        <Modal visible={visible} onRequestClose={hideModal} animationType='fade' transparent>
        <View style={{flex:1,  backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

          <TouchableOpacity onPress={hideModal}>
            <View>
              <Text>Test</Text></View>
          </TouchableOpacity>
          </View>
        </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  WordContainer: {
    position: 'absolute',
    backgroundColor: '#B19470',
    paddingLeft: 25,
    borderRightWidth: 0,
    paddingRight: 15,
    alignSelf: 'flex-end',
    alignContent: 'left',
    borderWidth: 3,
    borderColor: '#fff',
    top: 160,
    right: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 3, // Add elevation for box shadow (Android)
    shadowColor: '#000', // Add shadow styles for iOS
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 8,
      height: -5,
    },
    shadowRadius: 10,


  },
});