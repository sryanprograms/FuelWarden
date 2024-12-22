import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import PersonalInformationSection from './PersonalInformationSection';
import TrainingScheduleSection from './TrainingScheduleSection';
import DietaryPreferencesSection from './DietaryPreferencesSection';
import GoalsSection from './GoalsSection';
import MealPreferencesSection from './MealPreferencesSection';

const MealPlanForm = ({ onSubmit, initialData }) => {
  const [currentSection, setCurrentSection] = useState(null);
  const [formData, setFormData] = useState(initialData || {});

  const handleSave = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentSection(null);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile for New Meal Plans</Text>
      
      <Button title="Edit Personal Information" onPress={() => setCurrentSection('personalInformation')} />
      <Button title="Edit Training Schedule" onPress={() => setCurrentSection('trainingSchedule')} />
      <Button title="Edit Dietary Preferences" onPress={() => setCurrentSection('dietaryPreferences')} />
      <Button title="Edit Goals" onPress={() => setCurrentSection('goals')} />
      <Button title="Edit Meal Preferences" onPress={() => setCurrentSection('mealPreferences')} />
      
      <Button title="Submit" onPress={handleSubmit} />

      <Modal visible={currentSection === 'personalInformation'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <PersonalInformationSection initialData={formData} onSave={handleSave} />
            <Button title="Close" onPress={() => setCurrentSection(null)} />
          </View>
        </View>
      </Modal>

      <Modal visible={currentSection === 'trainingSchedule'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TrainingScheduleSection initialData={formData} onSave={handleSave} />
            <Button title="Close" onPress={() => setCurrentSection(null)} />
          </View>
        </View>
      </Modal>

      <Modal visible={currentSection === 'dietaryPreferences'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DietaryPreferencesSection initialData={formData} onSave={handleSave} />
            <Button title="Close" onPress={() => setCurrentSection(null)} />
          </View>
        </View>
      </Modal>

      <Modal visible={currentSection === 'goals'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <GoalsSection initialData={formData} onSave={handleSave} />
            <Button title="Close" onPress={() => setCurrentSection(null)} />
          </View>
        </View>
      </Modal>

      <Modal visible={currentSection === 'mealPreferences'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MealPreferencesSection initialData={formData} onSave={handleSave} />
            <Button title="Close" onPress={() => setCurrentSection(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default MealPlanForm;