import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type BottomTabType = {
  style?: StyleProp<ViewStyle>;
};

const BottomTab = ({ style }: BottomTabType) => {
  return (
    <View style={[styles.bottomTab, style]}>
      <Image
        style={styles.iconUserprofile}
        resizeMode="cover"
        source={require("../assets/icon--userprofile.png")}
      />
      <Text style={styles.search}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconUserprofile: {
    width: 20,
    height: 20,
    opacity: 0.8,
  },
  search: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorLightslategray,
    textAlign: "center",
    marginTop: 14,
  },
  bottomTab: {
    width: 61,
    alignItems: "center",
  },
});

export default BottomTab;
