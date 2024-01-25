import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import DestinationCard from "./DestinationCard";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const TrendingDestinationsContainer = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.trendingDestinations}>
      <View style={styles.detailsFlexBox}>
        <Text style={styles.trendingDestinations1}>Trending Destinations</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <ScrollView
        style={styles.trendingCardsView}
        horizontal={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.trendingCardsViewContent}
      >
        <View style={styles.trandingCardsRow}>
          <Pressable
            style={styles.destinationCard}
            onPress={() =>
              navigation.navigate("DrawerRoot", { screen: "Borocay" })
            }
          >
            <Image
              style={styles.destinationImageIcon}
              resizeMode="cover"
              source={require("../assets/destination-image.png")}
            />
            <View style={[styles.details, styles.detailsFlexBox]}>
              <View>
                <Text style={styles.boracay}>Boracay</Text>
                <Text style={[styles.philippines, styles.d4nTypo]}>
                  Philippines
                </Text>
              </View>
              <View style={styles.duration}>
                <Text style={[styles.d4n, styles.d4nTypo]}>5D4N</Text>
              </View>
            </View>
          </Pressable>
          <DestinationCard
            dimensionCode={require("../assets/destination-image1.png")}
            locationName="Baros"
            destinationName="Maldives"
            packageDuration="7D6N"
          />
          <DestinationCard
            dimensionCode={require("../assets/destination-image2.png")}
            locationName="Bali"
            destinationName="Indonesia"
            packageDuration="3D2N"
            propWidth="unset"
          />
          <DestinationCard
            dimensionCode={require("../assets/destination-image3.png")}
            locationName="Palawan"
            destinationName="Philippines"
            packageDuration="3D2N"
            propWidth={151}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  trendingCardsViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  detailsFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  d4nTypo: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  trendingDestinations1: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.black,
  },
  seeAll: {
    color: Color.colorCornflowerblue,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  destinationImageIcon: {
    width: 131,
    height: 90,
  },
  boracay: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.black,
  },
  philippines: {
    color: Color.colorLightslategray,
    marginTop: 1,
  },
  d4n: {
    color: Color.colorDimgray_100,
  },
  duration: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.studioLightmodeLightBGF8F9FB,
    overflow: "hidden",
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_9xs,
    flexDirection: "row",
  },
  details: {
    alignItems: "center",
    marginTop: 10,
  },
  destinationCard: {
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
    width: 151,
    padding: Padding.p_3xs,
  },
  trandingCardsRow: {
    flexDirection: "row",
  },
  trendingCardsView: {
    width: "100%",
    marginTop: 14,
    alignSelf: "stretch",
  },
  trendingDestinations: {
    marginTop: 30,
    alignSelf: "stretch",
  },
});

export default TrendingDestinationsContainer;
