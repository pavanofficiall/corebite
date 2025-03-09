import React, { useState } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

function LogFood() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  // Dummy food data
  const popularFoods = [
    { name: "Egg", calories: "143 cal", protein: "12.4g Protein" },
    { name: "Chicken Breast", calories: "165 cal", protein: "31g Protein" },
    { name: "Oats", calories: "389 cal", protein: "16.9g Protein" },
    { name: "Banana", calories: "105 cal", protein: "1.3g Protein" },
    { name: "Salmon", calories: "208 cal", protein: "20g Protein" },
  ];

  return (
    <View className="bg-[#232323] h-full">
      {/* Header */}
      <View className="flex-row items-center justify-between mx-6 mt-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#ceff00"
            className="bg-black/50 p-1.5 rounded-full"
          />
        </Pressable>
        <Text className="text-[#ceff00] text-2xl font-semibold">Add Food</Text>
      </View>

      {/* Search Bar */}
      <View className="mt-9 mx-6">
        <View className="flex-row items-center bg-[#3a3a3a] rounded-full px-4 py-2">
          <FontAwesome5 name="search" size={20} color="#ceff00" />
          <TextInput
            className="text-white flex-1 ml-3 text-lg"
            placeholder="Search Your Food ..."
            placeholderTextColor="#ceff00"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Popular Foods */}
      <View className="mt-9 mx-6 flex-1">
        <Text className="text-[#ceff00] text-xl font-semibold mb-4">
          Popular Foods
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {popularFoods.map((food, index) => (
            <View
              key={index}
              className="bg-[#3a3a3a] px-5 py-4 rounded-lg flex-row justify-between items-center mb-3"
            >
              <View>
                <Text className="text-white font-bold">{food.name}</Text>
                <Text className="text-white font-thin">
                  {food.calories}, {food.protein}
                </Text>
              </View>
              <Pressable>
                <Ionicons
                  name="add"
                  size={25}
                  color="#232323"
                  className="bg-[#ceff00] rounded-full p-2"
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default LogFood;
