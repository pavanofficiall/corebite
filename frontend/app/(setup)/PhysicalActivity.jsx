import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import CustomButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function ActivityLevelScreen() {
    const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    { label: 'Beginner', color: 'text-purple-500 bg-white' },
    { label: 'Intermediate', color: 'text-purple-500 bg-white' },
    { label: 'Advance', color: 'text-black bg-[#ecf460]' } // Light Yellow
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#232323] ">
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

      {/* Heading */}
      <View className="mt-6">
        <Text className="text-[#CEFF00] text-3xl font-bold text-center">Physical Activity Level</Text>
      </View>

      {/* Options */}
      <View className="mt-60 gap-11 space-y-4 px-7">
        {levels.map((level, index) => (
          <TouchableOpacity
            key={index}
            className={`rounded-full py-4 text-center flex items-center ${level.color}`}
            onPress={() => setSelectedLevel(level.label)}
            style={{
              backgroundColor: selectedLevel === level.label ? "#CEFF00" : "white",
            }}
          >
            <Text className="text-lg font-semibold">
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

       {/* Continue Button */}
       <View className="absolute bottom-0 w-full mb-16 px-28">
          <Pressable onPress={() => navigation.navigate('(auth)/Sign-in')}>
            <CustomButton 
              title="Next" 
              className="p-4 bg-white/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-20 mt-9"
            />
          </Pressable>
        </View>
    </SafeAreaView>
  );
}
