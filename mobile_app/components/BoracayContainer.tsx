import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import { Color, FontFamily, Border, FontSize, Padding } from "../GlobalStyles";

const BoracayContainer = () => {
  return (
    <View style={styles.bottomDrawer}>
      <View style={styles.bottomDrawerContent}>
        <View style={[styles.title, styles.titleFlexBox]}>
          <View style={styles.frameParent}>
            <View>
              <Text style={[styles.boracay, styles.textTypo]}>Boracay</Text>
              <Text style={styles.philippines}>Philippines</Text>
            </View>
            <View style={styles.d4nWrapper}>
              <Text style={[styles.d4n, styles.d4nTypo]}>5D4N</Text>
            </View>
          </View>
          <Text style={[styles.text, styles.textTypo]}>$349</Text>
        </View>
        <View style={[styles.overviewText, styles.imagesSpaceBlock]}>
          <Text style={[styles.overview, styles.photosLayout]}>Overview</Text>
          <Text style={[styles.spend5Days, styles.photosLayout]}>
            Spend 5 days and 4 nights in one of the best islands in the world!
            Bask in the sun while walking in the white sand beach and enjoy the
            night partying at the popular seaside bars.
          </Text>
        </View>
        <View style={styles.imagesSpaceBlock}>
          <Text style={[styles.photos, styles.photosLayout]}>Photos</Text>
          <ScrollView
            style={styles.photosRow}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.photosRowScrollViewContent}
          >
            <Image
              style={styles.photoIconLayout}
              resizeMode="cover"
              source={require("../assets/photo.png")}
            />
            <Image
              style={[styles.photoIcon1, styles.photoIconLayout]}
              resizeMode="cover"
              source={require("../assets/photo1.png")}
            />
            <Image
              style={[styles.photoIcon1, styles.photoIconLayout]}
              resizeMode="cover"
              source={require("../assets/photo2.png")}
            />
            <Image
              style={[styles.photoIcon1, styles.photoIconLayout]}
              resizeMode="cover"
              source={require("../assets/photo3.png")}
            />
            <Image
              style={[styles.photoIcon1, styles.photoIconLayout]}
              resizeMode="cover"
              source={require("../assets/photo4.png")}
            />
            <Image
              style={[styles.photoIcon1, styles.photoIconLayout]}
              resizeMode="cover"
              source={require("../assets/photo5.png")}
            />
          </ScrollView>
        </View>
        <View style={[styles.buttonPrimary, styles.imagesSpaceBlock]}>
          <Text style={styles.viewDetails}>Book Now</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photosRowScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  titleFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    color: Color.black,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
  },
  d4nTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  imagesSpaceBlock: {
    marginTop: 24,
    alignSelf: "stretch",
  },
  photosLayout: {
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
  },
  photoIconLayout: {
    height: 90,
    borderRadius: Border.br_9xs,
    width: 120,
  },
  boracay: {
    fontSize: FontSize.size_5xl,
    textAlign: "left",
  },
  philippines: {
    color: Color.colorLightslategray,
    marginTop: 2,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  d4n: {
    color: Color.colorDimgray_100,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  d4nWrapper: {
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorWhitesmoke_200,
    overflow: "hidden",
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_9xs,
    marginLeft: 3,
    flexDirection: "row",
  },
  frameParent: {
    flexDirection: "row",
  },
  text: {
    fontSize: FontSize.size_9xl,
    textAlign: "left",
  },
  title: {
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  overview: {
    top: 0,
    left: 0,
    position: "absolute",
    lineHeight: 24,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
  },
  spend5Days: {
    top: "25%",
    left: "0%",
    width: "100%",
    position: "absolute",
    lineHeight: 24,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interRegular,
  },
  overviewText: {
    height: 128,
  },
  photos: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
  },
  photoIcon1: {
    marginLeft: 10,
  },
  photosRow: {
    marginTop: 8,
    width: "100%",
    alignSelf: "stretch",
  },
  viewDetails: {
    color: Color.colorWhite,
    textAlign: "center",
    width: 120,
    lineHeight: 24,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
  },
  buttonPrimary: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorOrange,
    justifyContent: "center",
    paddingHorizontal: Padding.p_85xl,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomDrawerContent: {
    flex: 1,
  },
  bottomDrawer: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xl,
    flexDirection: "row",
    alignSelf: "stretch",
  },
});

export default BoracayContainer;
