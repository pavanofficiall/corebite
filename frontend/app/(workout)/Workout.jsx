// Workout.jsx
import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../components/Button";

function Workout() {
  const navigation = useNavigation();
  const route = useRoute();
  // Get current exercise index and list from route params
  const { exerciseIndex, exercises } = route.params;
  const currentExercise = exercises[exerciseIndex];

  // Function to handle Next:
  const handleNext = () => {
    if (exerciseIndex + 1 <= exercises.length) {
      // Navigate to Rest screen with the next exercise index
      navigation.navigate("(workout)/Rest", {
        nextIndex: exerciseIndex + 1,
        exercises,
      });
    } else {
      // If it's the last exercise, maybe navigate to a finish screen
      navigation.navigate("(workout)/Finished");
    }
  };

  return (
    <View className="flex-1 bg-[#232323] justify-end">
      {/* Top Controls */}
      <View className="flex-row items-center justify-between mx-6 mt-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ceff00" className="bg-black/50 p-1.5 rounded-full" />
        </Pressable>
        {/* (Additional controls if needed) */}
      </View>

      {/* Workout Content */}
      <View className="mx-6 my-6 bg-white h-2/4 rounded-2xl flex items-center relative">
        <Image source={currentExercise.image} className="w-[350px] h-[422px] rounded-3xl" />
        {/* Example overlay icons */}
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-x-64">
          {/* Like / Dislike icons */}
          <Ionicons name="heart" size={20} color="white" className="bg-black/25 p-3 rounded-full" />
          <Ionicons name="heart-dislike" size={20} color="white" className="bg-black/25 p-3 rounded-full" />
        </View>
      </View>

      {/* Workout Details and Next Button */}
      <View className="w-full h-96 rounded-3xl flex flex-col justify-start items-center">
        <View className="flex flex-row items-center my-4">
          <Text className="text-4xl font-semibold px-1 py-3 uppercase text-white">
            {currentExercise.name}
          </Text>
        </View>
        <Text className="font-bold text-6xl my-8 text-white">{currentExercise.reps}</Text>
        <Pressable onPress={handleNext} className="mb-4">
          <CustomButton title="Next" className="text-3xl text-[#ceff00] border border-[#ceff00] px-28 py-3 rounded-full" />
        </Pressable>
      </View>
    </View>
  );
}

export default Workout;
