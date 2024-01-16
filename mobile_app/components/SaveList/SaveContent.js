import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { weather } from '../constants';
import  FontAwesome5IconButton from 'react-native-vector-icons/FontAwesome5';



export default function SaveContent({setShowAccept}) {
    const [DayIndex, setDayIndex] = React.useState(2);
    const PlanDetail = [{'id': 1,'name':'trip for ThaiLand', 'Date': '15 Feb - 21 Feb', 'image':'abc',
    'place' : ['Taipei', 'Taichung', 'Tainan', 'Kaohsiung']},
    {'id': 2,'name':'trip for Tokyo', 'Date': '21 Feb - 26 Feb', 'image':'acccc'},
    {'id': 3,'name':'best week to TaiWan', 'Date': '17 Mar - 20 Mar', 'image':'adfsd'},
    {'id': 4,'name':'tips to play in Hawaii', 'Date': '24 Mar - 26 Mar', 'image':'xxx'}];
    const [selected, setCBXSelected] = React.useState(null);

    
    const renderContainers = () => {
      
        const containers = [];
        for (let i = 0; i < PlanDetail.length; i++) { 
          containers.push(
      
            <View style={styles.container} key={i}> 
            <View style={{alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => {
              setCBXSelected(i);
              setShowAccept(true);
            }}>
            <View style={[styles.checkbox, selected === i && styles.checkboxSelected]} >  
            </View>
            </TouchableOpacity>
            </View>
                          <View>
              <Image style={styles.image} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png' }} />             
               </View>
            <View>
              <Text style={{fontSize: 15, fontWeight: 700}}>{PlanDetail[i].name}</Text>
              <Text style={{fontSize: 12}}>{PlanDetail[i].Date}</Text>
              </View>

            </View>
          );
        }
        return containers; // 將 return 移出 for 迴圈
      };
      
      return <View style={styles.catContainer}>{renderContainers()}</View>;
    }
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row', 
        alignItems: 'left',
        justifyContent: 'flex-start',
        gap: 5,
    },
    boxContainer: {
      marginTop: 15,
        backgroundColor: 'white',
      borderRadius: 15,    
      elevation: 3, // Add elevation for box shadow (Android)
      shadowColor: '#000', // Add shadow styles for iOS
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 8,
        height: -5,
      },
      shadowRadius:10,
      flex:1,
      justifyContent:'space-between',
      flexDirection:'row',
  alignItems:'center',  },
    image: {
      width: 120,
      height: 80,
      borderRadius: 15,
    },
    textContainer: {
      alignSelf:'flex-start',
      paddingHorizontal:10,
      marginTop: 5,
      maxWidth: 150, // Adjusted maxWidth to match the width of the image
    },
    titleText: {
  
      fontSize: 15,
      fontWeight: 'bold',
    },
    descriptionText: {
      fontSize: 14,
      marginLeft: 5,
    },
    image :{
        width: 30,
        height: 30,
    },
    checkbox: {
      alignSelf:'center',
      width: 18,
      height: 18,
      borderWidth: 2,
      borderColor: '#FF004D',
      borderRadius: 30,
      marginRight: 10,
    },
    checkboxSelected: {
      borderWidth: 5,
    },
    
  });