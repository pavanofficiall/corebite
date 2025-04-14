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
    { name: "Egg", calories: "143 ", protein: "12.4" },
    { name: "Chicken Breast", calories: "165 ", protein: "31" },
    { name: "Oats", calories: "389 ", protein: "16.9" },
    { name: "Banana", calories: "105 ", protein: "1.3" },
    { name: "Salmon", calories: "208 ", protein: "20" },
    { name: "Apple", calories: "95 ", protein: "0.5" },
    { name: "Greek Yogurt", calories: "100 ", protein: "10" },
    { name: "Almonds", calories: "164 ", protein: "6" },
    { name: "Sweet Potato", calories: "103 ", protein: "2.3" },
    { name: "Tofu", calories: "144 ", protein: "15" },
    { name: "Broccoli", calories: "55 ", protein: "4.3" },
    { name: "Brown Rice", calories: "216 ", protein: "5" },
    { name: "Avocado", calories: "160 ", protein: "2" },
    { name: "Tuna", calories: "179 ", protein: "39" },
    { name: "Cottage Cheese", calories: "98 ", protein: "11" },
    { name: "Peanut Butter", calories: "188 ", protein: "8" },
    { name: "Spinach", calories: "23 ", protein: "2.9" },
    { name: "Carrot", calories: "41 ", protein: "0.9" },
    { name: "Quinoa", calories: "222 ", protein: "8" },
    { name: "Shrimp", calories: "99 ", protein: "24" },
    { name: "Lentils", calories: "230 ", protein: "18" },
    { name: "Mushrooms", calories: "22 ", protein: "3" },
    { name: "Turkey Breast", calories: "135 ", protein: "29" },
    { name: "Blueberries", calories: "57 ", protein: "0.7" },
    { name: "Beef Steak", calories: "271 ", protein: "26" },
    { name: "Pasta", calories: "221 ", protein: "8" },
    { name: "Cheese", calories: "402 ", protein: "25" },
    { name: "Bread", calories: "265 ", protein: "9" },
    { name: "Rice", calories: "130 ", protein: "2.7" },
    { name: "Potato", calories: "77 ", protein: "2" },
    { name: "Butter", calories: "717 ", protein: "0.9" },
    { name: "Milk", calories: "103 ", protein: "8" },
    { name: "Cucumber", calories: "16 ", protein: "0.7" },
    { name: "Bell Pepper", calories: "31 ", protein: "1" },
    { name: "Cauliflower", calories: "25 ", protein: "2" },
    { name: "Pineapple", calories: "50 ", protein: "0.5" },
    { name: "Orange", calories: "62 ", protein: "1.2" },
    { name: "Strawberries", calories: "32 ", protein: "0.7" },
    { name: "Watermelon", calories: "30 ", protein: "0.6" },
    { name: "Pomegranate", calories: "83 ", protein: "1.7" },
    { name: "Kiwi", calories: "61 ", protein: "1.1" },
    { name: "Chickpeas", calories: "164 ", protein: "9" },
    { name: "Black Beans", calories: "132 ", protein: "8.9" },
    { name: "Lamb", calories: "294 ", protein: "25" },
    { name: "Pork Chop", calories: "231 ", protein: "23" },
    { name: "Duck", calories: "337 ", protein: "27" },
    { name: "Cod", calories: "82 ", protein: "18" },
    { name: "Sardines", calories: "208 ", protein: "25" },
    { name: "Octopus", calories: "164 ", protein: "29" },
    { name: "Dark Chocolate", calories: "546 ", protein: "4.9" },
    { name: "Peas", calories: "81 ", protein: "5" },
    { name: "Zucchini", calories: "17 ", protein: "1.2" },
    { name: "Radish", calories: "16 ", protein: "0.7" },
    { name: "Chia Seeds", calories: "486 ", protein: "17" },
    { name: "Cashews", calories: "553 ", protein: "18" },
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
                <View className="">
                  <Text className="text-white font-bold">{food.name}</Text>
                  <Text className="text-white font-thin">
                    {food.calories}, {food.protein}
                  </Text>
                </View>
                <Pressable
                  onPress={() => navigation.navigate("(logFood)/FoodInfo")}
                >
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
            <View className="flex flex-row justify-between">
              <Text className="text-white px-4 py-2">No food found?</Text>
              <Pressable>
                <Text className=" text-lg text-blue-600 font-semibold px-4 py-2">
                  report
                </Text>
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

              <Pressable
                onPress={() =>
                  navigation.navigate("(logFood)/FoodInfo", { food })
                }
              >
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
