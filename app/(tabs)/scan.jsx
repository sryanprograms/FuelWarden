import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Modal from "react-native-modal"; // For modal animations

const { width, height } = Dimensions.get("window");
const innerDimension = 300; // Size of the scan area

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // Control scanning

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
        setProductDetails(data.product); // Save product details
        setIsModalVisible(true); // Show modal with details
      } else {
        setProductDetails("Sorry: This product isn't in our database."); // Save product details
        setIsModalVisible(true); // Show modal with details
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
      {/* Camera View with Barcode Scanner */}
      <CameraView
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"], // Add barcode types as needed
        }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      {/* Custom Overlay */}
      <View className="absolute top-0 left-0 w-full h-full">
        {/* Top Overlay */}
        <View className="bg-black opacity-60" style={{ height: (height - innerDimension) / 2 }} />

        {/* Middle Row */}
        <View className="flex-row">
          <View className="bg-black opacity-60" style={{ width: (width - innerDimension) / 2 }} />
          <View
            className="border-2 border-orange-500 rounded-lg"
            style={{ width: innerDimension, height: innerDimension }}
          />
          <View className="bg-black opacity-60" style={{ width: (width - innerDimension) / 2 }} />
        </View>

        {/* Bottom Overlay */}
        <View className="bg-black opacity-60" style={{ height: (height - innerDimension) / 2 }} />
      </View>

      {/* Modal for Product Details */}
      {productDetails && (
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={closeModal}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0 }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View className="bg-orange-500 rounded-t-2xl p-4">
            <Text className="text-white text-lg font-bold mb-2">
              Product Name: {productDetails.product_name || "Unknown"}
            </Text>
            <Text className="text-white text-sm mb-2">
              Ingredients: {productDetails.ingredients_text || "No ingredients available"}
            </Text>
            <Text
              className="text-white text-center mt-2 underline"
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
