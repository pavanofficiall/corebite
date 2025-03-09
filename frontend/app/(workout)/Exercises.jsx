import React from "react";
import { View, Text,Image, ScrollView,Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import image from "../constants/image";
import CustomButton from "../components/Button";

function Exercises() {
    const navigation = useNavigation();

    const chestExercises = [
        { id: 1, name: 'Push-ups', reps: '12 reps', image: image.OnboardingImg3 },
        { id: 2, name: 'Incline Push-ups', reps: '15 reps', image: image.OnboardingImg3 },
        { id: 3, name: 'Decline Push-ups', reps: '10 reps', image: image.OnboardingImg3 },
        { id: 4, name: 'Diamond Push-ups', reps: '12 reps', image: image.OnboardingImg3 },
        { id: 5, name: 'Wide Push-ups', reps: '15 reps', image: image.OnboardingImg3 },
        { id: 6, name: 'Chest Dips', reps: '10 reps', image: image.OnboardingImg3 },
        { id: 7, name: 'Archer Push-ups', reps: '8 reps (each side)', image: image.OnboardingImg3 },
        { id: 8, name: 'Explosive Push-ups', reps: '10 reps', image: image.OnboardingImg3 },
        { id: 9, name: 'Pike Push-ups', reps: '12 reps', image: image.OnboardingImg3 },
      ];
  return (
    <>
      <View className="bg-[#232323] h-screen">
      <View className="relative">
  <Image source={image.OnboardingImg1} className="w-full h-64 rounded-b-xl" />
  
  {/* Back Button on Top of Image */}
  <Pressable 
    onPress={() => navigation.goBack()} 
    className="absolute top-4 left-4 bg-black/50 p-2 rounded-full"
  >
    <Ionicons name="chevron-back" size={24} color="#ceff00" />
  </Pressable>
</View>

    <ScrollView className='mx-6'showsVerticalScrollIndicator={false}>
        <View className='flex flex-row items-center justify-between'>
        <Text className='text-white font-semibold text-2xl capitalize my-4'>chest workout(beginner)</Text>
        <Text className=' font-semibold text-xl text-[#ceff00]'>8 min</Text>
        </View>
        <View className=' mb-32'>
            <Text className='text-white font-semibold text-3xl my-4'>Exercises</Text>
            <View className="gap-4">
  {chestExercises.map((exercise) => (
    <View key={exercise.id} className="flex flex-row items-start gap-3 bg-[#3a3a3a] p-4 rounded-3xl">
      <Image source={exercise.image} className="w-28 h-20" />
      <View className="flex gap-2">
        <Text className="text-white font-semibold text-2xl capitalize">{exercise.name}</Text>
        <Text className="font-extralight text-slate-200">{exercise.reps}</Text>
      </View>
    </View>
  ))}
</View>
        </View>

      </ScrollView> 
        <Pressable onPress={() => navigation.navigate('(workout)/Workout')} className="absolute bottom-10 left-[50px] right-[50px] items-center">
  <CustomButton 
    title="Start" 
    className="p-4 bg-white/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-32 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50"
  />
</Pressable>
    </View>
    </>
  );
}

export default Exercises;
