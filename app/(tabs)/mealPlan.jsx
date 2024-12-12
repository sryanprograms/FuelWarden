import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants"; // Ensure correct path

export default function MealPlan() {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

  const generateMealPlan = async () => {
    setLoading(true);
    try {
      const generatedPlan = {
        Monday: { breakfast: 'Eggs', lunch: 'Chicken Salad', dinner: 'Steak' },
        Tuesday: { breakfast: 'Pancakes', lunch: 'Sandwich', dinner: 'Fish' },
      };
      setMealPlan(generatedPlan);
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMealCard = ({ item }) => {
    const [day, meals] = item;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{day}</Text>
        <Text style={styles.cardText}>Breakfast: {meals.breakfast}</Text>
        <Text style={styles.cardText}>Lunch: {meals.lunch}</Text>
        <Text style={styles.cardText}>Dinner: {meals.dinner}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Artificial Intelligence</Text>
          <Text style={styles.userName}>Meal Planner</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={images.logoSmall}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generateMealPlan} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Generate Meal Plan</Text>}
      </TouchableOpacity>

      {mealPlan ? (
        <FlatList
          data={Object.entries(mealPlan)}
          keyExtractor={(item) => item[0]}
          renderItem={renderMealCard}
          contentContainerStyle={styles.mealList}
        />
      ) : (
        <Text style={styles.noDataText}>No meal plan generated yet.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  button: {
    backgroundColor: '#FFA001',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  mealList: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#1F1F2E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA001',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  noDataText: {
    color: '#AAA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
