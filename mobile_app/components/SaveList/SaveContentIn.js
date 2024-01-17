import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { weather } from '../constants';
import  FontAwesome5IconButton from 'react-native-vector-icons/FontAwesome5';



export default function SaveContentIn({setShowAccept}) {
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
              <Text style={{fontSize: 15, fontWeight: 700}}>{PlanDetail[i].Date}</Text>
              <Text style={{fontSize: 12}}>{PlanDetail[0].place[i]}</Text>
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
        paddingHorizontal: 30,
        paddingRight: 60,
        flex: 1,
        overflow: 'hidden',
        alignItems: 'left',
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