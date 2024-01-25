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

type BottomTab8Type = {
  style?: StyleProp<ViewStyle>;
};

const BottomTab8 = ({ style }: BottomTab8Type) => {
  return (
    <View style={[styles.bottomTab, style]}>
      <Image
        style={styles.iconExploreSelected}
        resizeMode="cover"
        source={require("../assets/icon--exploreselected.png")}
      />
      <Text style={styles.search}>Explore</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconExploreSelected: {
    width: 20,
    height: 20,
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

export default BottomTab8;
