import * as React from "react";
import { Image, StyleSheet, View, ImageBackground } from "react-native";
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
        </View>
        <Image
          style={[styles.cloudsGraphicsIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../image/frame-2446.png")}
        />
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
  },
  cloudsGraphicsIcon: {
    right: 0,
    bottom: 0,
    left: 0,
    height: 252,
    zIndex: 1,
  },
  icon: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  splashScreen: {
    height: 1082,
    width: "100%",
  },
});

export default SplashScreen;
