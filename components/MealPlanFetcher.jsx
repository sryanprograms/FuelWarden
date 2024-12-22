import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';

const MealPlanFetcher = ({ userInput, onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace this with your actual API call to fetch the meal plan
        const response = await fetch('https://api.example.com/mealplan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInput),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch meal plan');
        }

        const data = await response.json();
        onDataFetched(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [userInput, onDataFetched]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return null;
};

export default MealPlanFetcher;