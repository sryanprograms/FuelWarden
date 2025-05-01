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
            headerShown: false, // disable header globally for all tabs
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
              tabBarIcon: ({ color }) => <TabIcon icon={icons.bookmark} color={color} />,
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              title: "Scan",
              tabBarIcon: ({ color }) => <TabIcon icon={icons.scan} color={color} />,
            }}
          />
          <Tabs.Screen
            name="dashboard"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <TabIcon icon={icons.home} color={color} />,
            }}
          />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />


          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />,
            }}
          />
        </Tabs>
      </PaperProvider>
    </MealPlanProvider>
  );
}
