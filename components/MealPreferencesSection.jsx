import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const commonFoods = [
  "Fruits",
  "Vegetables",
  "Carbs",
  "Seafood",
  "Legumes",
  "Dairy",
  "Nuts & Seeds",
  "Eggs",
  "Red Meat",
];

const MealPreferencesSection = ({ initialData, onSave }) => {
  const [preferredFoods, setPreferredFoods] = useState(
    initialData?.preferredFoods || []
  );
  const [dislikedFoods, setDislikedFoods] = useState(
    initialData?.dislikedFoods || []
  );
  const [customPreference, setCustomPreference] = useState("");
  const [customDislike, setCustomDislike] = useState("");

  const toggleFood = (food, list, setList) => {
    if (list.includes(food)) {
      setList((prev) => prev.filter((f) => f !== food));
    } else {
      setList((prev) => [...prev, food]);
    }
  };

  const addCustomPreference = () => {
    if (customPreference && !preferredFoods.includes(customPreference)) {
      setPreferredFoods((prev) => [...prev, customPreference]);
      setCustomPreference("");
    }
  };

  const addCustomDislike = () => {
    if (customDislike && !dislikedFoods.includes(customDislike)) {
      setDislikedFoods((prev) => [...prev, customDislike]);
      setCustomDislike("");
    }
  };

  const handleSave = () => {
    onSave({ preferredFoods, dislikedFoods });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-6">
        <Text
          variant="titleLarge"
          className="text-secondary text-center font-semibold mb-4"
        >
          Meal Preferences
        </Text>

        {/* Preferred Foods */}
        <Text className="text-gray-400 font-bold mb-2">
          Select Preferred Foods:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {commonFoods.map((food) => (
            <TouchableOpacity
              key={food}
              onPress={() => toggleFood(food, preferredFoods, setPreferredFoods)}
              className={`px-4 py-2 rounded-full ${
                preferredFoods.includes(food) ? "bg-secondary" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  preferredFoods.includes(food) ? "text-black" : "text-white"
                }`}
              >
                {food}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Custom Preferred Food */}
        <Text className="text-gray-400 font-bold mt-4 mb-2">
          Add a Custom Preference:
        </Text>
        <View className="flex-row items-center">
          <TextInput
            value={customPreference}
            onChangeText={setCustomPreference}
            placeholder="Enter a custom preference"
            mode="outlined"
            className="bg-gray-800 flex-1"
            theme={{
              colors: { text: "white", placeholder: "gray", primary: "#D97706" },
            }}
          />
          <Button
            mode="contained"
            onPress={addCustomPreference}
            className="ml-2 bg-gray-700"
            labelStyle={{ color: "#D97706", fontSize: 12 }}
            disabled={!customPreference}
          >
            Add
          </Button>
        </View>

        {/* Disliked Foods */}
        <Text className="text-gray-400 font-bold mt-6 mb-2">
          Select Disliked Foods:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {commonFoods.map((food) => (
            <TouchableOpacity
              key={food}
              onPress={() => toggleFood(food, dislikedFoods, setDislikedFoods)}
              className={`px-4 py-2 rounded-full ${
                dislikedFoods.includes(food) ? "bg-secondary" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  dislikedFoods.includes(food) ? "text-black" : "text-white"
                }`}
              >
                {food}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Custom Disliked Food */}
        <Text className="text-gray-400 font-bold mt-4 mb-2">
          Add a Custom Dislike:
        </Text>
        <View className="flex-row items-center">
          <TextInput
            value={customDislike}
            onChangeText={setCustomDislike}
            placeholder="Enter a custom dislike"
            mode="outlined"
            className="bg-gray-800 flex-1"
            theme={{
              colors: { text: "white", placeholder: "gray", primary: "#D97706" },
            }}
          />
          <Button
            mode="contained"
            onPress={addCustomDislike}
            className="ml-2 bg-gray-700"
            labelStyle={{ color: "#D97706", fontSize: 12 }}
            disabled={!customDislike}
          >
            Add
          </Button>
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary mt-6"
          labelStyle={{ color: "black" }}
        >
          Save Meal Preferences
        </Button>
      </View>
    </ScrollView>
  );
};

export default MealPreferencesSection;
