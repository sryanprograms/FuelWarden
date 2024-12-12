//Not in use
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const ImagePickerComponent = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(resizedImage.uri);
    }
  };

  return (
    <TouchableOpacity
      className="bg-black-100 w-full h-20 justify-center items-center rounded-lg mb-5"
      onPress={pickImage}
    >
      {image ? (
        <Image source={{ uri: image }} className="w-full h-full rounded-lg" />
      ) : (
        <Text className="text-gray-400 text-lg text-center">
          Upload Supplement Label Image
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;
