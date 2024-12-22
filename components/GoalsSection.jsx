import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";

const commonGoals = [
  "Gain Muscle",
  "Lose Weight",
  "Maintain Weight",
  "Gain Weight",
];

const GoalsSection = ({ initialData, onSave }) => {
  const [goals, setGoals] = useState(initialData?.goals || []);
  const [customGoal, setCustomGoal] = useState("");

  const toggleGoal = (goal) => {
    if (goals.includes(goal)) {
      setGoals((prev) => prev.filter((g) => g !== goal));
    } else {
      setGoals((prev) => [...prev, goal]);
    }
  };

  const addCustomGoal = () => {
    if (customGoal && !goals.includes(customGoal)) {
      setGoals((prev) => [...prev, customGoal]);
      setCustomGoal("");
    }
  };

  const handleSave = () => {
    onSave({ goals });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-6">
        <Text
          variant="titleLarge"
          className="text-secondary text-center font-semibold mb-4"
        >
          Nutrition & Wellness Goals
        </Text>

        {/* Common Goals */}
        <Text className="text-gray-400 font-bold mb-2">
          Select Common Goals:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {commonGoals.map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => toggleGoal(goal)}
              className={`px-4 py-2 rounded-full ${
                goals.includes(goal) ? "bg-secondary" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  goals.includes(goal) ? "text-black" : "text-white"
                }`}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Goals Input */}
        <Text className="text-gray-400 font-bold mt-4 mb-2">
          Add a Custom Goal:
        </Text>
        <View className="flex-row items-center">
          <TextInput
            value={customGoal}
            onChangeText={setCustomGoal}
            placeholder="Enter a custom goal"
            mode="outlined"
            className="bg-gray-800 flex-1"
            theme={{
              colors: { text: "white", placeholder: "gray", primary: "#D97706" }, // bg-secondary
            }}
          />
          <Button
            mode="contained"
            onPress={addCustomGoal}
            className="ml-2 bg-gray-700"
            labelStyle={{ color: "#D97706", fontSize: 12 }}
            disabled={!customGoal}
          >
            Add
          </Button>
        </View>

        {/* Error Message */}
        <HelperText
          type="error"
          visible={customGoal && goals.includes(customGoal)}
          style={{ color: "#D97706" }}
        >
          Goal already added.
        </HelperText>

        {/* Selected Goals */}
        <Text className="text-gray-400 font-bold mt-4">Your Goals:</Text>
        {goals.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mt-2">
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal}
                onPress={() => toggleGoal(goal)}
                className="px-4 py-2 rounded-full bg-secondary"
              >
                <Text className="text-black text-sm font-medium">{goal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 mt-2">No goals selected yet.</Text>
        )}

        {/* Save Goals */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary mt-4"
          labelStyle={{ color: "black" }}
        >
          Save Goals
        </Button>
      </View>
    </ScrollView>
  );
};

export default GoalsSection;
