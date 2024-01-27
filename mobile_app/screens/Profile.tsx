import React, {useState, useEffect} from "react";
import {
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [hasData, setHasData] = useState(false);




  return (
    <ImageBackground
      style={styles.profileIcon}
      resizeMode="cover"
      source={require("../assets/profile.png")}
    >
      <ScrollView
        style={styles.profileSection}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.profileSectionScrollViewContent}
      >
        <View style={[styles.header, styles.headerSpaceBlock]}>

          <View
            style={[styles.fluentedit48RegularWrapper, styles.wrapperShadowBox]}
          >
            <Image
              style={styles.iconBack}
              resizeMode="cover"
              source={require("../assets/fluentedit48regular.png")}
            />
          </View>
        </View>
        <View style={styles.profileBody}>
          <View style={[styles.profileDrawer, styles.wrapperShadowBox]}>
            <View style={styles.profileDetails}>
              <View style={styles.nameParticulars}>
                <View>
                  <Text style={styles.macyJohnson}>Macy Johnson</Text>
                  <Text style={styles.baguioPhilippines}>
                    Baguio, Philippines
                  </Text>
                </View>
              </View>
              <Text style={[styles.iLikeThe, styles.profileSpaceBlock]}>
                I like the beach, mountains, forest and everything about nature!
                :)
              </Text>
              <View
                style={[styles.profileDetailsChild, styles.profileSpaceBlock]}
              />
              <View style={[styles.profileOptions, styles.profileSpaceBlock]}>

                <View style={styles.questionsFlexBox}>
                  <View style={styles.rate}>
                    <Image
                      style={styles.humbleiconsuserAsking}
                      resizeMode="cover"
                      source={require("../assets/humbleiconsuserasking.png")}
                    />
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("ProfileDetail")}>
                  <View style={styles.referralCodeParent}>
                    <Text style={styles.referralCodeTypo}>Show your details</Text>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.questionsFlexBox}>
                  <View style={styles.rate}>
                    <Image
                      style={styles.iconBack}
                      resizeMode="cover"
                      source={require("../assets/majesticonslogouthalfcircleline.png")}
                    />
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={[styles.paymentDetails, styles.referralCodeTypo]}
                  >
                    Logout
                  </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.questions, styles.questionsFlexBox]}>
                  <Image
                    style={styles.humbleiconsuserAsking}
                    resizeMode="cover"
                    source={require("../assets/ionhelpcircleoutline.png")}
                  />
                  <Text style={[styles.haveQuestionsWe, styles.iLikeTheTypo]}>
                    Have questions? We are here to help
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.profileImage}>
            <Image
              style={styles.group3Icon}
              resizeMode="cover"
              source={require("../assets/group31.png")}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileSectionScrollViewContent: {
    flexDirection: "column",
    paddingTop: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerSpaceBlock: {
    padding: Padding.p_base,
    justifyContent: "space-between",
  },
  wrapperShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Color.colorWhite,
    flexDirection: "row",
  },
  profileSpaceBlock: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  referralCodeTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
  },
  questionsFlexBox: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  iLikeTheTypo: {
    lineHeight: 24,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  searchTypo: {
    marginTop: 14,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "center",
    fontSize: FontSize.size_smi,
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  iconBack: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  iconBackWrapper: {
    padding: Padding.p_7xs,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: Border.br_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Color.colorWhite,
  },
  fluentedit48RegularWrapper: {
    padding: Padding.p_7xs,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: Border.br_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Color.colorWhite,
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  macyJohnson: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.black,
  },
  baguioPhilippines: {
    marginTop: 2,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  nameParticulars: {
    alignSelf: "stretch",
  },
  iLikeThe: {
    lineHeight: 24,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.black,
    marginTop: 16,
  },
  profileDetailsChild: {
    borderStyle: "solid",
    borderColor: Color.colorAliceblue_200,
    borderTopWidth: 1,
    height: 1,
  },
  rate: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.colorAliceblue_100,
    padding: Padding.p_7xs,
  },
  paymentDetails: {
    marginLeft: 16,
  },
  profileOption: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  humbleiconsuserAsking: {
    width: 22,
    height: 22,
    overflow: "hidden",
  },
  new: {
    lineHeight: 18,
    textTransform: "uppercase",
    color: Color.colorWhite,
    textAlign: "center",
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
  },
  newWrapper: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorMediumaquamarine,
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_11xs,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  referralCodeParent: {
    marginLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  haveQuestionsWe: {
    color: Color.colorCornflowerblue,
    marginLeft: 8,
  },
  questions: {
    borderRadius: 7,
    backgroundColor: "#eaf5ff",
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  profileOptions: {
    height: 322,
  },
  profileDetails: {
    flex: 1,
  },
  profileDrawer: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowRadius: 20,
    elevation: 20,
    paddingHorizontal: Padding.p_base,
    paddingVertical: 43,
    zIndex: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Color.colorWhite,
    shadowOpacity: 1,
    alignSelf: "stretch",
  },
  group3Icon: {
    width: 90,
    height: 90,
  },
  profileImage: {
    position: "absolute",
    top: 0,
    left: 16,
    zIndex: 1,
    flexDirection: "row",
  },
  profileBody: {
    paddingTop: 42,
    marginTop: 50,
    alignSelf: "stretch",
  },
  profileSection: {
    alignSelf: "stretch",
    flex: 1,
  },
  profileIcon: {
    width: "100%",
    flex: 1,
  },
});

export default Profile;
