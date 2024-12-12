import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Modal from "react-native-modal";
import Header from "../../components/Header";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import nsfBadge from "../../assets/nsf_certified.png";
import informedSportBadge from "../../assets/informed_sport.png";

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

  // Fetch product details from OpenFoodFacts API
  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        const product = data.product;

        // Normalize labels by removing language prefixes
        const rawLabels = product.labels_tags || [];
        console.log("Raw Labels from API: ", rawLabels);

        const labels = rawLabels.map((label) => label.split(":").pop().trim()); // Normalize
        console.log("Normalized Labels: ", labels);

        const ingredients = product.ingredients_text || "No ingredients available";

        // Determine badge images based on normalized labels
        const matchingLabels = labels.filter((label) => label in labelImages);
        console.log("Matching Labels: ", matchingLabels);

        const badges = matchingLabels.map((label) => ({
          label: label.replace(/-/g, " "), // Format for display
          image: labelImages[label], // Map to image
        }));
        console.log("Badges: ", badges);

        setProductDetails({
          name: product.product_name || "Unknown",
          labels, // Store normalized labels
          ingredients,
          badges,
        });

        setIsModalVisible(true);
      } else {
        setProductDetails({
          name: "Unknown Product",
          labels: [],
          ingredients: "No ingredients available",
          badges: [],
        });
        setIsModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product details.");
      console.error(error);
      setScannedBarcode(null); // Reset for next scan
    } finally {
      setIsScanning(true); // Re-enable scanning
    }
  };

  // Reset the state for the next scan when modal is closed
  const closeModal = () => {
    setIsModalVisible(false);
    setScannedBarcode(null); // Allow scanning again
    setIsScanning(true); // Re-enable scanning
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Requesting for camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">No access to camera</Text>
      </View>
    );
  }

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
          <View style={{ backgroundColor: "#FFA500", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              Product Name: {productDetails.name}
            </Text>

            {/* Display Labels */}
            {productDetails.labels.length > 0 ? (
              <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Certifications & Labels:</Text>
              
              {productDetails.labels
                .filter((label) => !productDetails.badges.some((badge) => badge.label.toLowerCase() === label.replace(/-/g, " ").toLowerCase()))
                .map((label, index) => (
                  <Text key={index} style={{ color: "white", fontSize: 14 }}>
                    - {label.replace(/-/g, " ")} {/* Replace hyphens with spaces */}
                  </Text>
                ))}
            
              {/* Display Badge Images */}
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {productDetails.badges.map((badge, index) => (
                  <View key={index} style={{ marginRight: 16, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 12, marginBottom: 4 }}>{badge.label}</Text>
                    <Image
                      source={badge.image}
                      style={{ width: 48, height: 48 }}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>
            </View>
            ) : (
              <Text style={{ color: "white", fontSize: 14, marginBottom: 8 }}>
                No certifications or labels available.
              </Text>
            )}

            {/* Display Ingredients */}
            <Text style={{ color: "white", fontSize: 14, marginBottom: 8 }}>
              Ingredients: {productDetails.ingredients}
            </Text>

            <Text
              style={{ color: "white", textAlign: "center", textDecorationLine: "underline", marginTop: 8 }}
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
