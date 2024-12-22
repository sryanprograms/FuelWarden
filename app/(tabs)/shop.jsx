import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { images } from "../../constants";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import CustomButton from "../../components/CustomButton";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";

const Shop = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility

  const categories = [
    { name: "Protein Rich", description: "Supports muscle recovery and growth.", image: "protein_image_url" },
    { name: "Antioxidants", description: "Reduces oxidative stress.", image: "antioxidants_image_url" },
    { name: "Sleep Aids", description: "Helps improve sleep quality.", image: "sleep_aids_image_url" },
    { name: "Pre-Workout", description: "Boosts energy before exercise.", image: "preworkout_image_url" },
    { name: "Energy Drinks", description: "Quick energy boosts.", image: "energy_drinks_image_url" },
    { name: "Electrolytes", description: "Maintains hydration.", image: "electrolytes_image_url" },
    { name: "Carbohydrates", description: "Fuel for prolonged exercise.", image: "carbohydrates_image_url" },
    { name: "Healthy Fats", description: "Supports long-term energy.", image: "fats_image_url" },
  ];

  // Fetch products dynamically
  const fetchProducts = async (category = null) => {
  try {
    setRefreshing(true);
    const allPosts = await getAllPosts();

    let filteredPosts = allPosts;

    // Search Query Filtering
    if (query) {
      filteredPosts = filteredPosts.filter(
        (product) =>
          (product?.title?.toLowerCase()?.includes(query.toLowerCase()) || "") ||
          (product?.description?.toLowerCase()?.includes(query.toLowerCase()) || "")
      );
    }

    // Category Filtering
    if (category) {
      filteredPosts = filteredPosts.filter(
        (product) =>
          (product?.category?.toLowerCase()?.includes(category.toLowerCase()) || "")
      );
    }

    setPosts(filteredPosts);
    setRefreshing(false);
  } catch (error) {
    console.error("Error fetching products:", error);
    setRefreshing(false);
  }
};


  useEffect(() => {
    fetchProducts(selectedCategory?.name);
  }, [query, selectedCategory]);

  return (
    <SafeAreaView className="flex-1 bg-[#161622]">
      <Header
        greetingText="Supplement & Snack"
        userName="Database"
        logoSource={images.logoSmall}
      />

      {/* Category Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 m-2 p-4 bg-gray-800 rounded-lg items-center"
            onPress={() => {
              setSelectedCategory(item);
              setModalVisible(true); // Open modal for category details
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
            />
            <Text className="text-white font-bold text-center">{item.name}</Text>
            <Text className="text-gray-400 text-center text-sm">{item.description}</Text>
          </TouchableOpacity>
        )}
        numColumns={2} // Display as a grid
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 8 }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View
            style={{
              backgroundColor: "#242424",
              width: "90%",
              borderRadius: 12,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            {/* Close Button */}
            <View style={{ position: "absolute", top: 10, right: 10 }}>
              <CustomButton
                title="X"
                handlePress={() => setModalVisible(false)}
                containerStyles="bg-secondary w-[40px] h-[40px] rounded-full justify-center items-center"
                textStyles="text-primary text-center font-psemibold text-lg"
              />
            </View>

            {/* Header Section */}
            <View style={{ marginBottom: 16, alignItems: "center" }}>
              <Image
                source={{ uri: selectedCategory?.image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 12,
                  backgroundColor: "#666",
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {selectedCategory?.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#ccc",
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                {selectedCategory?.description}
              </Text>
            </View>

            {/* Products Section */}
            <FlatList
              data={posts}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <ProductCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  description={item.description}
                  purchaseLink={item.purchaseLink}
                />
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  title="No products found"
                  subtitle="Try exploring other categories."
                />
              )}
              style={{
                maxHeight: 300,
                marginTop: 16,
              }}
              contentContainerStyle={{
                paddingBottom: 16,
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Shop;
