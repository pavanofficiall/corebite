import { View, Text, Image, ScrollView, TouchableOpacity, useColorScheme, Pressable } from 'react-native';
import React from 'react';
import images from '../constants/image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightTheme, darkTheme } from '../../assets/theme'; // Import themes
import { useNavigation } from '@react-navigation/native';

const ProgressBar = ({ sections }) => {
  return (
    <View className="w-full h-6 rounded-full overflow-hidden border border-white">
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
  const navigation = useNavigation();
  const theme = useColorScheme(); // Detect system theme
  const colors = theme === 'dark' ? darkTheme : lightTheme; // Apply theme

  const caloriesTracking = [
    { percentage: 30, color: '#ceff00' },
    { percentage: 70, color: colors.card },
  ];
  const progressData = [
    { percentage: 30, color: '#ff5733' },
    { percentage: 20, color: '#33ff57' },
    { percentage: 50, color: '#3357ff' },
  ];

  return (
    <View className={`flex-1 ${colors.background}`}>
      <ScrollView className="h-20">
        <View className="px-6 py-10">
          <Text className={`text-3xl capitalize font-semibold ${colors.text}`}>Hi user!</Text>
          
          {/* Progress Section */}
          <View className={`rectangle-box ${colors.card} w-full h-48 my-4 rounded-lg`}>
            <View className="flex flex-row justify-start p-4 gap-4">
              {[
                { color: "#ceff00", label: "Calories" },
                { color: "#ff5733", label: "Carbs" },
                { color: "#33ff57", label: "Fats" },
                { color: "#3357ff", label: "Protein" },
              ].map((item, index) => (
                <View key={index} className="flex flex-row gap-1 items-center">
                  <FontAwesome name="circle" size={11} color={item.color} />
                  <Text className={`font-bold capitalize px-1 ${colors.text}`}>{item.label}</Text>
                </View>
              ))}
            </View>

            {/* Progress Bars */}
            <View className="p-5">
              <ProgressBar sections={caloriesTracking} />
              <Text className="font-thin text-slate-300 capitalize mt-2 ml-2">Remaining: 1800</Text>
            </View>
            <View className="px-5">
              <ProgressBar sections={progressData} />
            </View>
          </View>

          {/* Meals Section */}
          <Text className={`text-2xl capitalize font-medium my-2 ${colors.text}`}>Suggested Meals for You</Text>
          
          <View className="listOfMeals gap-2">
            {[images.img1, images.img2, images.img3, images.OnboardingImg2].map((image, index) => (
              <View key={index} className={`flex flex-row flex-wrap ${colors.card} rounded-lg p-4 my-2`}>
                <Image source={image} className="w-36 h-28 rounded-3xl mr-3" />
                <View>
                  <Text className={`font-medium text-xl capitalize ${colors.text}`}>Indian Thali</Text>
                  <Text className={colors.text}>Lorem ipsum dolor sit ...</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity onPress={() => (navigation.navigate('(logFood)/LogFood'))} className="absolute bottom-9 right-5 bg-[#ceff00] p-3 rounded-full shadow-lg">
        <Ionicons name="add" size={30} color="#232323" />
      </TouchableOpacity>
    </View>
  );
};

export default DietTracker;