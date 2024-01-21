import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import react, {useEffect} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getHotData } from '../api';


const SelectHotel = () => {
    const navigation = useNavigation();
    const { destination,name,date, numberOfDays, AllDates} = route.params;
    const [bl_lat, setbl_lat] = useState( destination[0]);
    const [bl_lng, setbl_lng] = useState (destination[1]);
    const [tr_lat, settr_lat] = useState( destination[2]);
    const [tr_lng, settr_lng] = useState( destination[3]);
    const [HotData, setHotData] = useState();

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity>
            <View>
              <MaterialCommunityIcon name="filter-minus-outline" size={30} color="black" />
            </View>
            </TouchableOpacity>
          ),
        });
      }, []);


      useEffect(() => {

            
            setIsLoading(true);
            getHotData(bl_lat, bl_lng, tr_lat, tr_lng).then((data) => {
                setHotData(data);
              setInterval(() => {
                setIsLoading(false);
              }, 1000);
            });
        }, [HotData]);



    return (
        <View style={{backgroundColor: '#FBF9F1', flex:1, alignItems:'center'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.title} >Choose a hotel you would like to stay</Text>
            </View>
            {HotData && HotData.map((item, index) => {

                return(
                    <TouchableOpacity >
                <View style={styles.HotelBox}>
                <View>
                <Image  style={styles.thumbnail} source={require('../image/camp.png')} />
                </View>
                <View style={{marginLeft: 10,justifyContent: 'space-around'}}>
                    <Text style={{fontSize: 20, fontWeight:600}}>sadasd</Text>
                    <Text>sadasd</Text>
                    <View style={{flexDirection:'row', gap: 40}}>
                    <Text style={{color:'green'}}>sadasd</Text><Text style={{color:'#FF9800'}}>sadasd</Text>
                    <View  style={{backgroundColor: '#3559E0', padding: 5, borderRadius: 5, color: 'white', paaddingBottom:10 }}>
                    <TouchableOpacity onPress={()=> navigation.navigate("PlanGeneration", {
              destination: destination,
              name: name,
              date: date,
              numberOfDays: numberOfDays,
                AllDates: AllDates
            })}>
                        <Text style={{color: 'white'}}>Select</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
    
                </View>
                </TouchableOpacity>
                )
                
})}
            
        </View>

    )
}

export default SelectHotel;

const styles = StyleSheet.create({
    title: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    HotelBox: {
        padding: 10,
        width: 350,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    }
});