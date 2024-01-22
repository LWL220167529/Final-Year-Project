import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type MenuItem2Type = {
  style?: StyleProp<ViewStyle>;
};

const MenuItem2 = ({ style }: MenuItem2Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Pressable
      style={[styles.menuItem, style]}
      onPress={() =>
        navigation.navigate("BottomTabsRoot", { screen: "Profile" })
      }
    >
      <Image
        style={styles.iconlylightprofile}
        resizeMode="cover"
        source={require("../assets/iconlylightprofile.png")}
      />
      <Text style={styles.profile}>Profile</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconlylightprofile: {
    width: 24,
    height: 24,
  },
  profile: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.robotoMedium,
    color: Color.black,
    textAlign: "left",
    marginLeft: 16,
  },
  menuItem: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
});

export default MenuItem2;
