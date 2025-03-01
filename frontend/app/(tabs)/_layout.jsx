import React from 'react'
import { View, Text } from 'react-native'
import {Tabs, Redirect } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        },
        tabBarIconStyle: { alignSelf: 'center' } 
    }}
    >
        <Tabs.Screen 
  name='Home'
  options={{
    headerShown: false,
    tabBarIcon: ({ color }) => (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Octicons name="home" size={29} color={color} />
      </View>
    )
  }}
/>
        <Tabs.Screen 
  name='Analytics'
  options={{
    headerShown: false,
    tabBarIcon: ({ color }) => (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="stats-chart-outline" size={29} color={color} />
      </View>
    )
  }}
/>
        <Tabs.Screen 
  name='DietTracker'
  options={{
    headerShown: false,
    tabBarIcon: ({ color }) => (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="pie-chart-outline" size={29} color={color} />
      </View>
    )
  }}
/>

    </Tabs>
    </>
  )
}

export default TabsLayout