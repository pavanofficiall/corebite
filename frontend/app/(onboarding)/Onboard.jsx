import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useRouter } from "expo-router";
import { images } from "../constants";

const slides = [
  {
    id: 1,
    image: images.OnboardingImg1,
    title: "Start Your Journey Towards A More Active Lifestyle",
    icon: "🏋️‍♂️",
  },
  {
    id: 2,
    image: images.OnboardingImg2,
    title: "Find Nutrition Tips That Fit Your Lifestyle",
    icon: "🍏",
  },
  {
    id: 3,
    image: images.OnboardingImg3,
    title: "A Community For You, Challenge Yourself",
    icon: "👥",
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/(auth)/Sign-up");
    }
  };

  return (
    <GestureRecognizer onSwipeLeft={handleNext} style={{ flex: 1 }}>
      <View className="flex-1">
        {/* Background Image */}
        <Image
          source={slides[currentIndex].image}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        {/* Skip Button */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/Sign-up")}
          className="absolute top-10 right-6"
        >
          <Text className="text-yellow-400 text-lg font-bold">Skip →</Text>
        </TouchableOpacity>

        {/* Content Box */}
        <View className="absolute bottom-10 w-full px-6">
          <View className="h-full w-full bg-green-600 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 p-6 rounded-2xl items-center shadow-lg">
            <Text className="text-4xl">{slides[currentIndex].icon}</Text>
            <Text className="text-white text-center text-lg font-semibold mt-3">
              {slides[currentIndex].title}
            </Text>

            {/* Pagination */}
            <View className="flex-row mt-2">
              {slides.map((_, i) => (
                <View
                  key={i}
                  className={`w-2.5 h-2.5 mx-1 rounded-full ${
                    i === currentIndex ? "bg-white" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              className="mt-4 bg-black px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold">
                {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureRecognizer>
  );
}
