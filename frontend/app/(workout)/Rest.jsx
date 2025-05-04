import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import image from '../constants/image';

const exercises = [
  { name: 'Push-ups', image: image.arm },
  { name: 'Bicep Curljbjbjs', image: image.arm },
  { name: 'Chin-uhgbhhps', image: image.arm },
  { name: 'Squatjhjhjhs', image: image.arm },
  { name: 'Lunges', image: image.arm },
];

const Rest = () => {
  const { exerciseIndex } = useLocalSearchParams();
  const index = Number(exerciseIndex);
  const [seconds, setSeconds] = useState(20);
  const timerRef = useRef(null);
  const colorScheme = useColorScheme();
  const nextIndex = index + 1;
  const isLastExercise = nextIndex >= exercises.length;
  const nextExercise = isLastExercise ? null : exercises[nextIndex];

  const goToNextExercise = () => {
    if (nextIndex < exercises.length) {
      router.replace({ pathname: '(workout)/Workout', params: { exerciseIndex: nextIndex } });
    } else {
      router.replace('(workout)/Finished');
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          goToNextExercise();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const add15Seconds = () => {
    setSeconds((prev) => prev + 15);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const accentColor = '#10B981';
  const progress = ((index + 1) / exercises.length) * 100;

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'dark bg-[#232323]' : 'bg-white'}`}>
      <View className="px-6 pt-12 pb-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-xl capitalize text-[#10B981]">rest time</Text>
          <Text className="text-black dark:text-white">
            {index + 1}/{exercises.length}
          </Text>
        </View>
      </View>

      <View className="px-6 mb-4">
        <View className="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-[#3a3a3a]">
          <View style={{ width: `${progress}%` }} className="h-full rounded-full bg-[#10B981]" />
        </View>
      </View>

      <View className="flex-1 px-6 justify-center">
        <View className="items-center mb-10">
          <Text className="text-lg mb-4 text-black dark:text-white">Rest before next exercise</Text>
          <View className="w-48 h-48 rounded-full items-center justify-center border-4 border-[#10B981] bg-gray-100 dark:bg-[#2a2a2a]">
            <Text className="font-bold text-4xl text-[#10B981]">{formatTime(seconds)}</Text>
          </View>
        </View>

        {!isLastExercise && nextExercise && (
          <View className="rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-[#2a2a2a]">
            <Text className="font-medium p-4 bg-gray-200 dark:bg-[#3a3a3a] text-black dark:text-white">
              Up Next
            </Text>
            <View className="flex-row items-center p-4">
              <View className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-gray-200 dark:bg-[#3a3a3a]">
                <Image source={nextExercise.image} className="w-full h-full" resizeMode="contain" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-lg text-black dark:text-white">{nextExercise.name}</Text>
                <Text className="text-sm mt-1 text-[#10B981]">Get ready!</Text>
              </View>
            </View>
          </View>
        )}

        <View className="flex-row justify-between mb-6">
          <TouchableOpacity 
            className="py-4 px-6 rounded-xl flex-1 mr-3 flex-row items-center justify-center bg-gray-100 dark:bg-[#2a2a2a]"
            onPress={add15Seconds}
          >
            <MaterialIcons name="add" size={20} color={accentColor} />
            <Text className="font-medium ml-2 text-black dark:text-white">+15 sec</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="py-4 px-6 rounded-xl flex-1 flex-row items-center justify-center bg-[#10B981]"
            onPress={goToNextExercise}
          >
            <Text className="font-medium mr-2 text-white">Skip</Text>
            <MaterialIcons name="skip-next" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-6 border-t bg-[#10B981] border-gray-200 dark:border-[#3a3a3a]">
        <Text className="text-center text-lg font-medium text-white">
          {isLastExercise 
            ? "Almost done! Get ready for the final exercise!" 
            : "Take a deep breath and prepare for the next exercise!"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Rest;
