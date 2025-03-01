import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import CustomButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';


export default function App() {
      const navigation = useNavigation();
    
  const [selectedGoal, setSelectedGoal] = useState(null);  // ✅ FIXED HERE

  const goals = [
    'Lose Weight',
    'Gain Weight',
    'Muscle Mass Gain',
    'Shape Body',
    'Others'
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#232323]">
      <StatusBar barStyle="light-content" />
      
      {/* Back Button */}
      <Pressable onPress={() => navigation.goBack()}
                      className="flex-row m-7"
                      >
                      <Ionicons name="chevron-back" size={24} color="#CEFF00" />
                  <Text className="text-xl font-bold" style={{ color: "#CEFF00" }}>
                      Back
                  </Text>
                  </Pressable>
      
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="px-6 pt-6 pb-10 bg-[#232323]">
          <Text className="text-[#CEFF00] text-4xl font-bold text-center mb-6">
            What Is Your Goal?
          </Text>
        </View>
        
        {/* Options Section */}
        <View className="bg-[#CEFF00] px-6 py-10 flex-1">
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-full flex-row justify-between items-center px-6 py-4 mb-6"
              onPress={() => setSelectedGoal(goal)}
            >
              <Text className="text-black text-lg font-medium">{goal}</Text>
              <View 
                className={`h-8 w-8 rounded-full border-2 border-black justify-center items-center ${
                  selectedGoal === goal ? 'bg-black' : 'bg-white'
                }`}
              >
                {selectedGoal === goal && (
                  <View className="h-5 w-5 rounded-full bg-white" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View className="absolute bottom-0 w-full mb-16 px-28">
          <Pressable onPress={() => navigation.navigate('(setup)/PhysicalActivity')}>
            <CustomButton 
              title="Next" 
              className="p-4 bg-white/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-20 mt-9"
            />
          </Pressable>
        </View>
    </SafeAreaView>
  );
}
