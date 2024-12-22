import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ greetingText = "Settings", userName = "User", logoSource }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greetingText}>{greetingText}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image
        source={logoSource}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16, // Consistent horizontal padding
    paddingVertical: 12,  // Sleeker vertical padding
    backgroundColor: "#161622", // Matches the Profile page background
  },
  greetingText: {
    fontSize: 14,
    color: "#AAA",
    fontWeight: "500",
  },
  userName: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  logo: {
    width: 40,
    height: 40,
  },
});

export default Header;
