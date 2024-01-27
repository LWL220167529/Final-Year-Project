import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView, Image } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AntButton from 'react-native-vector-icons/AntDesign';

export default function ProfileDetail() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/getUserByID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: 5 }),
                });

                const data = await response.json();
                console.log(data.user);
                setUserData(data);

                // Navigate to the home screen (replace 'Home' with the actual screen name)
            } catch (error) {
                // Handle any errors that occur during the fetch request
                console.error(error);
            }
        };
        console.log("the page has been pass " + userData?.user?.id);
        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>

            {userData?.user && (
                <View style={{alignContent:'center', gap:20}}>
                    <View>
                    <TouchableOpacity style={{alignContent:'center', alignItems:'center', margin:20}}
                    >
                        <Image
                            source={require("../assets/group31.png")}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.DetailTextArea}><View style={{flexDirection:'row', gap:5}}><AntButton  name='tag' size={28} /><Text style={{fontSize:18}}>UserID</Text></View><Text>{userData?.user?.id}</Text></View>
                    <View style={styles.DetailTextArea}><View style={{flexDirection:'row', gap:5}}><AntButton  name='user' size={28} /><Text style={{fontSize:18}}>User Name</Text></View><Text>{userData?.user?.userName}</Text></View>
                    <View style={styles.DetailTextArea}><View style={{flexDirection:'row', gap:5}}><AntButton  name='mail' size={28} /><Text style={{fontSize:18}}>Email</Text></View><Text>{userData?.user?.email}</Text></View>
                    <View style={styles.DetailTextArea}><View style={{flexDirection:'row', gap:5}}><AntButton  name='phone' size={28} /><Text style={{fontSize:18}}>Phone No.</Text></View><Text>{userData?.user?.phoneNumber}</Text></View>
                    <View style={styles.DetailTextArea}><View style={{flexDirection:'row', gap:5}}><AntButton  name='table' size={28} /><Text style={{fontSize:18}}>Join By Date</Text></View><Text>{userData?.user?.createTime}</Text></View>
                </View>

            )}
        </View>
    );
}


const styles = StyleSheet.create({
    avatar: {

        borderRadius: 999,
        borderColor: 'gray',
        borderWidth: 2,
    },
    DetailTextArea:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:10,
        borderBottomColor:'lightgrey',
        borderBottomWidth:1,

    }
});