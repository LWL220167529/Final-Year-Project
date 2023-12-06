import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

type OffersSectionContainerType = {
  dimensionCode?: ImageSourcePropType;
  carDimensions?: ImageSourcePropType;

  /** Style props */
  propMarginTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const OffersSectionContainer = ({
  dimensionCode,
  carDimensions,
  propMarginTop,
}: OffersSectionContainerType) => {
  const offersSectionStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <View style={[styles.offersSection, offersSectionStyle]}>
      <Text style={styles.offers}>Offers</Text>
      <ScrollView
        style={styles.offersRow}
        horizontal={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.offersRowScrollViewContent}
      >
        <View style={styles.offerCardShadowBox}>
          <View style={styles.offerDetails}>
            <Text
              style={[
                styles.discountForMastercardContainer,
                styles.limitedTimeOfferLayout,
              ]}
            >
              <Text style={styles.discount}>20% discount</Text>
              <Text style={styles.text}>{` `}</Text>
              <Text style={styles.forMastercardUsers}>
                for mastercard users
              </Text>
            </Text>
            <Text
              style={[styles.limitedTimeOffer, styles.limitedTimeOfferLayout]}
            >
              Limited time offer!
            </Text>
          </View>
          <Image
            style={styles.offerImageIcon}
            resizeMode="cover"
            source={dimensionCode}
          />
        </View>
        <View style={[styles.offerCard1, styles.offerCardShadowBox]}>
          <View style={styles.offerDetails}>
            <Text
              style={[
                styles.discountForMastercardContainer,
                styles.limitedTimeOfferLayout,
              ]}
            >
              <Text style={styles.discount}>25% discount</Text>
              <Text style={styles.text}>{` `}</Text>
              <Text style={styles.forMastercardUsers}>
                with your Visa credit cards
              </Text>
            </Text>
            <Text
              style={[styles.limitedTimeOffer, styles.limitedTimeOfferLayout]}
            >
              Limited time offer!
            </Text>
          </View>
          <Image
            style={styles.offerImageIcon}
            resizeMode="cover"
            source={carDimensions}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  offersRowScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  limitedTimeOfferLayout: {
    width: 136,
    textAlign: "left",
  },
  offerCardShadowBox: {
    height: 86,
    width: 264,
    shadowOpacity: 1,
    elevation: 15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
  },
  offers: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.black,
    fontWeight: "700",
  },
  discount: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  text: {
    fontWeight: "500",
    fontFamily: FontFamily.robotoMedium,
  },
  forMastercardUsers: {
    fontFamily: FontFamily.robotoRegular,
  },
  discountForMastercardContainer: {
    fontSize: FontSize.size_sm,
    lineHeight: 19,
    color: Color.black,
    width: 136,
  },
  limitedTimeOffer: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
    color: Color.gray999,
    marginTop: 4,
    fontFamily: FontFamily.robotoRegular,
  },
  offerDetails: {
    top: 13,
    left: 112,
    position: "absolute",
  },
  offerImageIcon: {
    top: 17,
    left: 15,
    width: 74,
    height: 51,
    position: "absolute",
  },
  offerCard1: {
    marginLeft: 16,
  },
  offersRow: {
    width: "100%",
    marginTop: 14,
    alignSelf: "stretch",
  },
  offersSection: {
    marginTop: 30,
    alignSelf: "stretch",
  },
});

export default OffersSectionContainer;
