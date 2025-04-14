// Exercises.jsx
import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image from "../constants/image";
import CustomButton from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

function Exercises() {
  const navigation = useNavigation(); //use for navigation between pages

  // Centralized data for chest exercises
  const chestExercises = [
    { id: 1, name: "Push-ups", reps: "12 reps", image: image.OnboardingImg3 },
    { id: 2, name: "Incline Push-ups", reps: "15 reps", image: image.arm },
    { id: 3, name: "Decline Push-ups", reps: "10 reps", image: image.OnboardingImg2 },
    { id: 4, name: "Diamond Push-ups", reps: "12 reps", image: image.OnboardingImg1 },
    { id: 5, name: "Wide Push-ups", reps: "15 reps", image: image.back }
    // ... add more as needed
  ];

  return (
    <View className="bg-[#232323] h-screen">
      {/* Header and Top Image */}
      <View className="relative">
        <Image source={image.OnboardingImg1} className="w-full h-64 rounded-b-xl" />
        <Pressable onPress={() => navigation.goBack()} className="absolute top-4 left-4 rounded-full">
          {/* Back Icon */}
          <Ionicons name="chevron-back" size={26} color="#ceff00" className="bg-black/50 p-1.5 rounded-full" />
        </Pressable>
      </View>

      {/* Exercise Info */}
      <ScrollView className="mx-6" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between my-4">
          <Text className="text-white font-semibold text-2xl capitalize">Chest Workout (Beginner)</Text>
          <Text className="font-semibold text-xl text-[#ceff00]">8 min</Text>
        </View>
        <View className="mb-32">
          <Text className="text-white font-semibold text-3xl my-4">Exercises</Text>
          {chestExercises.map((exercise) => (
            <View key={exercise.id} className="flex flex-row items-start gap-3 bg-[#3a3a3a] p-4 rounded-3xl mb-3">
              <Image source={exercise.image} className="w-28 h-20" />
              <View className="flex gap-2">
                <Text className="text-white font-semibold text-2xl capitalize">{exercise.name}</Text>
                <Text className="font-extralight text-slate-200">{exercise.reps}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Start Button - Navigates to Workout with index 0 */}
      <Pressable
        onPress={() =>
          navigation.navigate("(workout)/Workout", {
            exerciseIndex: 0,
            exercises: chestExercises,
          })
        }
        className="absolute bottom-10 left-[50px] right-[50px] items-center"
      >
        <CustomButton
          title="Start"
          className="p-4 bg-[#ceff00] border-2 border-[#fff] text-[#232323] font-extrabold rounded-full px-32"
        />
      </Pressable>
    </View>
  );
}

export default Exercises;
