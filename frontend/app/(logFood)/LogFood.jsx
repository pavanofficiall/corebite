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
    { name: "Apple", calories: "95 cal", protein: "0.5g Protein" },
    { name: "Greek Yogurt", calories: "100 cal", protein: "10g Protein" },
    { name: "Almonds", calories: "164 cal", protein: "6g Protein" },
    { name: "Sweet Potato", calories: "103 cal", protein: "2.3g Protein" },
    { name: "Tofu", calories: "144 cal", protein: "15g Protein" },
    { name: "Broccoli", calories: "55 cal", protein: "4.3g Protein" },
    { name: "Brown Rice", calories: "216 cal", protein: "5g Protein" },
    { name: "Avocado", calories: "160 cal", protein: "2g Protein" },
    { name: "Tuna", calories: "179 cal", protein: "39g Protein" },
    { name: "Cottage Cheese", calories: "98 cal", protein: "11g Protein" },
    { name: "Peanut Butter", calories: "188 cal", protein: "8g Protein" },
    { name: "Spinach", calories: "23 cal", protein: "2.9g Protein" },
    { name: "Carrot", calories: "41 cal", protein: "0.9g Protein" },
    { name: "Quinoa", calories: "222 cal", protein: "8g Protein" },
    { name: "Shrimp", calories: "99 cal", protein: "24g Protein" },
    { name: "Lentils", calories: "230 cal", protein: "18g Protein" },
    { name: "Mushrooms", calories: "22 cal", protein: "3g Protein" },
    { name: "Turkey Breast", calories: "135 cal", protein: "29g Protein" },
    { name: "Blueberries", calories: "57 cal", protein: "0.7g Protein" },
    { name: "Beef Steak", calories: "271 cal", protein: "26g Protein" },
      { name: "Pasta", calories: "221 cal", protein: "8g Protein" },
      { name: "Cheese", calories: "402 cal", protein: "25g Protein" },
      { name: "Bread", calories: "265 cal", protein: "9g Protein" },
      { name: "Rice", calories: "130 cal", protein: "2.7g Protein" },
      { name: "Potato", calories: "77 cal", protein: "2g Protein" },
      { name: "Butter", calories: "717 cal", protein: "0.9g Protein" },
      { name: "Milk", calories: "103 cal", protein: "8g Protein" },
      { name: "Cucumber", calories: "16 cal", protein: "0.7g Protein" },
      { name: "Bell Pepper", calories: "31 cal", protein: "1g Protein" },
      { name: "Cauliflower", calories: "25 cal", protein: "2g Protein" },
      { name: "Pineapple", calories: "50 cal", protein: "0.5g Protein" },
      { name: "Orange", calories: "62 cal", protein: "1.2g Protein" },
      { name: "Strawberries", calories: "32 cal", protein: "0.7g Protein" },
      { name: "Watermelon", calories: "30 cal", protein: "0.6g Protein" },
      { name: "Pomegranate", calories: "83 cal", protein: "1.7g Protein" },
      { name: "Kiwi", calories: "61 cal", protein: "1.1g Protein" },
      { name: "Chickpeas", calories: "164 cal", protein: "9g Protein" },
      { name: "Black Beans", calories: "132 cal", protein: "8.9g Protein" },
      { name: "Lamb", calories: "294 cal", protein: "25g Protein" },
      { name: "Pork Chop", calories: "231 cal", protein: "23g Protein" },
      { name: "Duck", calories: "337 cal", protein: "27g Protein" },
      { name: "Cod", calories: "82 cal", protein: "18g Protein" },
      { name: "Sardines", calories: "208 cal", protein: "25g Protein" },
      { name: "Octopus", calories: "164 cal", protein: "29g Protein" },
      { name: "Dark Chocolate", calories: "546 cal", protein: "4.9g Protein" },
      { name: "Peas", calories: "81 cal", protein: "5g Protein" },
      { name: "Zucchini", calories: "17 cal", protein: "1.2g Protein" },
      { name: "Radish", calories: "16 cal", protein: "0.7g Protein" },
      { name: "Chia Seeds", calories: "486 cal", protein: "17g Protein" },
      { name: "Cashews", calories: "553 cal", protein: "18g Protein" }
    
  ];
  

  // Filter food based on search input
  const filteredFoods = popularFoods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Food Suggestions */}
      {search.length > 0 && (
        <ScrollView className="mt-4 mx-6 rounded-lg">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <View
              key={index}
              className="bg-[#3a3a3a] px-5 py-4 rounded-lg flex-row justify-between items-center mb-3"
            >
              <View className=''>
                <Text className="text-white font-bold">{food.name}</Text>
                <Text className="text-white font-thin">
                  {food.calories}, {food.protein}
                </Text>
              </View>
              <Pressable  onPress={() => navigation.navigate('(logFood)/FoodInfo')}>
                <Ionicons
                  name="add"
                  size={25}
                  color="#232323"
                  className="bg-[#ceff00] rounded-full p-2"
                />
              </Pressable>
            </View>
            ))
          ) : (
            <View className='flex flex-row justify-between'>
              <Text className="text-white px-4 py-2">No food found?</Text>
              <Pressable>
              <Text className=" text-lg text-blue-600 font-semibold px-4 py-2">report</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      )}

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
              <Pressable onPress={() => navigation.navigate('(logFood)/FoodInfo')}>
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
