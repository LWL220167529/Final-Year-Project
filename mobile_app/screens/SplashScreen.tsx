import * as React from "react";
import { Image, StyleSheet, View, ImageBackground, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = () => {
  return (
    <LinearGradient
      style={styles.splashScreen}
      locations={[0, 1]}
      colors={["#10579b", "#3aa4c8"]}
      useAngle={true}
      angle={180}
    >
      <ImageBackground
        style={styles.icon}
        resizeMode="cover"
        source={require('../image/splashscreen.png')}
      >
        <View style={styles.logoSection}>
          <Image
            style={[styles.logoIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../image/logo.png")}
          />
          <View style={{position:'absolute', bottom: -90, left: 15}}><Text style={{fontSize:30, color:'white'}}>Travel Go</Text></View>
        </View>
        <View style={styles.vectorContainer}>
          <Image
            style={styles.cloudsGraphicsIcon}
            resizeMode="cover"
            source={require("../image/frame-2446.png")}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  logoIcon: {
    height: "100.67%",
    width: "100.28%",
    top: "5%",
    right: "0.04%",
    bottom: "-5%",
    left: "-0.32%",
    maxHeight: "100%",
  },
  logoSection: {
    width: 100,
    height: 100,
    zIndex: 0,
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: [
      { translateX: -50 },
      { translateY: -50 },
    ],
  },
  cloudsGraphicsIcon: {
    width: "100%",
    height: "100%",
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  splashScreen: {
    height: 1082,
    width: "100%",
  },
  vectorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;