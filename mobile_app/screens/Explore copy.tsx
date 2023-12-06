import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Image,
  View,
  ScrollView,
  ImageBackground,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarLight from "../components/StatusBarLight";
import UpcomingFlightsContainer from "../components/UpcomingFlightsContainer";
import CategoryBlock from "../components/CategoryBlock";
import TrendingDestinationsContainer from "../components/TrendingDestinationsContainer";
import OffersSectionContainer from "../components/OffersSectionContainer";
import { Padding, FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const Explore = () => {
  return (
    <View style={styles.explore}>
      <StatusBarLight
        statusBarLightBackgroundColor="#fff"
        statusBarLightAlignSelf="unset"
        statusBarLightWidth={375}
      />
      <ScrollView
        style={styles.exploreMainView}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.exploreMainViewContent}
      >
        <ImageBackground
          style={styles.parisCardIcon}
          resizeMode="cover"
          source={require("../assets/frame14.png")}
        />
        <View style={styles.exploreContent}>
          <UpcomingFlightsContainer />
          <ScrollView
            style={styles.categories}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.categoriesScrollViewContent}
          >
            <CategoryBlock
              tagFlight={require("../assets/tag--flight1.png")}
              flight="Flight"
              categoryBlockPosition="unset"
              categoryBlockWidth={77}
              categoryBlockMarginLeft="unset"
            />
            <CategoryBlock
              tagFlight={require("../assets/tag--hotel.png")}
              flight="Hotels"
              categoryBlockPosition="unset"
              categoryBlockWidth={77}
              categoryBlockMarginLeft={6}
            />
            <CategoryBlock
              tagFlight={require("../assets/tag--atractions.png")}
              flight="Attractions"
              categoryBlockPosition="unset"
              categoryBlockWidth={77}
              categoryBlockMarginLeft={6}
            />
            <CategoryBlock
              tagFlight={require("../assets/tag--eats.png")}
              flight="Eats"
              categoryBlockPosition="unset"
              categoryBlockWidth={77}
              categoryBlockMarginLeft={6}
            />
            <CategoryBlock
              tagFlight={require("../assets/tag--train.png")}
              flight="Commute"
              categoryBlockPosition="unset"
              categoryBlockWidth={77}
              categoryBlockMarginLeft={6}
            />
          </ScrollView>
          <TrendingDestinationsContainer />
          <OffersSectionContainer
            dimensionCode={require("../assets/offer-image2.png")}
            carDimensions={require("../assets/offer-image3.png")}
            propMarginTop={30}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  categoriesScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  exploreMainViewContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  viewFlexBox: {
    padding: Padding.p_base,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
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
  parisCardIcon: {
    borderRadius: Border.br_5xs,
    height: 180,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    alignSelf: "stretch",
  },
  categories: {
    alignSelf: "flex-start",
    marginTop: 30,
    width: "100%",
  },
  exploreContent: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  exploreMainView: {
    alignSelf: "stretch",
    flex: 1,
  },
  explore: {
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
    width: "100%",
    flex: 1,
  },
});

export default Explore;
