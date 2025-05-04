import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';

const WorkoutComplete = () => {
  // Sample workout data - in a real app, this would come from the workout session
  const workoutData = {
    exercises: 5,
    caloriesBurned: 320,
    duration: 28, // minutes
    date: new Date(),
  };

  // State for user inputs
  const [feeling, setFeeling] = useState(null);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  // Animation values
  const [fadeAnim] = useState(new Animated.Value(1)); // Start with full opacity
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Start fade-out animation after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out to 0 opacity
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowConfetti(false)); // Hide confetti after animation
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveAndFinish = () => {
    // In a real app, you would save the workout data, feeling, and weight
    // to your database or state management system
    console.log("Saving workout data:", {
      ...workoutData,
      feeling,
      weight: weight ? parseFloat(weight) : null,
      notes,
    });

    // Navigate back to home or workout list
    router.replace('(logFood)/LogFood');
  };

  // Format the duration as MM:SS
  const formatDuration = (minutes) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#232323] dark:bg-[#232323]">
      {/* Confetti effect */}
      {showConfetti && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            opacity: fadeAnim, // Bind opacity to fadeAnim
          }}
        >
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        </Animated.View>
      )}

      {/* Header */}
      <View className="px-6 pt-3 pb-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-[#10B981] dark:text-[#10B981] font-medium text-xl capitalize">
            workout complete
          </Text>
          <TouchableOpacity onPress={() => router.replace('(logFood)/LogFood')}>
            <Ionicons name="close" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Congratulations Message */}
        <Animated.View
          className="items-center justify-center py-6"
          style={{ transform: [{ scale: scaleAnim }] }}
        >
          <View className="w-20 h-20 bg-[#10B981] dark:bg-[#10B981] rounded-full items-center justify-center mb-4">
            <MaterialIcons name="fitness-center" size={40} color="#232323" />
          </View>
          <Text className="text-white dark:text-white font-bold text-2xl mb-1">Congratulations!</Text>
          <Text className="text-white dark:text-white text-center opacity-80">
            You've successfully completed your workout!
          </Text>
        </Animated.View>

        {/* Workout Summary Card */}
        <View className="bg-[#2a2a2a] dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
          <Text className="text-white dark:text-white font-medium text-lg mb-4">Workout Summary</Text>
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <FontAwesome5 name="dumbbell" size={24} color="#10B981" />
              <Text className="text-[#10B981] dark:text-[#10B981] font-bold text-xl mt-2">
                {workoutData.exercises}
              </Text>
              <Text className="text-white dark:text-white text-xs">Exercises</Text>
            </View>
            
            <View className="items-center flex-1">
              <MaterialIcons name="local-fire-department" size={24} color="#10B981" />
              <Text className="text-[#10B981] dark:text-[#10B981] font-bold text-xl mt-2">
                {workoutData.caloriesBurned}
              </Text>
              <Text className="text-white dark:text-white text-xs">Calories</Text>
            </View>
            
            <View className="items-center flex-1">
              <Ionicons name="time-outline" size={24} color="#10B981" />
              <Text className="text-[#10B981] dark:text-[#10B981] font-bold text-xl mt-2">
                {workoutData.duration}m
              </Text>
              <Text className="text-white dark:text-white text-xs">Duration</Text>
            </View>
          </View>
          
          <View className="mt-6 pt-4 border-t border-[#3a3a3a] dark:border-[#3a3a3a]">
            <Text className="text-white dark:text-white text-center">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        </View>

        {/* How do you feel Card */}
        <View className="bg-[#2a2a2a] dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
          <Text className="text-white dark:text-white font-medium text-lg mb-4">How did you feel?</Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className={`items-center py-3 px-4 rounded-xl flex-1 mx-1 ${feeling === 'easy' ? 'bg-[#3a3a3a] dark:bg-[#3a3a3a] border border-[#10B981] dark:border-[#10B981]' : 'bg-[#333333] dark:bg-[#333333]'}`}
              onPress={() => setFeeling('easy')}
            >
              <Ionicons name="happy-outline" size={28} color={feeling === 'easy' ? "#10B981" : "white"} />
              <Text className={`mt-2 font-medium ${feeling === 'easy' ? 'text-[#10B981] dark:text-[#10B981]' : 'text-white dark:text-white'}`}>
                Easy
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`items-center py-3 px-4 rounded-xl flex-1 mx-1 ${feeling === 'neutral' ? 'bg-[#3a3a3a] dark:bg-[#3a3a3a] border border-[#10B981] dark:border-[#10B981]' : 'bg-[#333333] dark:bg-[#333333]'}`}
              onPress={() => setFeeling('neutral')}
            >
              <Ionicons name="happy-outline" size={28} color={feeling === 'neutral' ? "#10B981" : "white"} />
              <Text className={`mt-2 font-medium ${feeling === 'neutral' ? 'text-[#10B981] dark:text-[#10B981]' : 'text-white dark:text-white'}`}>
                Neutral
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`items-center py-3 px-4 rounded-xl flex-1 mx-1 ${feeling === 'hard' ? 'bg-[#3a3a3a] dark:bg-[#3a3a3a] border border-[#10B981] dark:border-[#10B981]' : 'bg-[#333333] dark:bg-[#333333]'}`}
              onPress={() => setFeeling('hard')}
            >
              <Ionicons name="sad-outline" size={28} color={feeling === 'hard' ? "#10B981" : "white"} />
              <Text className={`mt-2 font-medium ${feeling === 'hard' ? 'text-[#10B981] dark:text-[#10B981]' : 'text-white dark:text-white'}`}>
                Hard
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weight Input Card */}
        <View className="bg-[#2a2a2a] dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
          <Text className="text-white dark:text-white font-medium text-lg mb-4">Record Your Weight</Text>
          
          <View className="flex-row items-center">
            <View className="flex-1 bg-[#333333] dark:bg-[#333333] rounded-xl p-3 mr-3">
              <TextInput
                className="text-white dark:text-white text-lg text-center"
                placeholder="0.0"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <Text className="text-white dark:text-white text-lg">kg</Text>
          </View>
          
          <Text className="text-white dark:text-white opacity-60 text-xs mt-2 text-center">
            Tracking your weight helps monitor your fitness progress
          </Text>
        </View>

        {/* Notes Card */}
        <View className="bg-[#2a2a2a] dark:bg-[#2a2a2a] rounded-xl p-5 mb-6">
          <Text className="text-white dark:text-white font-medium text-lg mb-4">Workout Notes</Text>
          
          <View className="bg-[#333333] dark:bg-[#333333] rounded-xl p-3">
            <TextInput
              className="text-white dark:text-white min-h-[80px] text-base"
              placeholder="Add notes about your workout (optional)"
              placeholderTextColor="#666"
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* Achievements Card */}
        <View className="bg-[#2a2a2a] dark:bg-[#2a2a2a] rounded-xl p-5 mb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white dark:text-white font-medium text-lg">Achievements</Text>
            <TouchableOpacity>
              <Text className="text-[#10B981] dark:text-[#10B981] text-xs">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row items-center mb-3">
            <View className="w-12 h-12 bg-[#3a3a3a] dark:bg-[#3a3a3a] rounded-full items-center justify-center mr-4">
              <MaterialIcons name="emoji-events" size={24} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-white dark:text-white font-medium">Workout Streak</Text>
              <Text className="text-[#10B981] dark:text-[#10B981] text-xs">3 days in a row! Keep it up!</Text>
            </View>
            <View className="bg-[#10B981] dark:bg-[#10B981] px-2 py-1 rounded">
              <Text className="text-[#232323] dark:text-[#232323] font-bold">+10</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-[#3a3a3a] dark:bg-[#3a3a3a] rounded-full items-center justify-center mr-4">
              <FontAwesome5 name="fire-alt" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-white dark:text-white font-medium">Calorie Burner</Text>
              <Text className="text-[#10B981] dark:text-[#10B981] text-xs">Burned over 300 calories</Text>
            </View>
            <View className="bg-[#10B981] dark:bg-[#10B981] px-2 py-1 rounded">
              <Text className="text-[#232323] dark:text-[#232323] font-bold">+15</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Done Button */}
      <View className="p-6 border-t border-[#3a3a3a] dark:border-[#3a3a3a]">
        <TouchableOpacity
          className="bg-[#10B981] dark:bg-[#10B981] py-4 rounded-xl flex-row justify-center items-center"
          onPress={handleSaveAndFinish}
        >
          <Text className="text-[#232323] dark:text-[#232323] font-bold text-lg mr-2">SAVE & FINISH</Text>
          <Ionicons name="checkmark-circle" size={24} color="#232323" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutComplete;