import * as React from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import BoracayContainer from "../components/BoracayContainer";
import { Color, Border, Padding } from "../GlobalStyles";

const Borocay = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.borocay}>
      <ImageBackground
        style={[styles.borocayScreenIcon, styles.headerFlexBox]}
        resizeMode="cover"
        source={require("../assets/borocayscreen.png")}
      >
        <View style={[styles.header, styles.headerFlexBox]}>
          <Pressable
            style={[styles.backArrow, styles.heartShadowBox]}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.iconBack}
              resizeMode="cover"
              source={require("../assets/icon--back2.png")}
            />
          </Pressable>
          <View style={[styles.heart, styles.heartShadowBox]}>
            <Image
              style={styles.iconHeart}
              resizeMode="cover"
              source={require("../assets/icon--heart.png")}
            />
          </View>
        </View>
        <BoracayContainer />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerFlexBox: {
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  heartShadowBox: {
    justifyContent: "center",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.12)",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xl,
    alignItems: "center",
    flexDirection: "row",
  },
  iconBack: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  backArrow: {
    padding: Padding.p_7xs,
  },
  iconHeart: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  heart: {
    padding: Padding.p_5xs,
  },
  header: {
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_11xl,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  borocayScreenIcon: {
    paddingTop: Padding.p_base,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    flex: 1,
  },
  borocay: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
});

export default Borocay;
