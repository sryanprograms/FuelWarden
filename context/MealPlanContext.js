import React, { createContext, useState, useContext } from "react";

// Create Context
const MealPlanContext = createContext();

export const useMealPlan = () => useContext(MealPlanContext);

// Provider Component
export const MealPlanProvider = ({ children }) => {
  const [userInput, setUserInput] = useState(null); 
  const [mealPlan, setMealPlan] = useState(null);  

  return (
    <MealPlanContext.Provider value={{ userInput, setUserInput, mealPlan, setMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
