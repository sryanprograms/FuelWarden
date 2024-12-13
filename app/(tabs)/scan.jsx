import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Modal from "react-native-modal";
import Header from "../../components/Header";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import nsfBadge from "../../assets/nsf_certified.png";
import informedSportBadge from "../../assets/informed_sport.png";
import axios from "axios"; 


const { width, height } = Dimensions.get("window");
const innerDimension = 300; // Size of the scan area

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // Control scanning

  // Map of labels to badge images
  const labelImages = {
    "nsf-sport-certified": nsfBadge,
    "informed-sport-certified": informedSportBadge,
  };

  // Request camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  // Handle barcode scanning results
  const handleBarcodeScanned = async ({ type, data }) => {
    if (!isScanning) return; // Prevent scanning if already processing
    setIsScanning(false); // Disable further scans
    setScannedBarcode(data); // Store scanned data
    await fetchProductDetails(data); // Fetch product details from API
  };

  const fetchOpenAIAnalysis = async (prompt) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // Correct endpoint for chat models
        {
          model: "gpt-4o-mini", // Use the correct model
          messages: [
            { role: "system", content: "You are a helpful nutrition expert." }, // System role
            { role: "user", content: prompt }, // User role with the prompt
          ],
          max_tokens: 100, // Limit the number of tokens in the response
          temperature: 0.7, // Adjust creativity level
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // API key for authentication
          },
        }
      );
  
      // Extract the content of the assistant's response
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("OpenAI API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch analysis from OpenAI");
    }
  };

  
  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();
  
      if (data.status === 1) {
        const product = data.product;
  
        const rawLabels = product.labels_tags || [];
        const labels = rawLabels.map((label) => label.split(":").pop().trim());
        const ingredients = product.ingredients_text || "No ingredients available";
  
        const matchingLabels = labels.filter((label) => label in labelImages);
        const badges = matchingLabels.map((label) => ({
          label: label.replace(/-/g, " "),
          image: labelImages[label],
        }));
  
        const prompt = `
          You are a sports nutrition expert. Based on the following product information, provide a brief summary (2–3 sentences) explaining how 
          this product might impact an athlete's performance, energy, or recovery. Keep it simple and focused on practical benefits or 
          potential risks for athletes.

          Product Name: ${product.product_name || "Unknown"}
          Ingredients: ${ingredients}
          Labels: ${labels.join(", ")}
        `;
  
        const analysis = await fetchOpenAIAnalysis(prompt);
  
        setProductDetails({
          name: product.product_name || "Unknown",
          labels,
          ingredients,
          badges,
          analysis,
        });
  
        setIsModalVisible(true);
      } else {
        setProductDetails({
          name: "Unknown Product",
          labels: [],
          ingredients: "No ingredients available",
          badges: [],
          analysis: "No analysis available.",
        });
        setIsModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product details or generate analysis.");
      console.error(error);
      setScannedBarcode(null); // Reset for next scan
    } finally {
      setIsScanning(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
    setScannedBarcode(null); // Reset the scanned barcode
    setIsScanning(true); // Re-enable scanning
  };
  


  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <SafeAreaView className="bg-[#161622] z-10">
        <Header
          greetingText="Supplement"
          userName="Scanner"
          logoSource={images.logoSmall}
        />
      </SafeAreaView>

      {/* Camera View */}
      <CameraView
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
        }}
        className="flex-1"
      />

      {/* Scanner Overlay */}
      <View className="absolute top-0 left-0 w-full h-full">
        {/* Top Overlay */}
        <View
          className="bg-black opacity-60"
          style={{ height: (height - innerDimension) / 2 }}
        />

        {/* Middle Row */}
        <View className="flex-row">
          <View
            className="bg-black opacity-60"
            style={{ width: (width - innerDimension) / 2 }}
          />
          <View
            className="border-2 border-orange-500 rounded-lg"
            style={{ width: innerDimension, height: innerDimension }}
          />
          <View
            className="bg-black opacity-60"
            style={{ width: (width - innerDimension) / 2 }}
          />
        </View>

        {/* Bottom Overlay */}
        <View
          className="bg-black opacity-60"
          style={{ height: (height - innerDimension) / 2 }}
        />
      </View>

      {/* Modal */}
      {productDetails && (
        <Modal
        isVisible={isModalVisible}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{ backgroundColor: "#FFF5EB", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 }}>
          {/* Product Name */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: "#FF6F00", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
              {productDetails.name}
            </Text>
          </View>
      
          {/* Certifications & Labels */}
          {productDetails.labels.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#333", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                Certifications & Labels
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {productDetails.badges.map((badge, index) => (
                  <View key={index} style={{ alignItems: "center", marginRight: 16, marginBottom: 8 }}>
                    <Image
                      source={badge.image}
                      style={{ width: 48, height: 48, marginBottom: 4 }}
                      resizeMode="contain"
                    />
                    <Text style={{ color: "#555", fontSize: 12, textAlign: "center" }}>{badge.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
      
          {/* Ingredients */}
          {productDetails.ingredients && (
            <View style={{ marginBottom: 16, padding: 16, backgroundColor: "#FFFAF0", borderRadius: 12 }}>
              <Text style={{ color: "#333", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                Ingredients
              </Text>
              <Text style={{ color: "#666", fontSize: 14 }}>{productDetails.ingredients}</Text>
            </View>
          )}
      
          {/* AI Analysis */}
          {productDetails.analysis && (
            <View style={{ marginBottom: 16, padding: 16, backgroundColor: "#FFF3E0", borderRadius: 12 }}>
              <Text style={{ color: "#333", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                AI Analysis
              </Text>
              <Text style={{ color: "#666", fontSize: 14, lineHeight: 20 }}>
                {productDetails.analysis}
              </Text>
            </View>
          )}
      
          {/* Close Button */}
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text
              style={{
                color: "#FF6F00",
                fontSize: 16,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
              onPress={closeModal}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>
      
      )}
    </View>
  );
}
