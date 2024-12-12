import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";

import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center justify-between">
        <TextInput
          className="text-base mb-5 text-white flex-1 font-pregular"
          value={value}
          placeholder="Search for a supplement"
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        
        <TouchableOpacity>
            <Image 
                source={icons.search}
                className='w-5 h-5'
                reszieMode='contain'
            />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;