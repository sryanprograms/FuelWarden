import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ greetingText = "Settings", userName = "User", logoSource }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greetingText}>{greetingText}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View>
        <Image
          source={logoSource}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#161622",
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
    width: 36,
    height: 36,
  },
});

export default Header;
