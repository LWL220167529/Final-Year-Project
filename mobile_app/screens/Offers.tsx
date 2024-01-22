import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarLight from "../components/StatusBarLight";
import OffersContainer from "../components/OffersContainer";
import { Padding, FontFamily, FontSize, Color } from "../GlobalStyles";

const Offers = () => {
  return (
    <View style={styles.offers}>
      <StatusBarLight
        statusBarLightBackgroundColor="#fff"
        statusBarLightAlignSelf="unset"
        statusBarLightWidth={375}
      />
      <View style={[styles.offersBody, styles.viewFlexBox]}>
        <OffersContainer />
      </View>
      <View style={[styles.bottomTab, styles.viewFlexBox1]}>
        <View style={styles.bottomTab1}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/icon--exploreselected5.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Explore</Text>
        </View>
        <View style={styles.bottomTab1}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/icon--itinerary5.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Bookings</Text>
        </View>
        <View style={styles.bottomTab1}>
          <Image
            style={[styles.iconSearchFlights, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/icon--searchflights5.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Search</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  viewFlexBox: {
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconLayout1: {
    height: 32,
    width: 32,
  },
  viewFlexBox1: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchTypo: {
    marginTop: 14,
    textAlign: "center",
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  offersBody: {
    paddingVertical: 19,
  },
  search: {
    color: Color.colorLightslategray,
  },
  bottomTab1: {
    width: 61,
    alignItems: "center",
  },
  iconSearchFlights: {
    opacity: 0.8,
  },
  bottomTab: {
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    padding: Padding.p_base,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: Color.colorWhite,
  },
  offers: {
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
    flex: 1,
    width: "100%",
  },
});

export default Offers;
