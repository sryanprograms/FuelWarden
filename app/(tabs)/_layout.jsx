import React from "react";
import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { icons } from "../../constants";
import { MealPlanProvider } from "../../context/MealPlanContext";

// Tab Icon Component
const TabIcon = ({ icon, color }) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
  </View>
);

export default function Layout() {
  return (
    <MealPlanProvider>
      <PaperProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
              backgroundColor: "#161622",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 84,
            },
          }}
        >
          <Tabs.Screen
            name="mealPlan"
            options={{
              title: "Meal Plan",
              headerShown: false,
              tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />,
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              title: "Scan",
              headerShown: false,
              tabBarIcon: ({ color }) => <TabIcon icon={icons.scan} color={color} />,
            }}
          />
          <Tabs.Screen
            name="shop"
            options={{
              title: "Shop",
              headerShown: false,
              tabBarIcon: ({ color }) => <TabIcon icon={icons.home} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />,
            }}
          />
        </Tabs>
      </PaperProvider>
    </MealPlanProvider>
  );
}
