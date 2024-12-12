import React from 'react';
import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import { icons } from '../../constants';

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
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.home} color={color} />,
        }}
      />

      {/* Scan Tab */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.scan} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mealPlan"
        options={{
          title: 'Meal Plan',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />,
        }}
      />

      {/* Welcome Tab (Profile Entry Point) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />,
        }}
      />
    </Tabs>
  );
}