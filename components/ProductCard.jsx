import React from "react";
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";

const ProductCard = ({ title, thumbnail, description, purchaseLink }) => {
  return (
    <View style={styles.card}>
      {/* Thumbnail */}
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Text content */}
      <View style={styles.textContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Purchase Link - Buy Now Button */}
        <TouchableOpacity
          onPress={() => {
            if (purchaseLink) {
              Linking.openURL(purchaseLink).catch((err) =>
                console.error("Failed to open URL: ", err)
              );
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#22222E",
    borderRadius: 10,
    margin: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#CCC",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default ProductCard;
