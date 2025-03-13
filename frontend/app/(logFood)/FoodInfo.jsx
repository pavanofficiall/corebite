import React from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function FoodInfo() {
  return (
    <>
      <View className="bg-[#232323] flex-1">
        <View className=" px-6 py-3">
          <View className="flex flex-row items-center justify-  gap-3 mb-8">
            <View className="flex-row items-center justify-evenly mx- mt-">
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  size={26}
                  color="#ceff00"
                  className="bg-black/50 p-1.5 rounded-full"
                />
              </Pressable>
            </View>
            <Text className="text-[#ceff00] font-medium text-xl flex-1 capitalize">
              add food
            </Text>
            <Pressable>
              <MaterialIcons name="done" size={28} color="#ceff00" />
            </Pressable>
          </View>

          <View>
            <View>
              <View className='flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]'>
                <Text className="text-white font-medium text-4xl  capitalize">Oats</Text>
              </View>
              <View className='flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]'>
                <Text className="text-white font-medium text-xl capitalize">meal</Text>
                <Text className="font-extralight text-xl text-[#ceff00]">Select</Text>
              </View>
              <View className='flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]'>
                <Text className="text-white font-medium text-xl capitalize">
                  no of servings
                </Text>
                <Text className="text-[#ceff00] font-extralight text-xl ">1</Text>
              </View>
              <View className='flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]'>
                <Text className="text-white font-medium text-xl capitalize">size</Text>
                <Text className="text-[#ceff00] font-extralight text-xl ">1 ounch</Text>
              </View>
            </View>

            <View className='flex flex-row justify-evenly py-2 border-b border-[#3a3a3a]'>
              <View className='flex flex-col items-center'>
                <Text className="text-white font-medium text-xl">307</Text>
                <Text className="text-[#ceff00] font-extralight text-sm  ">cal</Text>
              </View>

              <View className='flex flex-col items-center'>
                <Text className="text-white font-medium text-xl">23.4g</Text>
                <Text className="text-[#ceff00] font-extralight text-sm  ">carbs</Text>
              </View>
              <View className='flex flex-col items-center'>
                <Text className="text-white font-medium text-xl">23.4g</Text>
                <Text className="text-[#ceff00] font-extralight text-sm  ">carbs</Text>
              </View>
              <View className='flex flex-col items-center'>
                <Text className="text-white font-medium text-xl">23.4g</Text>
                <Text className="text-[#ceff00] font-extralight text-sm  ">carbs</Text>
              </View>
            </View>
          </View>
            <Pressable>
                <View className='flex flex-col items-center mt-6'>
                    <Text className='text-red-500 '>Report Food</Text>
                </View>
            </Pressable>
        </View>
      </View>
    </>
  );
}

export default FoodInfo;
