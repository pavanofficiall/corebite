import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ceff00',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: {
            backgroundColor: "#232323",
            borderTopWidth: 1,
            borderColor: '#ceff00',
            height: 60
          }
        }}
      >
        <Tabs.Screen 
          name='Home'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={29} color={color} />
            )
          }}
        />
        <Tabs.Screen 
          name='Analytics'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart-outline" size={29} color={color} />
            )
          }}
        />
        <Tabs.Screen 
          name='DietTracker'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="pie-chart-outline" size={29} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  );
};

// Custom Navbar Component
const CustomNavbar = ({ navigation }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-1  bg-[#232323] ">

      {/* Center Title */}
      <Text className="text-[#ceff00] text-xl font-bold ">CoreBite</Text>

      {/* Right Icon (Profile) */}
      <TouchableOpacity >
        <Ionicons name="person-circle-outline" size={38} color="#ceff00" />
      </TouchableOpacity>
    </View>
  );
};

// Stack Navigator with Custom Navbar
const Layout = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => <CustomNavbar navigation={navigation} />, // Use custom navbar
      }}
    >
      <Stack.Screen name="MainTabs" component={TabsLayout} />
    </Stack.Navigator>
  );
};

export default Layout;
