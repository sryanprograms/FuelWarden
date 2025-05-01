import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMealPlan } from "../../context/MealPlanContext";
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {UseEffect} from "react";
import { getInitialURL } from "expo-linking";


// Mapping days of the week to their respective abbreviations.

const dayMap = {
  sunday: "su",
  monday: "mo",
  tuesday: "tu",
  wednesday: "we",
  thursday: "th",
  friday: "fr",
  saturday: "sa",
};

// Filler meal plan data using food type descriptions and example alternatives.
const fillerMealPlan = {
  week: [
    {
      day: "Monday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "Protein-Rich Breakfast",
          details:
            "A meal focusing on high-quality proteins to support muscle synthesis.",
          description: "Ideal for pre-practice energy.",
          alternatives: [
            { name: "Egg White Omelette", details: "Egg whites with veggies." },
            { name: "Tofu Scramble", details: "Tofu with spinach & peppers." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Recovery Snack",
          details:
            "A quick, protein-dense snack to aid recovery after training.",
          description: "Supports muscle recovery post-training.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with pea protein." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Nut Butter Energy Balls", details: "Homemade energy bites." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Balanced Meal",
          details:
            "A balanced mix of lean protein, complex carbs, and healthy fats.",
          description: "Refuels and sustains energy.",
          alternatives: [
            { name: "Grilled Chicken Salad", details: "Chicken with quinoa & greens." },
            { name: "Turkey Wrap", details: "Whole wheat wrap with turkey & veggies." },
            { name: "Quinoa Bowl", details: "Quinoa with black beans & avocado." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Energy Booster Snack",
          details:
            "A light snack providing essential nutrients for steady energy.",
          description: "Keeps energy levels stable.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots and celery with hummus." },
            { name: "Apple with Almond Butter", details: "Apple slices with almond butter." },
            { name: "Mixed Berries", details: "Assorted berries rich in antioxidants." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Nutrient-Rich Dinner",
          details:
            "A meal designed to replenish nutrients with lean protein and vegetables.",
          description: "Supports muscle repair and recovery.",
          alternatives: [
            { name: "Baked Fish", details: "Salmon or cod with steamed veggies." },
            { name: "Grilled Lean Protein", details: "Chicken or turkey with greens." },
            { name: "Tofu Stir-Fry", details: "Stir-fried tofu with broccoli & peppers." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Light Evening Snack",
          details:
            "A small, nutrient-dense snack to provide a final protein boost.",
          description: "Prepares your body for overnight recovery.",
          alternatives: [
            { name: "Mixed Nuts", details: "A small portion of almonds, walnuts, and cashews." },
            { name: "Mini Protein Shake", details: "A small dairy-free protein shake." },
            { name: "Fruit & Nut Bar", details: "Nut-based energy bar." },
          ],
        },
      ],
    },
    {
      day: "Tuesday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "Protein-Focused Breakfast",
          details:
            "A high-protein meal to jumpstart your day with lean protein.",
          description: "Provides a pre-conditioning energy boost.",
          alternatives: [
            { name: "Egg White Omelette", details: "Egg whites with veggies." },
            { name: "Turkey Slices", details: "Lean turkey slices with greens." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Post-Conditioning Snack",
          details:
            "A snack rich in protein and light carbohydrates for recovery.",
          description: "Assists in recovery after conditioning.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with pea protein." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Homemade nut butter balls." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Balanced Lunch",
          details:
            "A meal combining lean protein, complex carbs, and vegetables.",
          description: "Provides sustained energy for the afternoon.",
          alternatives: [
            { name: "Turkey Wrap", details: "Whole wheat wrap with turkey & veggies." },
            { name: "Grilled Chicken Salad", details: "Salad with lean chicken & quinoa." },
            { name: "Quinoa Bowl", details: "Quinoa with black beans & avocado." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Nutrient Booster Snack",
          details:
            "A light snack that delivers essential nutrients.",
          description: "Maintains energy until dinner.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots and celery with hummus." },
            { name: "Apple with Almond Butter", details: "Apple slices with almond butter." },
            { name: "Mixed Nuts", details: "A handful of almonds and walnuts." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Protein-Powered Dinner",
          details:
            "A dinner emphasizing lean proteins and vegetables.",
          description: "Promotes muscle repair and recovery.",
          alternatives: [
            { name: "Grilled Fish", details: "Salmon or cod with steamed veggies." },
            { name: "Lean Beef Plate", details: "Lean beef with a side of greens." },
            { name: "Tofu Stir-Fry", details: "Tofu with mixed vegetables." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Recovery Snack",
          details:
            "A light, protein-rich snack to support overnight recovery.",
          description: "Helps support muscle recovery during sleep.",
          alternatives: [
            { name: "Mini Protein Shake", details: "Small dairy-free protein shake." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Homemade nut butter energy balls." },
          ],
        },
      ],
    },
    {
      day: "Wednesday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "High-Protein Breakfast",
          details:
            "Maximizes protein intake to energize you for training.",
          description: "A solid start before practice.",
          alternatives: [
            { name: "Egg White Frittata", details: "Egg whites with veggies." },
            { name: "Protein Pancakes", details: "Dairy-free protein pancakes." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Muscle Recovery Snack",
          details:
            "A protein-dense snack for rapid recovery.",
          description: "Boosts recovery after lifting.",
          alternatives: [
            { name: "Protein Bar", details: "Dairy-free, nut-based protein bar." },
            { name: "Protein Shake", details: "Shake with plant protein." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Balanced Nutrient Meal",
          details:
            "Combines proteins, complex carbs, and healthy fats.",
          description: "Refuels your body for performance.",
          alternatives: [
            { name: "Grilled Chicken Salad", details: "Chicken with mixed greens." },
            { name: "Quinoa Salad", details: "Quinoa with lean protein and veggies." },
            { name: "Turkey Wrap", details: "Whole wheat wrap with turkey." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Light Energy Snack",
          details:
            "Provides quick energy with light carbs and protein.",
          description: "Keeps your energy steady.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots & celery with hummus." },
            { name: "Apple with Nut Butter", details: "Apple slices with almond butter." },
            { name: "Mixed Berries", details: "A small bowl of mixed berries." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Recovery-Focused Dinner",
          details:
            "Emphasizes nutrient density and lean protein.",
          description: "Assists in muscle repair.",
          alternatives: [
            { name: "Grilled Shrimp", details: "Shrimp with steamed veggies." },
            { name: "Baked Tofu", details: "Baked tofu with roasted sweet potato." },
            { name: "Baked Fish", details: "Cod or salmon with greens." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Evening Protein Snack",
          details:
            "A light snack to support overnight recovery.",
          description: "Supports muscle repair during sleep.",
          alternatives: [
            { name: "Mini Protein Shake", details: "Small dairy-free shake." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
      ],
    },
    {
      day: "Thursday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "Protein-Rich Breakfast",
          details:
            "Starts your day with a high-protein focus.",
          description: "Ideal pre-conditioning meal.",
          alternatives: [
            { name: "Egg White Omelette", details: "Egg whites with veggies." },
            { name: "Tofu Scramble", details: "Tofu with spinach & peppers." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Post-Training Snack",
          details:
            "Balances protein and carbs to aid recovery.",
          description: "Replenishes energy after training.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with pea protein." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Balanced Meal",
          details:
            "A mix of lean protein, complex carbs, and healthy fats.",
          description: "Sustains energy through the afternoon.",
          alternatives: [
            { name: "Turkey Wrap", details: "Whole wheat wrap with turkey." },
            { name: "Grilled Chicken Salad", details: "Salad with lean chicken & quinoa." },
            { name: "Quinoa Bowl", details: "Quinoa with black beans & avocado." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Energizing Snack",
          details:
            "Provides a quick energy boost.",
          description: "Keeps energy levels steady.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots & celery with hummus." },
            { name: "Apple with Nut Butter", details: "Apple slices with almond butter." },
            { name: "Mixed Nuts", details: "A small handful of almonds and walnuts." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Nutrient-Dense Dinner",
          details:
            "Focuses on lean proteins and replenishing nutrients.",
          description: "Supports muscle repair.",
          alternatives: [
            { name: "Grilled Fish", details: "Salmon or cod with steamed veggies." },
            { name: "Lean Beef Plate", details: "Lean beef with a side of greens." },
            { name: "Tofu Stir-Fry", details: "Tofu with mixed vegetables." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Light Recovery Snack",
          details:
            "A small snack to finish your day.",
          description: "Aids overnight recovery.",
          alternatives: [
            { name: "Mini Protein Shake", details: "Small dairy-free shake." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
      ],
    },
    {
      day: "Friday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "Protein-Powered Breakfast",
          details:
            "Emphasizes high-quality protein to fuel your workout.",
          description: "Energizes you for lifting.",
          alternatives: [
            { name: "Protein Oatmeal", details: "Oats with protein powder." },
            { name: "Egg White Frittata", details: "Egg whites with veggies." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Post-Workout Snack",
          details:
            "Supports recovery with a protein boost.",
          description: "Helps refuel after lifting.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with pea protein." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Well-Balanced Lunch",
          details:
            "Combines lean proteins, complex carbs, and veggies.",
          description: "Provides sustained energy.",
          alternatives: [
            { name: "Grilled Chicken Wrap", details: "Chicken wrap with veggies." },
            { name: "Quinoa Salad", details: "Quinoa with lean protein and greens." },
            { name: "Turkey Wrap", details: "Whole wheat wrap with turkey." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Nutrient Booster Snack",
          details:
            "Delivers essential nutrients in a light snack.",
          description: "Keeps energy levels stable.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots & celery with hummus." },
            { name: "Raw Veggies & Nut Butter", details: "Sliced veggies with almond butter." },
            { name: "Mixed Nuts", details: "A small handful of mixed nuts." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Recovery Meal Dinner",
          details:
            "Focused on lean protein and nutrient-rich sides.",
          description: "Aids in muscle repair.",
          alternatives: [
            { name: "Baked Cod", details: "Cod with roasted vegetables." },
            { name: "Grilled Fish", details: "Salmon with steamed greens." },
            { name: "Lean Protein Plate", details: "Chicken or turkey with veggies." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Evening Protein Snack",
          details:
            "A light snack that finishes your day with protein.",
          description: "Supports overnight recovery.",
          alternatives: [
            { name: "Mini Protein Shake", details: "Small dairy-free shake." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
      ],
    },
    {
      day: "Saturday",
      meals: [
        {
          time: "6:30 AM",
          type: "Breakfast",
          name: "High-Protein Breakfast",
          details:
            "Designed for maximum protein intake before conditioning.",
          description: "A protein-rich start to your day.",
          alternatives: [
            { name: "Tofu Scramble", details: "Tofu with mixed veggies." },
            { name: "Egg White Omelette", details: "Egg whites with spinach & tomatoes." },
            { name: "Protein Shake", details: "Plant-based shake with almond milk." },
          ],
        },
        {
          time: "11:45 AM",
          type: "Snack",
          name: "Quick Recovery Snack",
          details:
            "Provides a quick protein and carb boost post-conditioning.",
          description: "Helps recover after training.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with pea protein." },
            { name: "Protein Bar", details: "Nut-based protein bar." },
            { name: "Energy Bites", details: "Nut butter energy balls." },
          ],
        },
        {
          time: "1:30 PM",
          type: "Lunch",
          name: "Balanced Energy Meal",
          details:
            "A mix of lean proteins, complex carbs, and veggies.",
          description: "Refuels and sustains energy.",
          alternatives: [
            { name: "Quinoa Salad", details: "Quinoa with lean protein and veggies." },
            { name: "Lean Meat Wrap", details: "Wrap with turkey or chicken and greens." },
            { name: "Veggie Bowl", details: "Mixed veggies with a protein source." },
          ],
        },
        {
          time: "4:00 PM",
          type: "Snack",
          name: "Energy Booster Snack",
          details:
            "Maintains steady energy with light carbs and protein.",
          description: "Keeps you energized until dinner.",
          alternatives: [
            { name: "Mixed Nuts", details: "A small handful of almonds & walnuts." },
            { name: "Veggie Sticks with Hummus", details: "Carrots & celery with hummus." },
            { name: "Fruit with Nut Butter", details: "Apple slices with almond butter." },
          ],
        },
        {
          time: "7:00 PM",
          type: "Dinner",
          name: "Nutrient-Rich Dinner",
          details:
            "Focuses on lean proteins and nutrient-dense sides.",
          description: "Supports muscle repair and overall recovery.",
          alternatives: [
            { name: "Grilled Salmon", details: "Salmon with steamed vegetables." },
            { name: "Baked Tofu", details: "Tofu with roasted sweet potato." },
            { name: "Lean Protein Plate", details: "Chicken or turkey with greens." },
          ],
        },
        {
          time: "9:00 PM",
          type: "Snack",
          name: "Light Evening Snack",
          details:
            "A final protein boost to support overnight recovery.",
          description: "Provides extra protein before bed.",
          alternatives: [
            { name: "Protein Smoothie", details: "Dairy-free smoothie with plant protein." },
            { name: "Mini Protein Shake", details: "Small shake with almond milk." },
            { name: "Nut & Fruit Bar", details: "A nut-based energy bar." },
          ],
        },
      ],
    },
    {
      day: "Sunday",
      meals: [
        {
          time: "8:00 AM",
          type: "Breakfast",
          name: "Balanced Breakfast",
          details:
            "Combines proteins and complex carbohydrates for a balanced start.",
          description: "Ideal for a rest day.",
          alternatives: [
            { name: "Protein Smoothie Bowl", details: "Smoothie bowl with protein powder & fruits." },
            { name: "Oatmeal with Protein", details: "Oats mixed with plant-based protein powder." },
            { name: "Egg White Scramble", details: "Egg whites with veggies (dairy-free)." },
          ],
        },
        {
          time: "10:30 AM",
          type: "Snack",
          name: "Light Snack",
          details:
            "A snack focusing on protein without heaviness.",
          description: "Provides energy without being heavy.",
          alternatives: [
            { name: "Hard-Boiled Eggs", details: "Egg whites or whole eggs (if tolerated)." },
            { name: "Dairy-Free Yogurt Alternative", details: "Coconut milk yogurt with berries." },
            { name: "Protein Shake", details: "Small dairy-free shake." },
          ],
        },
        {
          time: "12:30 PM",
          type: "Lunch",
          name: "Balanced Lunch",
          details:
            "A well-rounded meal with lean proteins, healthy fats, and complex carbs.",
          description: "Maintains energy on a rest day.",
          alternatives: [
            { name: "Turkey Avocado Salad", details: "Salad with lean turkey & avocado." },
            { name: "Mixed Greens Bowl", details: "Greens with lean protein and quinoa." },
            { name: "Lean Protein Wrap", details: "Whole wheat wrap with turkey or chicken." },
          ],
        },
        {
          time: "3:30 PM",
          type: "Snack",
          name: "Nutrient Booster Snack",
          details:
            "Delivers essential nutrients in a light snack.",
          description: "Keeps energy levels steady.",
          alternatives: [
            { name: "Veggie Sticks with Hummus", details: "Carrots & celery with hummus." },
            { name: "Mixed Nuts", details: "A small portion of almonds and walnuts." },
            { name: "Fruit Salad", details: "A small bowl of mixed fruits." },
          ],
        },
        {
          time: "6:30 PM",
          type: "Dinner",
          name: "Recovery Dinner",
          details:
            "Focuses on lean protein and nutrient replenishment.",
          description: "Supports muscle maintenance.",
          alternatives: [
            { name: "Grilled Chicken", details: "Chicken with steamed vegetables." },
            { name: "Quinoa with Lean Protein", details: "Quinoa bowl with lean protein." },
            { name: "Mixed Greens Plate", details: "Salad with lean protein and avocado." },
          ],
        },
        {
          time: "8:30 PM",
          type: "Snack",
          name: "Evening Recovery Snack",
          details:
            "A light, protein-focused snack for overnight recovery.",
          description: "Provides overnight recovery support.",
          alternatives: [
            { name: "Dairy-Free Protein Shake", details: "Shake with plant-based protein." },
            { name: "Nut-Based Energy Bar", details: "A small energy bar with nuts." },
            { name: "Mixed Nuts", details: "A small handful of mixed nuts." },
          ],
        },
      ],
    },
  ],
};

export default function MealPlan() {
  const { userInput, mealPlan, setMealPlan } = useMealPlan();
  const daysOfWeek = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const [selectedDay, setSelectedDay] = useState(
    daysOfWeek[new Date().getDay()]
  );
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealItem, setSelectedMealItem] = useState(null);

  // If you don't have userInput for testing, comment out this block:
  if (!userInput) {
    return (
      <View style={styles.noDataContainer}>
        <Ionicons name="alert-circle" size={80} color="#FFA001" style={styles.warningIcon} />
        <Text style={styles.noDataText}>Complete your profile to generate a meal plan.</Text>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("profile")}> 
          <Text style={styles.profileButtonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fetchMealPlan = async () => {
    // Load the filler meal plan data immediately.
    setLoading(true);
    try {
      const parsedMealPlan = fillerMealPlan.week.reduce((acc, dayPlan) => {
        const dayKey = dayMap[dayPlan.day.toLowerCase()];
        if (dayKey && Array.isArray(dayPlan.meals)) {
          acc[dayKey] = dayPlan.meals;
        }
        return acc;
      }, {});
      console.log("Parsed Meal Plan:", parsedMealPlan);
      setMealPlan(parsedMealPlan);
    } catch (error) {
      console.error("Error loading filler meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const onMealPress = (meal) => {
    setSelectedMealItem(meal);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Day Navigation */}
      <View style={styles.header}>
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
        <Text style={styles.headerText}>{selectedDay.toUpperCase()}</Text>
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

      {/* Generate Meal Plan Button */}
      <TouchableOpacity style={styles.generateButton} onPress={fetchMealPlan}>
        <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
      </TouchableOpacity>

      {/* Display Meal Plan for the Selected Day */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA001" />
        </View>
      ) : (
        mealPlan &&
        mealPlan[selectedDay] && (
          <FlatList
            data={mealPlan[selectedDay]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onMealPress(item)}>
                <View style={styles.mealCard}>
                  <View style={styles.mealHeader}>
                    <Text style={styles.mealTime}>{item.time}</Text>
                    <Text style={styles.mealType}>{item.type}</Text>
                  </View>
                  <Text style={styles.mealName}>{item.name}</Text>
                  <Text style={styles.mealDetails}>{item.details}</Text>
                  <Text style={styles.mealDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.mealList}
          />
        )
      )}

      {/* Modal for Meal Alternatives */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Meal Options</Text>
            {selectedMealItem &&
            selectedMealItem.alternatives &&
            selectedMealItem.alternatives.length > 0 ? (
              selectedMealItem.alternatives.map((alt, index) => (
                <View key={index} style={styles.alternativeItem}>
                  <Text style={styles.altName}>{alt.name}</Text>
                  <Text style={styles.altDetails}>{alt.details}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.altDetails}>No alternatives available.</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
    padding: 20,
  },
  noDataText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  warningIcon: {
    marginTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  profileButton: {
    backgroundColor: "#FFA001",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  profileButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c2c2c",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  generateButton: {
    backgroundColor: "#FFA001",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  generateButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mealList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  mealCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFA001",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  alternativeItem: {
    marginVertical: 5,
    alignItems: "center",
  },
  altName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  altDetails: {
    color: "#ccc",
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: "#FFA001",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  mealCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#2c2c2c",
  },
  
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  
  mealTime: {
    color: "#FFA001",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  mealType: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "italic",
  },
  
  mealName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  
  mealDetails: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  
  mealDescription: {
    color: "#aaa",
    fontSize: 12,
    fontStyle: "italic",
  },
  
});


