import React, { useState } from "react";
import { View, Text, Modal, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PersonalInformationSection from "../../components/PersonalInformationSection";
import TrainingScheduleSection from "../../components/TrainingScheduleSection";
import DietaryPreferencesSection from "../../components/DietaryPreferencesSection";
import GoalsSection from "../../components/GoalsSection";
import MealPreferencesSection from "../../components/MealPreferencesSection";
import Header from "../../components/Header";
import { images } from "../../constants";

const Profile = ({ initialData, onSave }) => {
  const [currentSection, setCurrentSection] = useState(null);
  const [formData, setFormData] = useState(initialData || {});

  const handleSave = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentSection(null);
  };

  const handleGenerateMealPlan = () => {
    if (typeof onSave === "function") {
      onSave(formData);
    } else {
      console.error("onSave is not a function");
    }
  };

  const sections = [
    { id: "personalInformation", label: "Personal Information", icon: "person" },
    { id: "trainingSchedule", label: "Training Schedule", icon: "fitness" },
    { id: "dietaryPreferences", label: "Dietary Preferences", icon: "nutrition" },
    { id: "goals", label: "Goals", icon: "flag" },
    { id: "mealPreferences", label: "Meal Preferences", icon: "restaurant" },
  ];

  return (
    <View className="flex-1 bg-[#161622]">
      {/* Header */}
      <SafeAreaView className="bg-[#161622]">
        <Header
          greetingText="Profile"
          userName="Settings"
          logoSource={images.logoSmall}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-4 py-6">
        <View className="space-y-6">
          {/* Profile Sections */}
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => setCurrentSection(section.id)}
              className="flex-row items-center bg-gray-800 p-4 rounded-lg"
            >
              <Ionicons name={section.icon} size={24} color="#FFA001" className="mr-4" />
              <Text className="text-white text-lg font-medium flex-1">
                {section.label}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Meal Plan */}
        <View className="mt-10">
          <TouchableOpacity
            onPress={handleGenerateMealPlan}
            className="bg-secondary py-4 rounded-lg"
          >
            <Text className="text-center text-black font-semibold text-lg">
              Create New Meal Plan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      {sections.map((section) => (
        <Modal
          key={section.id}
          visible={currentSection === section.id}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black bg-opacity-50 justify-center">
            <View className="bg-gray-800 p-6 h-full w-full rounded-t-lg">
              {/* Top-right Close Icon */}
              <Pressable
                onPress={() => setCurrentSection(null)}
                className="absolute top-4 right-4"
              >
                <Ionicons name="close" size={28} color="#FFA001" />
              </Pressable>

              {/* Section Components */}
              {section.id === "personalInformation" && (
                <PersonalInformationSection
                  initialData={formData}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "trainingSchedule" && (
                <TrainingScheduleSection
                  initialData={formData}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "dietaryPreferences" && (
                <DietaryPreferencesSection
                  initialData={formData}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "goals" && (
                <GoalsSection
                  initialData={formData}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "mealPreferences" && (
                <MealPreferencesSection
                  initialData={formData}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}

              {/* Bottom Close Button */}
              <TouchableOpacity
                onPress={() => setCurrentSection(null)}
                className="mt-4 bg-gray-700 py-3 rounded-lg"
              >
                <Text className="text-center text-secondary font-medium">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ))}
    </View>
  );
};

export default Profile;
