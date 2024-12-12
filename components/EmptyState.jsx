import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";


const EmptyState = ({ title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Text className="text-xl text-center font-semibold text-white mt-2">
        {title}
      </Text>
      <Image source={images.empty} className="w-[270] h-[215]" resizeMode='contain' />
      <Text className="font-pmedium text-sm text-gray-100">
        {subtitle}
      </Text>

      <CustomButton 
        title="Scan a supplement"
        handlePress={() => router.push('/scan')}
        containerStyle="w-full my-5"
      />
    </View>
  )
}

export default EmptyState;