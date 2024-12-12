import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const ProductCard = ({ title, thumbnail, description, purchaseLink }) => {
  return (
    <View
      className="flex flex-col bg-gray-900 p-4 mb-6 rounded-lg border border-gray-700 shadow-lg mx-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: thumbnail }}
        className="w-full h-40 rounded-lg"
        resizeMode="cover"
      />

      {/* Text content */}
      <View className="mt-4">
        {/* Title */}
        <Text className="text-lg font-semibold text-white" numberOfLines={1}>
          {title}
        </Text>

        {/* Description */}
        <Text className="text-sm text-gray-400 mt-2" numberOfLines={2}>
          {description}
        </Text>

        {/* Purchase Link - Buy Now Button */}
        <TouchableOpacity
          onPress={() => {
            if (purchaseLink) {
              Linking.openURL(purchaseLink)
                .catch(err => console.error("Failed to open URL: ", err)); // Error handling
            }
          }}
          className="mt-4 bg-secondary-100 py-2 px-4 rounded-lg"
          style={{
            //backgroundColor: "#4f8ef7", // Custom button color
            alignItems: "center",
          }}
        >
          <Text className="text-sm text-white font-semibold">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
