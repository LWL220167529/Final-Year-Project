import * as React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

type Header1Type = {
  style?: StyleProp<ViewStyle>;
};

const Header1 = ({ style }: Header1Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView style={[styles.header, style]}>
      <View style={styles.view}>
        <Pressable
          style={styles.iconLayout5}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icon--back.png")}
          />
        </Pressable>
        <View style={styles.bookings}>
          <Text style={styles.bookings1}>Bookings</Text>
        </View>
        <Image
          style={[styles.iconKebab, styles.iconLayout5]}
          resizeMode="cover"
          source={require("../assets/icon--kebab1.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.colorWhite,
  },
  iconLayout5: {
    height: 32,
    width: 32,
  },
  icon: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  bookings1: {
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.black,
    textAlign: "left",
  },
  bookings: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconKebab: {
    overflow: "hidden",
  },
  view: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
  },
});

export default Header1;
