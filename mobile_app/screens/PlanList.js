import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';


const PlanList = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.cardImage}  source={require('../image/beach.png')} />
      <Text style={styles.cardText}>Plan Title</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.cardImage}  source={require('../image/beach.png')} />
      <Text style={styles.cardText}>Plan Title</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 30,
  },
  card: {
    backgroundColor: 'white',
    width: '96%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
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