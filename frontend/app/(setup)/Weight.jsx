import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, Animated, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function WeightSelector() {
  const navigation = useNavigation();
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState(75);
  const animatedValue = useState(new Animated.Value(0))[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newWeight = Math.min(240, Math.max(40, Math.round(weight + gestureState.dx / 5)));
      setWeight(newWeight);
      Animated.timing(animatedValue, {
        toValue: newWeight,
        duration: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View className="flex-1 bg-[#232323]">
      <Pressable onPress={() => navigation.goBack()} className="flex-row my-7 mx-7">
        <Ionicons name="chevron-back" size={24} color="#CEFF00" />
        <Text className="text-xl font-bold text-[#CEFF00]">Back</Text>
      </Pressable>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-8 pb-6">
        <Text className="text-3xl font-bold text-[#CEFF00] text-center mb-9">What Is Your Weight?</Text>

        <View className="flex-row bg-[#CEFF00] rounded-full self-center mb-40">
          <TouchableOpacity
            className={`py-3 px-6 rounded-full ${unit === "kg" ? "bg-white text-black" : "opacity-60"}`}
            onPress={() => setUnit("kg")}
          >
            <Text className="text-lg font-bold text-black">KG</Text>
          </TouchableOpacity>
          <View className="w-px bg-white/20" />
          <TouchableOpacity
            className={`py-3 px-6 rounded-full ${unit === "lb" ? "bg-white text-black" : "opacity-60"}`}
            onPress={() => setUnit("lb")}
          >
            <Text className="text-lg font-bold text-black">LB</Text>
          </TouchableOpacity>
        </View>

        <View className="h-24 bg[#CEFF00] rounded-lg mb-6 flex justify-center px-4" {...panResponder.panHandlers}>
          <Animated.View
            style={{
              transform: [{ translateX: animatedValue }],
            }}
          >
            <View className="flex-row justify-between">
              {Array.from({ length: 21 }).map((_, i) => {
                const isMajor = i % 5 === 0;
                const isCenter = i === 10;
                return (
                  <View
                    key={i}
                    className={`${isMajor ? "h-10" : "h-5"} w-px ${isCenter ? "bg-[#CEFF00]" : "bg-white/60"}`}
                  />
                );
              })}
            </View>
          </Animated.View>
        </View>

        <View className="items-center mb-8">
          <View className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#CEFF00]" />
          <View className="flex-row items-baseline mt-6">
            <Text className="text-6xl font-bold text-white">{weight}</Text>
            <Text className="text-2xl text-gray-400 ml-2">{unit.toUpperCase()}</Text>
          </View>
        </View>

        <View className="absolute bottom-0 w-full mb-10 px-20">
          <Pressable onPress={() => navigation.navigate('(setup)/Height')}>
            <CustomButton 
              title="Next" 
              className="p-4 bg-white/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-20 mt-9"
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
