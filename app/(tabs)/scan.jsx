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
const scanBoxWidth = 300; // Wider than it is tall
const scanBoxHeight = 100; // Smaller height for a barcode shape

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scanFeedback, setScanFeedback] = useState(
    "Align the barcode inside the box to scan."
  ); // Default feedback

  // Label images for certifications
  const labelImages = {
    "nsf-sport-certified": nsfBadge,
    "informed-sport-certified": informedSportBadge,
  };

  useEffect(() => {
    // Request camera permissions
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!isScanning) return; // Prevent redundant scans
    setIsScanning(false); // Disable scanning temporarily
    setScanFeedback("Analyzing your barcode...");

    try {
      const details = await fetchProductDetails(data); // Fetch product info
      setProductDetails(details);
      setIsModalVisible(true); // Show modal with details
    } catch (error) {
      Alert.alert("Error", "Failed to analyze barcode. Please try again.");
      console.error("Error during barcode processing:", error);
    } finally {
      setScanFeedback("Align the barcode inside the box to scan."); // Reset feedback
      setIsScanning(true); // Re-enable scanning
    }
  };

  const fetchOpenAIAnalysis = async (prompt) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful nutrition expert." },
            { role: "user", content: prompt },
          ],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("OpenAI API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch AI analysis.");
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

        return {
          name: product.product_name || "Unknown",
          labels,
          ingredients,
          badges,
          analysis,
        };
      } else {
        throw new Error("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setScannedBarcode(null);
    setProductDetails(null);
    setScanFeedback("Align the barcode inside the box to scan."); // Reset feedback
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
          style={{ height: (height - scanBoxHeight) / 2 }}
        />
        {/* Middle Row */}
        <View className="flex-row">
          <View
            className="bg-black opacity-60"
            style={{ width: (width - scanBoxWidth) / 2 }}
          />
          <View
            className="border-2 border-orange-500 rounded-md"
            style={{ width: scanBoxWidth, height: scanBoxHeight }}
          />
          <View
            className="bg-black opacity-60"
            style={{ width: (width - scanBoxWidth) / 2 }}
          />
        </View>
        {/* Bottom Overlay */}
        <View
          className="bg-black opacity-60"
          style={{ height: (height - scanBoxHeight) / 2 }}
        />
      </View>

      {/* Feedback */}
      <View style={{ position: "absolute", bottom: 100, width: "100%", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          {scanFeedback}
        </Text>
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
            <Text style={{ color: "#FF6F00", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
              {productDetails.name}
            </Text>
            {/* Certifications & Labels */}
            {productDetails.badges.length > 0 && (
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
            <Text
              style={{
                color: "#FF6F00",
                fontSize: 16,
                textAlign: "center",
                textDecorationLine: "underline",
                marginTop: 16,
              }}
              onPress={closeModal}
            >
              Close
            </Text>
          </View>
        </Modal>
      )}
    </View>
  );
}
