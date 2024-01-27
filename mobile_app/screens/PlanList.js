import { Text, TouchableOpacity, View, Image, StyleSheet, ScrollView } from 'react-native';
import PlanNavBar from '../components/PlanNavBar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PlanList = () => {
  const [planList, setPlanList] = useState(null);
const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getAIPlanByUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: 5}),
        });

        const data = await response.json();
        console.log(data);
        setPlanList(data);

        // Navigate to the home screen (replace 'Home' with the actual screen name)
      } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error(error);
      }
    };

    fetchData();
  }, []);

  handleStoreID = async (id) => {
    try {
      await AsyncStorage.setItem('planID', JSON.stringify(id));
      console.log('id: ' + id);
      navigation.navigate('PlanListNav');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <PlanNavBar />
      <ScrollView>

        {planList?.plans &&
          planList.plans.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleStoreID(item.plan_ID)}>
              <Image style={styles.cardImage} source={require('../image/beach.png')} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.cardID, { flex: 0.5 }]}>id: {item.plan_ID}</Text>
                <Text style={styles.cardText}>Travel Plan {index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardText: {
    fontSize: 30,

  },
  cardID: {
    fontSize: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '96%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default PlanList;