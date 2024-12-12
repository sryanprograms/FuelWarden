import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const innerDimension = 300; // Size of the scan area

export const Overlay = () => {
  return (
    <View style={styles.overlayContainer}>
      {/* Top overlay */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />

      {/* Middle Row with left overlay, scan area, and right overlay */}
      <View style={styles.middleRow}>
        <View style={[styles.overlay, { width: (width - innerDimension) / 2 }]} />
        <View style={styles.scanArea} />
        <View style={[styles.overlay, { width: (width - innerDimension) / 2 }]} />
      </View>

      {/* Bottom overlay */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1,
  },
  // overlay: {
  //   backgroundColor: "#161622", // Semi-transparent blue
  // },
  middleRow: {
    flexDirection: "row",
  },
  scanArea: {
    width: innerDimension,
    height: innerDimension,
    borderWidth: 2,
    borderColor: "#FFA001", // orange border to indicate the scanning area
    borderRadius: 10, // Rounded corners (optional)
  },
});

export default Overlay;