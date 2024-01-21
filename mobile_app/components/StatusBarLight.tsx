import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type StatusBarLightType = {
  /** Style props */
  statusBarLightBackgroundColor?: string;
  statusBarLightAlignSelf?: string;
  statusBarLightWidth?: number | string;
  timeFontFamily?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const StatusBarLight = ({
  statusBarLightBackgroundColor,
  statusBarLightAlignSelf,
  statusBarLightWidth,
  timeFontFamily,
}: StatusBarLightType) => {
  const statusBarLightStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", statusBarLightBackgroundColor),
      ...getStyleValue("alignSelf", statusBarLightAlignSelf),
      ...getStyleValue("width", statusBarLightWidth),
    };
  }, [
    statusBarLightBackgroundColor,
    statusBarLightAlignSelf,
    statusBarLightWidth,
  ]);

  const timeStyle = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", timeFontFamily),
    };
  }, [timeFontFamily]);

  return (
    <View style={[styles.statusBarLight, statusBarLightStyle]}>
      <Image
        style={styles.icons}
        resizeMode="cover"
        source={require("../assets/icons.png")}
      />
      <Text style={[styles.time, timeStyle]}>9:41</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    top: 18,
    right: 14,
    width: 67,
    height: 11,
    position: "absolute",
  },
  time: {
    marginTop: -8,
    top: "50%",
    left: 32,
    fontSize: FontSize.subheadlineBold_size,
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.subheadlineBold,
    color: Color.lightLabelPrimary,
    textAlign: "left",
    position: "absolute",
  },
  statusBarLight: {
    height: 44,
    alignSelf: "stretch",
  },
});

export default StatusBarLight;
