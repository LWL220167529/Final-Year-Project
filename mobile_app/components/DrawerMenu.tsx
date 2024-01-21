import React, { useState } from "react";
import MenuItem2 from "./MenuItem2";
import MenuItem1 from "./MenuItem1";
import MenuItem from "./MenuItem";
import { Image, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

type DrawerMenuType = {
  state?: any;
  navigation?: any;
};

const DrawerMenu = ({ state, navigation }: DrawerMenuType) => {
  const [drawerItemsNormal] = useState([
    <MenuItem2 />,
    <MenuItem1 />,
    <MenuItem />,
  ]);
  const [drawerItemsActive] = useState([
    <MenuItem2 />,
    <MenuItem1 />,
    <MenuItem />,
  ]);
  const stateIndex = !state ? 0 : state.index - 1;

  return (
    <SafeAreaView style={styles.drawerMenu}>
      <View style={styles.view}>
        <View style={styles.menu}>
          <View style={styles.profile}>
            <View style={styles.group3Wrapper}>
              <Image
                style={styles.group3Icon}
                resizeMode="cover"
                source={require("../assets/group32.png")}
              />
            </View>
            <View style={styles.helloParent}>
              <Text style={[styles.hello, styles.helloClr]}>Hello</Text>
              <Text style={styles.macyJohnson}>Macy Johnson</Text>
            </View>
          </View>
          <View style={styles.menuChild} />
          <View style={styles.drawerMenuItems}>
            {stateIndex === 0 ? drawerItemsActive[0] : drawerItemsNormal[0]}
            {stateIndex === 1 ? drawerItemsActive[1] : drawerItemsNormal[1]}
            {stateIndex === 2 ? drawerItemsActive[2] : drawerItemsNormal[2]}
            <View style={[styles.menuItem3, styles.menuItemSpaceBlock]}>
              <Image
                style={[
                  styles.ionmailOutlineIcon,
                  styles.iconlylightprofileLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/ionmailoutline.png")}
              />
              <Text style={[styles.profile1, styles.profile1Layout]}>
                Get Help
              </Text>
            </View>
            <View style={[styles.menuItem4, styles.menuItemSpaceBlock]}>
              <Image
                style={[
                  styles.ionmailOutlineIcon,
                  styles.iconlylightprofileLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/calender.png")}
              />
              <Text style={[styles.profile1, styles.profile1Layout]}>
                Covid Advisory
              </Text>
            </View>
            <View style={[styles.menuItem3, styles.menuItemSpaceBlock]}>
              <Image
                style={[
                  styles.ionmailOutlineIcon,
                  styles.iconlylightprofileLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/rate.png")}
              />
              <Text style={[styles.profile1, styles.profile1Layout]}>
                Rate us
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.group3Wrapper}>
          <Text style={[styles.appVersion101, styles.profile1Layout]}>
            App version 1.0.1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mt28: {
    marginTop: 28,
  },
  drawerMenu: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  helloClr: {
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
  },
  profile1Layout: {
    lineHeight: 24,
    textAlign: "left",
  },
  menuItemSpaceBlock: {
    marginTop: 28,
    flexDirection: "row",
  },
  iconlylightprofileLayout: {
    height: 24,
    width: 24,
  },
  group3Icon: {
    width: 49,
    height: 49,
  },
  group3Wrapper: {
    flexDirection: "row",
  },
  hello: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
    textAlign: "left",
  },
  macyJohnson: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.robotoBold,
    color: Color.black,
    textAlign: "left",
  },
  helloParent: {
    marginLeft: 12,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
  },
  menuChild: {
    borderStyle: "solid",
    borderColor: Color.colorAliceblue_200,
    borderTopWidth: 1,
    height: 1,
    marginTop: 20,
    alignSelf: "stretch",
  },
  ionmailOutlineIcon: {
    overflow: "hidden",
  },
  profile1: {
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.robotoMedium,
    marginLeft: 16,
    color: Color.black,
  },
  menuItem3: {
    alignSelf: "stretch",
  },
  menuItem4: {
    alignItems: "center",
  },
  drawerMenuItems: {
    marginTop: 20,
  },
  menu: {
    alignSelf: "stretch",
  },
  appVersion101: {
    fontSize: FontSize.size_sm,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
  },
  view: {
    width: 320,
    height: 812,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_xl,
    backgroundColor: Color.colorWhite,
  },
});

export default DrawerMenu;
