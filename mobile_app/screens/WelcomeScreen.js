import { View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient  from 'react-native-linear-gradient';
import LinearGradient2  from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../image/welcome.jpg')} style={styles.backgroundImage}>

        <LinearGradient
          colors={['transparent', 'rgba(119,127,150,0.8)']}
          style={styles.overlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Traveling made easy!</Text>
          <Text style={styles.subtitle}>Experience the world's best adventure around the world with us</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
              <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Set the desired color for the bottom of the screen
  },
  backgroundImage: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  content: {
    position: 'absolute',
    bottom: hp(10),
    left: wp(5),
    right: wp(5),
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: wp(10),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  subtitle: {
    fontSize: wp(4),
    color: '#D1D5DB',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(60),
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.bg(1),
    marginHorizontal: 'auto',
    borderRadius: 9999,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: wp(5.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});