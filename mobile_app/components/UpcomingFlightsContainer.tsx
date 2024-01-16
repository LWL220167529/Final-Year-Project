import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const UpcomingFlightsContainer = () => {
  return (
    <View style={styles.upcomingFlightsSection}>
      <Text style={[styles.upcomingFlight, styles.singaporeClr]}>
        Upcoming Flight
      </Text>
      <View style={styles.frameParent}>
        <View style={styles.group13Parent}>
          <View>
            <Text style={[styles.sin, styles.sinTypo]}>SIN</Text>
            <Text style={[styles.singapore, styles.singaporeClr]}>
              Singapore
            </Text>
          </View>
          <View style={[styles.line2Parent, styles.parentFlexBox]}>
            <Image
              style={[styles.line2Icon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/line21.png")}
            />
            <Image
              style={[styles.ovalIcon, styles.ovalIconLayout]}
              resizeMode="cover"
              source={require("../assets/oval2.png")}
            />
            <Image
              style={styles.iconFlight}
              resizeMode="cover"
              source={require("../assets/icon--flight3.png")}
            />
            <Image
              style={[styles.ovalIcon1, styles.ovalIconLayout]}
              resizeMode="cover"
              source={require("../assets/oval2.png")}
            />
          </View>
          <View style={styles.group131}>
            <Text style={[styles.sin, styles.sinTypo]}>LAX</Text>
            <Text style={[styles.singapore, styles.singaporeClr]}>
              Los Angeles
            </Text>
          </View>
        </View>
        <Image
          style={[styles.line3Icon, styles.line3IconSpaceBlock]}
          resizeMode="cover"
          source={require("../assets/line3.png")}
        />
        <View
          style={[styles.departsOn1May0800AmParent, styles.line3IconSpaceBlock]}
        >
          <Text style={[styles.departsOn1, styles.departsOn1Typo]}>
            Departs on: 1 May, 08:00 AM
          </Text>
          <Text style={styles.departsOn1Typo}>
            <Text style={styles.sinTypo}>4 days</Text>
            <Text style={styles.toGo}> to go</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singaporeClr: {
    color: Color.black,
    textAlign: "left",
  },
  sinTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  ovalIconLayout: {
    height: 10,
    width: 10,
  },
  line3IconSpaceBlock: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  departsOn1Typo: {
    color: Color.colorLightslategray,
    fontSize: FontSize.subheadlineBold_size,
    textAlign: "left",
  },
  upcomingFlight: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  sin: {
    fontSize: FontSize.size_xl,
    color: Color.colorCornflowerblue,
    textAlign: "left",
  },
  singapore: {
    fontSize: FontSize.size_sm,
    marginTop: 4,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  line2Icon: {
    position: "absolute",
    marginTop: -0.8,
    top: "50%",
    right: 8,
    left: 8,
    height: 2,
    zIndex: 0,
  },
  ovalIcon: {
    zIndex: 1,
  },
  iconFlight: {
    width: 41,
    height: 41,
    zIndex: 2,
  },
  ovalIcon1: {
    zIndex: 3,
  },
  line2Parent: {
    flex: 1,
    marginLeft: 18,
    alignItems: "center",
  },
  group131: {
    alignItems: "flex-end",
    marginLeft: 18,
  },
  group13Parent: {
    paddingTop: Padding.p_xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  line3Icon: {
    height: 1,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  departsOn1: {
    fontFamily: FontFamily.robotoRegular,
  },
  toGo: {
    fontFamily: FontFamily.interRegular,
  },
  departsOn1May0800AmParent: {
    paddingBottom: Padding.p_xs,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
  },
  frameParent: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    marginTop: 14,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  upcomingFlightsSection: {
    alignSelf: "stretch",
  },
});

export default UpcomingFlightsContainer;
