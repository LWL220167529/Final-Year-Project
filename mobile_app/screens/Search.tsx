import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OneWaySection from "../components/OneWaySection";
import RoundTripSection from "../components/RoundTripSection";
import OneWay from "../components/OneWay";
import Frame1 from "../components/Frame1";
import Frame from "../components/Frame";
import RoundTrip from "../components/RoundTrip";
import { TextInput } from "react-native-paper";
import StatusBarLight from "../components/StatusBarLight";
import OffersSectionContainer from "../components/OffersSectionContainer";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const TopTab = createMaterialTopTabNavigator();
const Search = () => {
  return (
    <View style={styles.search}>
      <StatusBarLight
        statusBarLightBackgroundColor="#fff"
        statusBarLightAlignSelf="unset"
        statusBarLightWidth={375}
      />
      <View style={styles.searchPageBody}>
        <View style={[styles.flightSelection, styles.bottomTabShadowBox]}>
          <TopTab.Navigator
            style={styles.waySelectionToptabs}
            tabBar={({ state, descriptors, navigation, position }) => {
              const [activeItems] = React.useState([<OneWay />, <Frame />]);
              const [normalItems] = React.useState([<Frame1 />, <RoundTrip />]);
              const activeIndex = state.index;
              return (
                <View style={styles.topTabBarStyle}>
                  {normalItems.map((item, index) => {
                    const isFocused = state.index === index;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate({
                            name: state.routes[index].name,
                            merge: true,
                          });
                        }}
                      >
                        {activeIndex === index ? activeItems[index] : item}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            }}
          >
            <TopTab.Screen name="One Way section" component={OneWaySection} />
            <TopTab.Screen
              name="Round trip section"
              component={RoundTripSection}
            />
          </TopTab.Navigator>
        </View>
        <OffersSectionContainer
          dimensionCode={require("../assets/offer-image.png")}
          carDimensions={require("../assets/offer-image1.png")}
        />
      </View>
      <View style={[styles.bottomTab, styles.bottomTabShadowBox]}>
        <View style={styles.bottomLayout}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/icon--exploreselected3.png")}
          />
          <Text style={[styles.search1, styles.searchTypo]}>Explore</Text>
        </View>
        <View style={styles.bottomLayout}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/icon--itinerary4.png")}
          />
          <Text style={[styles.search1, styles.searchTypo]}>Bookings</Text>
        </View>
        <View style={styles.bottomLayout}>
          <Image
            style={[styles.iconSearchFlights, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/icon--userprofile4.png")}
          />
          <Text style={[styles.search1, styles.searchTypo]}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  group4: {
    backgroundColor: "#fff",
  },
  waySelectionToptabs: {
    width: "100%",
  },
  topTabBarStyle: {
    borderRadius: 32,
    backgroundColor: "#f4f5f9",
    width: 313,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 4,
    minHeight: 44,
    zIndex: 1,
  },
  viewFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  iconLayout1: {
    height: 32,
    width: 32,
  },
  bottomTabShadowBox: {
    shadowOpacity: 1,
    elevation: 15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: Color.colorWhite,
  },
  outlinedtextIconLayout1: {
    alignSelf: "flex-start",
    height: 56,
    width: 313,
  },
  outlinedtextIconLayout: {
    width: 150,
    alignSelf: "flex-start",
    height: 56,
  },
  searchTypo: {
    marginTop: 14,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    textAlign: "center",
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  bottomLayout: {
    width: 61,
    alignItems: "center",
  },
  flightSelection: {
    borderRadius: Border.br_xs,
    width: 341,
    padding: Padding.p_sm,
  },
  searchPageBody: {
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_base,
    alignItems: "center",
    width: 375,
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
  },
  search1: {
    color: Color.colorLightslategray,
  },
  iconSearchFlights: {
    opacity: 0.8,
  },
  bottomTab: {
    padding: Padding.p_base,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  search: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
  },
});

export default Search;
