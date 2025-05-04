import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import image from '../constants/image';

const exercises = [
  { 
    name: 'Push-ups', 
    image: image.arm,
    reps: '3 sets x 12 reps',
    instructions: 'Keep your body straight, lower until your chest nearly touches the floor, then push back up.',
    muscles: 'Chest, Shoulders, Triceps'
  },
  { 
    name: 'Bicep Curls', 
    image: image.arm,
    reps: '3 sets x 15 reps',
    instructions: 'Hold dumbbells with palms facing forward, curl up toward shoulders, then lower back down.',
    muscles: 'Biceps, Forearms'
  },
  { 
    name: 'Chin-ups', 
    image: image.arm,
    reps: '3 sets x 8 reps',
    instructions: 'Grip the bar with palms facing you, pull up until chin is over the bar, then lower back down.',
    muscles: 'Back, Biceps'
  },
  { 
    name: 'Squats', 
    image: image.arm,
    reps: '3 sets x 15 reps',
    instructions: 'Stand with feet shoulder-width apart, lower your hips back and down, then push back up.',
    muscles: 'Quadriceps, Hamstrings, Glutes'
  },
  { 
    name: 'Lunges', 
    image: image.arm,
    reps: '3 sets x 10 reps each leg',
    instructions: 'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees.',
    muscles: 'Quadriceps, Hamstrings, Glutes'
  },
];

const Workout = () => {
  const { exerciseIndex } = useLocalSearchParams();
  const index = Number(exerciseIndex);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    resetTimer();
  }, [index]);

  if (isNaN(index) || index < 0 || index >= exercises.length) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-[#232323]">
        <Text className="text-red-500 text-xl font-bold">Invalid Exercise</Text>
        <TouchableOpacity 
          className="mt-4 bg-[#10B981] px-6 py-3 rounded-xl"
          onPress={() => router.replace('(workout)/Exercises')}
        >
          <Text className="text-black font-semibold">Back to Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentExercise = exercises[index];
  const progress = ((index + 1) / exercises.length) * 100;

  const goToRest = () => {
    router.replace({ pathname: '(workout)/Rest', params: { exerciseIndex: index } });
  };

  const goBack = () => {
    if (index > 0) {
      router.replace({ pathname: '(workout)/Workout', params: { exerciseIndex: index - 1 } });
    } else {
      router.replace('(workout)/Exercises');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#232323]">
      {/* Header */}
      <View className="px-6 py-6 pb-4 bg-[#10B981]">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-[#fff] font-medium text-xl flex-1 ml-4 capitalize">
            exercise {index + 1}/{exercises.length}
          </Text>
          <TouchableOpacity onPress={() => router.replace('(workout)/Exercises')}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mt-2 px-6 mb-4">
        <View className="h-2 bg-gray-200 dark:bg-[#3a3a3a] rounded-full overflow-hidden">
          <View 
            className="h-full bg-[#10B981] rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </View>
      </View>

      <View className="flex-1 px-6">
        {/* Exercise Image */}
        <View className="h-72 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl overflow-hidden mb-6">
          <Image 
            source={currentExercise.image} 
            className="w-full h-full" 
            resizeMode="contain" 
          />
        </View>

        {/* Exercise Details */}
        <View className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
          <Text className="text-black dark:text-white font-bold text-2xl mb-2">{currentExercise.name}</Text>
          
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="repeat" size={20} color="#10B981" />
            <Text className="text-[#10B981] font-medium ml-2">{currentExercise.reps}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-black dark:text-white font-medium mb-1">Instructions:</Text>
            <Text className="text-gray-700 dark:text-white text-sm leading-5">{currentExercise.instructions}</Text>
          </View>
          
          <View className="pt-3 border-t border-gray-300 dark:border-[#3a3a3a]">
            <Text className="text-black dark:text-white font-medium mb-1">Target Muscles:</Text>
            <Text className="text-[#10B981] text-sm">{currentExercise.muscles}</Text>
          </View>
        </View>
      </View>

      {/* Timer Card */}
      <View className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-5 mb-6 mx-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-black dark:text-white font-medium">Exercise Timer</Text>
          <Text className="text-[#10B981] font-bold text-xl">{formatTime(time)}</Text>
        </View>
        <View className="flex-row justify-between mt-3">
          <TouchableOpacity 
            className={` py-2 px-4 rounded-lg ${isRunning ? 'bg-red-500' : 'bg-[#10B981]'} flex-1 mr-2`}
            onPress={handleTimer}
          >
            <Text className="text-white text-center font-medium">
              {isRunning ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-gray-300 dark:bg-[#3a3a3a] py-2 px-4 rounded-lg flex-1 ml-2"
            onPress={resetTimer}
          >
            <Text className="text-black dark:text-white text-center font-medium">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="p-6 flex-row justify-between border-t border-gray-300 dark:border-[#3a3a3a]">
        <TouchableOpacity 
          className={`py-4 px-8 rounded-xl flex-row items-center ${index === 0 ? 'bg-gray-300 dark:bg-[#3a3a3a]' : 'bg-gray-200 dark:bg-[#2a2a2a]'}`}
          onPress={goBack}
          disabled={index === 0}
        >
          <Ionicons name="chevron-back" size={20} color={index === 0 ? "#666" : "#10B981"} />
          <Text className={`font-medium ml-2 ${index === 0 ? 'text-gray-500' : 'text-black dark:text-white'}`}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-[#10B981] py-4 px-8 rounded-xl flex-row items-center"
          onPress={goToRest}
        >
          <Text className="text-white font-medium mr-2">Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Workout;
