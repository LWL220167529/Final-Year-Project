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

type BottomTab2Type = {
  style?: StyleProp<ViewStyle>;
};

const BottomTab2 = ({ style }: BottomTab2Type) => {
  return (
    <View style={[styles.bottomTab, style]}>
      <Image
        style={styles.iconOffers}
        resizeMode="cover"
        source={require("../assets/icon--offers.png")}
      />
      <Text style={styles.search}>Offers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconOffers: {
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

export default BottomTab2;
