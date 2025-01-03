import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMealPlan } from "../../context/MealPlanContext";
import MealPlanFetcher from "../../components/MealPlanFetcher";

const dayMap = {
  sunday: "su",
  monday: "mo",
  tuesday: "tu",
  wednesday: "we",
  thursday: "th",
  friday: "fr",
  saturday: "sa",
};

export default function MealPlan() {
  const { userInput, mealPlan, setMealPlan } = useMealPlan(); // Access data from Context
  const daysOfWeek = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[new Date().getDay()]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  if (!userInput) {
    return (
      <View className="flex-1 justify-center items-center bg-[#161622]">
        <Text style={{ color: "white", fontSize: 16 }}>
          No data provided. Please go back and try again.
        </Text>
      </View>
    );
  }

  // const handleDataFetched = (data) => {
  //   if (!data || !Array.isArray(data.week)) {
  //     console.error("Invalid data structure:", data);
  //     return;
  //   }

  //   const parsedMealPlan = data.week.reduce((acc, dayPlan) => {
  //     const dayKey = dayMap[dayPlan?.day?.toLowerCase()];
  //     if (!dayKey || !Array.isArray(dayPlan.meals)) {
  //       console.error("Skipping invalid dayPlan:", dayPlan);
  //       return acc; // Skip malformed days
  //     }

  //     acc[dayKey] = dayPlan.meals || [];
  //     return acc;
  //   }, {});

  //   console.log("Parsed Meal Plan:", parsedMealPlan);
  //   setMealPlan(parsedMealPlan);
  // };

  const handleDataFetched = () => {
    const sampleMealPlanData = {
      data: {
        name: "Weekly_Athlete_Plan",
        week: [
          {
            day: "Monday",
            meals: [
              {
                time: "8:00 AM",
                type: "Breakfast",
                name: "Eggs_and_Toast",
                details: "Scrambled eggs with whole wheat toast.",
                description: "High in protein and fiber.",
                alternatives: [
                  {
                    name: "Oatmeal_with_Fruit",
                    details: "Steel-cut oats with fresh berries.",
                    description: "Rich in fiber and antioxidants."
                  }
                ]
              },
              {
                time: "12:00 PM",
                type: "Lunch",
                name: "Chicken_and_Quinoa",
                details: "Grilled chicken breast with quinoa and steamed broccoli.",
                description: "Packed with lean protein and complex carbs.",
                alternatives: [
                  {
                    name: "Grilled_Salmon_Salad",
                    details: "Mixed greens topped with grilled salmon and balsamic dressing.",
                    description: "Rich in omega-3 fatty acids and fiber."
                  }
                ]
              }
            ]
          },
          {
            day: "Tuesday",
            meals: [
              {
                time: "7:00 AM",
                type: "Breakfast",
                name: "Smoothie_Bowl",
                details: "Banana, spinach, almond milk, and chia seeds blended.",
                description: "Rich in vitamins and healthy fats.",
                alternatives: [
                  {
                    name: "Avocado_Toast",
                    details: "Whole-grain toast topped with mashed avocado.",
                    description: "Great source of fiber and healthy fats."
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  
    const parsedMealPlan = sampleMealPlanData.data.week.reduce((acc, dayPlan) => {
      const dayKey = dayMap[dayPlan.day.toLowerCase()];
      if (dayKey && Array.isArray(dayPlan.meals)) {
        acc[dayKey] = dayPlan.meals;
      }
      return acc;
    }, {});
  
    console.log("Parsed Meal Plan:", parsedMealPlan);
    setMealPlan(parsedMealPlan);
  };
  

  const renderMeal = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-start mb-4"
      onPress={() => setSelectedMeal(item)}
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

    // Update the meal plan with the selected alternative
    const updatedMeals = mealPlan[selectedDay].map((meal) =>
      meal.name === selectedMeal.name
        ? { ...meal, ...alternative }
        : meal
    );

    setMealPlan({ ...mealPlan, [selectedDay]: updatedMeals });
    setSelectedMeal(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#161622]">
      {/* Fetch the meal plan */}
      <MealPlanFetcher userInput={userInput} onDataFetched={handleDataFetched} />

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
          {selectedDay.toUpperCase()}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setSelectedDay(
              daysOfWeek[(daysOfWeek.indexOf(selectedDay) + 1) % daysOfWeek.length]
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
            {selectedMeal?.alternatives?.map((alt, index) => (
              <TouchableOpacity
                key={index}
                className="w-full bg-gray-700 py-2 px-3 my-2 rounded-md"
                onPress={() => handleAlternativeSelection(alt)}
              >
                <Text className="text-white font-medium">{alt.name}</Text>
                <Text className="text-gray-300 text-sm">{alt.details}</Text>
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
