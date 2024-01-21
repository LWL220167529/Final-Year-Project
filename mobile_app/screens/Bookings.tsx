import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarLight from "../components/StatusBarLight";
import BookingContainer from "../components/BookingContainer";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const Bookings = () => {
  return (
    <View style={styles.bookings}>
      <StatusBarLight
        statusBarLightBackgroundColor="#fff"
        statusBarLightAlignSelf="stretch"
        statusBarLightWidth="unset"
      />
      <ScrollView
        style={styles.bookingsBody}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bookingsBodyScrollViewContent}
      >
        <Text style={[styles.upcomingBookings, styles.bookingsTypo]}>
          Upcoming Bookings
        </Text>
        <BookingContainer />
      </ScrollView>
      <View style={[styles.bottomTab, styles.viewFlexBox]}>
        <View style={styles.bottomTab1}>
          <Image
            style={[styles.iconLayout, iconExploreSelected1Style]}
            resizeMode="cover"
            source={iconSearch}
          />
          <Text style={[styles.search, styles.searchTypo, search5Style]}>
            {search}
          </Text>
        </View>
        <View style={styles.bottomTab1}>
          <Image
            style={[styles.iconSearchFlights, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/icon--searchflights4.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Search</Text>
        </View>
        <View style={styles.bottomTab1}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/icon--offers5.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Offers</Text>
        </View>
        <View style={styles.bottomTab1}>
          <Image
            style={[styles.iconSearchFlights, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/icon--userprofile5.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  bookingsBodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 31,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  viewFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bookingsTypo: {
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_base,
  },
  iconLayout1: {
    height: 32,
    width: 32,
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
  upcomingBookings: {
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
  },
  bookingsBody: {
    alignSelf: "stretch",
    flex: 1,
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
    backgroundColor: Color.colorWhite,
  },
  bookings: {
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
    width: "100%",
    flex: 1,
  },
});

export default Bookings;
