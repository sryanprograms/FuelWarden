import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PersonalInformationSection from "../../components/PersonalInformationSection";
import TrainingScheduleSection from "../../components/TrainingScheduleSection";
import DietaryPreferencesSection from "../../components/DietaryPreferencesSection";
import GoalsSection from "../../components/GoalsSection";
import MealPreferencesSection from "../../components/MealPreferencesSection";
import Header from "../../components/Header";
import { images } from "../../constants";
import { useNavigation } from "expo-router"; // Updated for Expo Router
import { useMealPlan } from "../../context/MealPlanContext"; // Context API Hook

const Profile = () => {
  const [currentSection, setCurrentSection] = useState(null); // Track open modal
  const { userInput, setUserInput } = useMealPlan(); // Access Context state
  const navigation = useNavigation(); // Navigation for screen transitions

  // Save data from each section to Context
  const handleSave = (data) => {
    setUserInput((prev) => ({ ...prev, ...data })); // Merge with existing data
    setCurrentSection(null); // Close modal
  };

  // Navigate to Meal Plan screen
  const handleGenerateMealPlan = () => {
    navigation.navigate("mealPlan"); // Navigate without params
  };

  // Define sections for the profile screen
  const sections = useMemo(
    () => [
      { id: "personalInformation", label: "Personal Information", icon: "person" },
      { id: "trainingSchedule", label: "Training Schedule", icon: "fitness" },
      { id: "dietaryPreferences", label: "Dietary Preferences", icon: "nutrition" },
      { id: "goals", label: "Goals", icon: "flag" },
      { id: "mealPreferences", label: "Meal Preferences", icon: "restaurant" },
    ],
    []
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <Header
          greetingText="Profile"
          userName="Settings"
          logoSource={images.logoSmall}
        />
      </SafeAreaView>

      {/* Profile Sections */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sectionsContainer}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => setCurrentSection(section.id)}
              style={styles.sectionButton}
            >
              <Ionicons
                name={section.icon}
                size={24}
                color="#FFA001"
                style={styles.icon}
              />
              <Text style={styles.sectionText}>{section.label}</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Meal Plan Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleGenerateMealPlan}
            style={styles.generateButton}
          >
            <Text style={styles.buttonText}>Create New Meal Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals for Profile Sections */}
      {sections.map((section) => (
        <Modal
          key={section.id}
          visible={currentSection === section.id}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Render the appropriate section component */}
              {section.id === "personalInformation" && (
                <PersonalInformationSection
                  initialData={userInput}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "trainingSchedule" && (
                <TrainingScheduleSection
                  initialData={userInput}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "dietaryPreferences" && (
                <DietaryPreferencesSection
                  initialData={userInput}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "goals" && (
                <GoalsSection
                  initialData={userInput}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}
              {section.id === "mealPreferences" && (
                <MealPreferencesSection
                  initialData={userInput}
                  onSave={handleSave}
                  onClose={() => setCurrentSection(null)}
                />
              )}

              {/* Close Modal Button */}
              <TouchableOpacity
                onPress={() => setCurrentSection(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionsContainer: {
    marginBottom: 20,
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  icon: {
    marginRight: 12,
  },
  sectionText: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
  },
  generateButton: {
    backgroundColor: "#FFA001",
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.9,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#444",
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#FFA001",
    fontWeight: "600",
  },
});

export default Profile;
