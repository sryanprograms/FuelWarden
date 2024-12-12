import React, { createContext, useContext, useState } from 'react';

// Create a Context
const UserDataContext = createContext();

// Create a Provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    heightFeet: '',
    heightInches: '',
    weight: '',
    gender: '',
    bodyFat: '',
    sport: '',
    skillLevel: '',
    performanceGoals: '',
    sleep: '',
    allergies: '',
    diet: '',
    schedule: '',
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Hook for using the context
export const useUserData = () => useContext(UserDataContext);
