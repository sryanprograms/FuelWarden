import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";

const commonPreferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Halal",
  "Kosher",
  "Low-Carb",
  "High-Protein",
  "Paleo",
  "Pescatarian",
];

const DietaryPreferencesSection = ({ initialData, onSave }) => {
  const [dietaryPreferences, setDietaryPreferences] = useState(
    initialData?.dietaryPreferences || []
  );
  const [customPreference, setCustomPreference] = useState("");

  const togglePreference = (preference) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences((prev) =>
        prev.filter((pref) => pref !== preference)
      );
    } else {
      setDietaryPreferences((prev) => [...prev, preference]);
    }
  };

  const addCustomPreference = () => {
    if (customPreference && !dietaryPreferences.includes(customPreference)) {
      setDietaryPreferences((prev) => [...prev, customPreference]);
      setCustomPreference("");
    }
  };

  const handleSave = () => {
    onSave({ dietaryPreferences });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-6">
        <Text
          variant="titleLarge"
          className="text-secondary text-center font-semibold mb-4"
        >
          Dietary Preferences
        </Text>

        {/* Common Preferences */}
        <Text className="text-gray-400 font-bold mb-2">
          Select Common Preferences:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {commonPreferences.map((preference) => (
            <TouchableOpacity
              key={preference}
              onPress={() => togglePreference(preference)}
              className={`px-4 py-2 rounded-full ${
                dietaryPreferences.includes(preference)
                  ? "bg-secondary"
                  : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  dietaryPreferences.includes(preference)
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {preference}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Preferences Input */}
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
              colors: { text: "white", placeholder: "gray", primary: "#D97706" }, // bg-secondary
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

        {/* Error Message */}
        <HelperText
          type="error"
          visible={customPreference && dietaryPreferences.includes(customPreference)}
          style={{ color: "#D97706" }}
        >
          Preference already added.
        </HelperText>

        {/* Selected Preferences */}
        <Text className="text-gray-400 font-bold mt-4">Your Preferences:</Text>
        {dietaryPreferences.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mt-2">
            {dietaryPreferences.map((preference) => (
              <TouchableOpacity
                key={preference}
                onPress={() => togglePreference(preference)}
                className="px-4 py-2 rounded-full bg-secondary"
              >
                <Text className="text-black text-sm font-medium">
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 mt-2">No preferences selected yet.</Text>
        )}

        {/* Save Preferences */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary mt-4"
          labelStyle={{ color: "black" }}
        >
          Save Preferences
        </Button>
      </View>
    </ScrollView>
  );
};

export default DietaryPreferencesSection;
