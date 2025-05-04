import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const workoutInfo = {
  title: "Full Body Workout",
  description: "Complete workout to build strength and endurance",
  duration: "25 min",
  difficulty: "Intermediate",
  calories: 250,
};

const exerciseList = [
  { name: "Push Ups" },
  { name: "Squats" },
  { name: "Burpees" },
  { name: "Plank" },
  { name: "Jumping Jacks" },
];

const Exercise = () => {
  const colorScheme = useColorScheme();
  return (
    <View className={`flex-1 ${colorScheme === 'dark' ? 'dark bg-[#232323]' : 'bg-white'}`}>
      {/* Header */}
      <View className="px-6 py-6 pb-4 bg-[#10B981]">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-[#fff] font-medium text-xl flex-1 ml-4 capitalize">
            workout plan
          </Text>
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Workout Banner */}
        <View className="relative h-48 w-full mb-6">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" }}
            className="w-full h-full"
            style={{ opacity: 0.7 }}
          />
          <View className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
            <Text className="text-white font-bold text-2xl">{workoutInfo.title}</Text>
            <Text className="text-white text-sm mt-1">{workoutInfo.description}</Text>
          </View>
        </View>

        {/* Workout Details */}
        <View className="px-6">
          <View className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
            <Text className="text-black dark:text-white font-medium text-lg mb-4">Workout Details</Text>

            <View className="flex-row justify-between mb-2">
              <View className="items-center flex-1">
                <MaterialIcons name="fitness-center" size={24} color="#10B981" />
                <Text className="text-gray-400 font-bold text-lg mt-1">{exerciseList.length}</Text>
                <Text className="text-black dark:text-white text-xs">Exercises</Text>
              </View>

              <View className="items-center flex-1">
                <MaterialIcons name="timer" size={24} color="red" />
                <Text className="text-gray-400 font-bold text-lg mt-1">{workoutInfo.duration}</Text>
                <Text className="text-black dark:text-white text-xs">Duration</Text>
              </View>

              <View className="items-center flex-1">
                <MaterialIcons name="local-fire-department" size={24} color="orange" />
                <Text className="text-gray-400 font-bold text-lg mt-1">{workoutInfo.calories}</Text>
                <Text className="text-black dark:text-white text-xs">Calories</Text>
              </View>
            </View>

            <View className="mt-4 pt-4 border-t border-gray-200 dark:border-[#3a3a3a]">
              <View className="flex-row items-center">
                <Text className="text-black dark:text-white">Difficulty:</Text>
                <Text className="text-gray-400 ml-2">{workoutInfo.difficulty}</Text>
              </View>
            </View>
          </View>

          {/* What to Expect */}
          <View className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
            <Text className="text-black dark:text-white font-medium text-lg mb-3">What to Expect</Text>
            {exerciseList.map((exercise, index) => (
              <Text key={index} className="text-black dark:text-white text-sm leading-5 mb-2">
                • {exercise.name}
              </Text>
            ))}
            <Text className="text-black dark:text-white text-sm leading-5 mb-2">• 20-second rest periods between exercises</Text>
            <Text className="text-black dark:text-white text-sm leading-5">• Modifications available for all fitness levels</Text>
          </View>

          {/* Tips */}
          <View className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
            <Text className="text-black dark:text-white font-medium text-lg mb-3">Tips</Text>
            <View className="flex-row items-start mb-2">
              <Ionicons name="water-outline" size={18} color="blue" />
              <Text className="text-black dark:text-white text-sm leading-5 ml-2 flex-1">Stay hydrated throughout your workout</Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Ionicons name="body-outline" size={18} color="gold" />
              <Text className="text-black dark:text-white text-sm leading-5 ml-2 flex-1">Focus on proper form rather than speed</Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="heart-outline" size={18} color="pink" />
              <Text className="text-black dark:text-white text-sm leading-5 ml-2 flex-1">Listen to your body and take breaks if needed</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View className="p-6 border-t border-gray-200 dark:border-[#3a3a3a]">
        <TouchableOpacity
          className="bg-[#10B981] py-4 rounded-xl flex-row justify-center items-center"
          onPress={() =>
            router.replace({
              pathname: '(workout)/Workout',
              params: { exerciseIndex: 0 },
            })
          }
        >
          <Text className="text-[#fff] font-bold text-lg mr-2">START WORKOUT</Text>
          <MaterialIcons name="fitness-center" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Exercise;
