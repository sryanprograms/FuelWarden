import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MealPlanFetcher from '../../components/MealPlanFetcher';
import CustomButton from '../../components/CustomButton';

export default function MealPlan() {
  const daysOfWeek = ["su", "mo", "tu", "we", "th", "fr", "sa"];

  const getCurrentDateInfo = () => {
    const today = new Date();
    const day = daysOfWeek[today.getDay()];
    const date = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    return { day, date, month };
  };

  const [currentDateInfo, setCurrentDateInfo] = useState(getCurrentDateInfo());
  const [selectedDay, setSelectedDay] = useState(currentDateInfo.day);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [userInput, setUserInput] = useState(null);

  useEffect(() => {
    if (userInput) {
      fetchMealPlan(userInput);
    }
  }, [userInput]);

  const fetchMealPlan = (input) => {
    // Fetch meal plan based on user input
    MealPlanFetcher({ userInput: input, onDataFetched: handleDataFetched });
  };

  const handleDataFetched = (data) => {
    setMealPlan(data.week.reduce((acc, dayPlan) => {
      acc[dayPlan.day.toLowerCase().slice(0, 2)] = dayPlan.meals;
      return acc;
    }, {}));
  };

  const handleProfileSave = (input) => {
    setUserInput(input);
  };

  const renderMeal = ({ item, index }) => (
    <TouchableOpacity
      className="flex-row items-start mb-4"
      onPress={() => setSelectedMeal({ ...item, index })}
    >
      <View className="items-center mr-3">
        <View className="w-4 h-4 bg-orange-500 rounded-full" />
        <View className="w-1 h-10 bg-orange-500 mt-1" />
      </View>
      <View>
        <Text className="text-gray-400 text-sm">{item.time}</Text>
        <Text className="text-white text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-300 text-sm">{item.details}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAlternativeSelection = (alternative) => {
    if (!selectedMeal) return;

    const updatedMeals = mealPlan[selectedDay].map((meal, index) => {
      if (index === selectedMeal.index) {
        const newAlternatives = [
          ...meal.alternatives.filter((alt) => alt.name !== alternative.name),
          { name: meal.name, description: meal.description },
        ];

        return {
          ...meal,
          name: alternative.name,
          details: alternative.details,
          description: alternative.description,
          alternatives: newAlternatives,
        };
      }
      return meal;
    });

    setMealPlan({ ...mealPlan, [selectedDay]: updatedMeals });
    setSelectedMeal(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#161622]">
      {userInput && (
        <MealPlanFetcher userInput={userInput} onDataFetched={handleDataFetched} />
      )}
      {/* Calendar Header */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-gray-800">
        <TouchableOpacity
          onPress={() =>
            setSelectedDay(
              daysOfWeek[
                (daysOfWeek.indexOf(selectedDay) - 1 + daysOfWeek.length) %
                  daysOfWeek.length
              ]
            )
          }
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">
          {selectedDay.toUpperCase()}, {currentDateInfo.month}{" "}
          {currentDateInfo.date}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setSelectedDay(
              daysOfWeek[
                (daysOfWeek.indexOf(selectedDay) + 1) % daysOfWeek.length
              ]
            )
          }
        >
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Day Buttons */}
      <View className="flex-row justify-evenly my-3 bg-gray-800 py-2">
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              selectedDay === day ? "bg-secondary" : "bg-gray-700"
            }`}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedDay === day ? "text-gray-900" : "text-white"
              }`}
            >
              {day.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timeline */}
      {mealPlan && (
        <FlatList
          data={mealPlan[selectedDay]}
          keyExtractor={(item) => item.time}
          renderItem={renderMeal}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}

      {/* Modal for Meal Details */}
      <Modal visible={!!selectedMeal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="w-4/5 bg-gray-800 p-5 rounded-xl items-center">
            <Text className="text-orange-500 text-lg font-bold mb-2">
              {selectedMeal?.name}
            </Text>
            <Text className="text-gray-300 text-sm mb-4">
              {selectedMeal?.details}
            </Text>
            <Text className="text-white text-sm mb-2 font-semibold">
              {selectedMeal?.description}
            </Text>
            <Text className="text-white text-sm mb-1 font-semibold">
              Alternatives:
            </Text>
            {selectedMeal?.alternatives.map((alternative, index) => (
              <TouchableOpacity
                key={index}
                className="w-full bg-gray-700 py-2 px-3 my-2 rounded-md"
                onPress={() => handleAlternativeSelection(alternative)}
              >
                <Text className="text-white font-medium">
                  {alternative.name}
                </Text>
                <Text className="text-gray-300 text-sm">
                  {alternative.description}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setSelectedMeal(null)}
              className="bg-orange-500 py-2 px-4 mt-4 rounded-md"
            >
              <Text className="text-gray-900 font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
 