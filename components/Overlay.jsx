//COMPONENT IS CURRENTLY NOT IN USE. I ran into issues where when I used a component of the scanner overlay to simplify code complexity it cause the popup to not output properly or even at all
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const innerWidth = 350; // Width of the scan area
const innerHeight = 120; // Height of the scan area

export const Overlay = () => {
  return (
    <View style={styles.overlayContainer}>
      {/* Top overlay */}
      <View style={[styles.overlay, { height: (height - innerHeight) / 2 }]} />

      {/* Middle Row with left overlay, scan area, and right overlay */}
      <View style={styles.middleRow}>
        <View style={[styles.overlay, { width: (width - innerWidth) / 2 }]} />
        <View style={[styles.scanAreaContainer, { width: innerWidth, height: innerHeight }]}>
          {/* Animated border lines */}
          <View style={styles.scanLine} />
        </View>
        <View style={[styles.overlay, { width: (width - innerWidth) / 2 }]} />
      </View>

      {/* Bottom overlay */}
      <View style={[styles.overlay, { height: (height - innerHeight) / 2 }]} />
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
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
  },
  middleRow: {
    flexDirection: "row",
  },
  scanAreaContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFA001", // Orange border
    borderRadius: 8,
    overflow: "hidden", // Ensure elements inside the scan area stay clipped
  },
  scanLine: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 2,
    backgroundColor: "#FFA001", // Orange scan line
    opacity: 0.8,
    animationKeyframes: {
      "0%": { transform: [{ translateY: 0 }] },
      "100%": { transform: [{ translateY: "100%" }] },
    },
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDuration: "2s",
  },
});

export default Overlay;
