import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import StatusBarLight from "../components/StatusBarLight";
import OffersSection from "../components/OffersSection";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const SearchTwoWay = () => {
  return (
    <View style={styles.searchTwoWay}>
      <StatusBarLight
        statusBarLightBackgroundColor="#fff"
        statusBarLightAlignSelf="unset"
        statusBarLightWidth={375}
        timeFontFamily="Roboto-Bold"
      />
      <View style={[styles.group4, styles.group4SpaceBlock]}>
        <Image
          style={styles.iconBack}
          resizeMode="cover"
          source={require("../assets/icon--back.png")}
        />
        <View style={styles.buttonPrimaryFlexBox1}>
          <Text style={styles.searchFlight}>Search Flight</Text>
        </View>
        <Image
          style={styles.iconBack}
          resizeMode="cover"
          source={require("../assets/icon--kebab1.png")}
        />
      </View>
      <View style={[styles.flightSelectionParent, styles.group4SpaceBlock]}>
        <View style={styles.flightSelection}>
          <View style={styles.waySelection} />
        </View>
        <OffersSection />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  group4SpaceBlock: {
    paddingHorizontal: Padding.p_base,
    width: 375,
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_7xs,
    width: 153,
    borderRadius: Border.br_13xl,
    justifyContent: "center",
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
  },
  roundTripTypo: {
    color: Color.colorWhite,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.size_sm,
  },
  outlinedLabeledPosition: {
    left: 0,
    top: 0,
  },
  borderPosition: {
    borderStyle: "solid",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
  textDataPosition: {
    position: "absolute",
    textAlign: "left",
  },
  airplanetakeoffLayout: {
    height: 20,
    width: 20,
    position: "absolute",
  },
  buttonPrimaryFlexBox: {
    alignSelf: "flex-start",
    width: 313,
  },
  outlinedtextIconLayout: {
    width: 150,
    alignSelf: "flex-start",
    height: 56,
  },
  iconBack: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  searchFlight: {
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  buttonPrimaryFlexBox1: {
    justifyContent: "center",
    alignItems: "center",
  },
  group4: {
    justifyContent: "space-between",
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    width: 375,
    backgroundColor: Color.colorWhite,
  },
  waySelection: {
    backgroundColor: Color.colorGhostwhite,
    height: 44,
    padding: Padding.p_9xs,
    borderRadius: Border.br_13xl,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  flightSelection: {
    borderRadius: Border.br_xs,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    width: 341,
    padding: Padding.p_sm,
    backgroundColor: Color.colorWhite,
  },
  flightSelectionParent: {
    paddingVertical: Padding.p_xl,
    paddingHorizontal: Padding.p_base,
    width: 375,
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
  },
  searchTwoWay: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
  },
});

export default SearchTwoWay;
