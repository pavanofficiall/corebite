import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import images from '../constants/image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProgressBar = ({ sections }) => {
  return (
    <View className="w-full h-6 bg-gray-300 rounded-full overflow-hidden border border-white">
      <View className="flex-row w-full h-full">
        {sections.map((section, index) => (
          <View
            key={index}
            className="h-full"
            style={{
              width: `${section.percentage}%`,
              backgroundColor: section.color,
            }}
          />
        ))}
      </View>
    </View>
  );
};

const DietTracker = () => {
  const caloriesTracking = [
    { percentage: 30, color: '#ceff00' },
    { percentage: 70, color: '#232323' },
  ];
  const progressData = [
    { percentage: 30, color: '#ff5733' },
    { percentage: 20, color: '#33ff57' },
    { percentage: 50, color: '#3357ff' },
  ];

  return (
    <View className="flex-1 bg-[#232323]">
      <ScrollView className="h-20">
        <View className="px-6 py-10">
          <Text className="text-white text-3xl capitalize font-semibold">Hi user!</Text>
          
          <View className="rectangle-box bg-[#3A3A3A] w-full h-48 my-4 rounded-lg">
            <View className="flex flex-row justify-start p-4 gap-4">
              <View className="flex flex-row gap-1 items-center">
                <FontAwesome name="circle" size={11} color="#ceff00" />
                <Text className="text-white font-bold capitalize px-1">Calories</Text>
              </View>
              <View className="flex flex-row gap-1 items-center">
                <FontAwesome name="circle" size={11} color="#ff5733" />
                <Text className="text-white font-bold capitalize px-1">Carbs</Text>
              </View>
              <View className="flex flex-row gap-1 items-center">
                <FontAwesome name="circle" size={11} color="#33ff57" />
                <Text className="text-white font-bold capitalize px-1">Fats</Text>
              </View>
              <View className="flex flex-row gap-1 items-center">
                <FontAwesome name="circle" size={11} color="#3357ff" />
                <Text className="text-white font-bold capitalize px-1">Protein</Text>
              </View>
            </View>

            <View className="p-5">
              <ProgressBar sections={caloriesTracking} />
              <Text className="font-thin text-slate-300 capitalize mt-2 ml-2">Remaining: 1800</Text>
            </View>

            <View className="px-5">
              <ProgressBar sections={progressData} />
            </View>
          </View>

          <Text className="text-white text-2xl capitalize font-medium my-2">Suggested Meals for You</Text>
          
          <View className="listOfMeals gap-2">
            {[images.img1, images.img2, images.img3, images.OnboardingImg2].map((image, index) => (
              <View key={index} className="flex flex-row flex-wrap bg-[#3A3A3A] rounded-lg p-4 my-2">
                <Image source={image} className="w-36 h-28 rounded-3xl mr-3" />
                <View>
                  <Text className="text-white font-medium text-xl capitalize">Indian Thali</Text>
                  <Text className="text-white capitalize">Lorem ipsum dolor sit ...</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        className="absolute bottom-9 right-5 bg-[#ceff00] p-3 rounded-full shadow-lg"
      >
        <Ionicons name="add" size={30} color="#232323" />
      </TouchableOpacity>
    </View>
  );
};

export default DietTracker;
