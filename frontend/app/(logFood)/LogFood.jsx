import React, { useState } from "react";
import { Text, View, Pressable, TextInput, ScrollView, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

function LogFood() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  // Dummy food data
  const popularFoods = [
    { name: "Egg", calories: "143", protein: "12.4", carbs: "1.1", fat: "9.5" },
    { name: "Chicken Breast", calories: "165", protein: "31", carbs: "0", fat: "3.6" },
    { name: "Oats", calories: "389", protein: "16.9", carbs: "66.3", fat: "6.9" },
    { name: "Banana", calories: "105", protein: "1.3", carbs: "27", fat: "0.3" },
    { name: "Salmon", calories: "208", protein: "20", carbs: "0", fat: "13" },
    { name: "Apple", calories: "95", protein: "0.5", carbs: "25", fat: "0.3" },
    { name: "Greek Yogurt", calories: "100", protein: "10", carbs: "3.6", fat: "0.4" },
    { name: "Almonds", calories: "164", protein: "6", carbs: "6.1", fat: "14.3" },
    { name: "Sweet Potato", calories: "103", protein: "2.3", carbs: "23.6", fat: "0.2" },
    { name: "Tofu", calories: "144", protein: "15", carbs: "3.9", fat: "8" },
    { name: "Broccoli", calories: "55", protein: "4.3", carbs: "11.2", fat: "0.6" },
    { name: "Brown Rice", calories: "216", protein: "5", carbs: "44.8", fat: "1.8" },
    { name: "Avocado", calories: "160", protein: "2", carbs: "8.5", fat: "15" },
    { name: "Tuna", calories: "179", protein: "39", carbs: "0", fat: "1" },
    { name: "Cottage Cheese", calories: "98", protein: "11", carbs: "3.4", fat: "4.3" },
    { name: "Peanut Butter", calories: "188", protein: "8", carbs: "6", fat: "16" },
    { name: "Spinach", calories: "23", protein: "2.9", carbs: "3.6", fat: "0.4" },
    { name: "Carrot", calories: "41", protein: "0.9", carbs: "9.6", fat: "0.2" },
    { name: "Quinoa", calories: "222", protein: "8", carbs: "39.4", fat: "3.6" },
    { name: "Shrimp", calories: "99", protein: "24", carbs: "0", fat: "0.3" },
    { name: "Lentils", calories: "230", protein: "18", carbs: "39.9", fat: "0.8" },
    { name: "Mushrooms", calories: "22", protein: "3", carbs: "3.3", fat: "0.3" },
    { name: "Turkey Breast", calories: "135", protein: "29", carbs: "0", fat: "1" },
    { name: "Blueberries", calories: "57", protein: "0.7", carbs: "14.5", fat: "0.3" },
    { name: "Beef Steak", calories: "271", protein: "26", carbs: "0", fat: "19" },
    { name: "Pasta", calories: "221", protein: "8", carbs: "43", fat: "1.3" },
    { name: "Cheese", calories: "402", protein: "25", carbs: "1.3", fat: "33" },
    { name: "Bread", calories: "265", protein: "9", carbs: "49", fat: "3.3" },
    { name: "Rice", calories: "130", protein: "2.7", carbs: "28", fat: "0.3" },
    { name: "Potato", calories: "77", protein: "2", carbs: "17", fat: "0.1" },
    { name: "Butter", calories: "717", protein: "0.9", carbs: "0.1", fat: "81" },
    { name: "Milk", calories: "103", protein: "8", carbs: "12", fat: "3.4" },
    { name: "Cucumber", calories: "16", protein: "0.7", carbs: "3.6", fat: "0.1" },
    { name: "Bell Pepper", calories: "31", protein: "1", carbs: "6", fat: "0.3" },
    { name: "Cauliflower", calories: "25", protein: "2", carbs: "5", fat: "0.3" },
    { name: "Pineapple", calories: "50", protein: "0.5", carbs: "13.1", fat: "0.1" },
    { name: "Orange", calories: "62", protein: "1.2", carbs: "15.4", fat: "0.2" },
    { name: "Strawberries", calories: "32", protein: "0.7", carbs: "7.7", fat: "0.3" },
    { name: "Watermelon", calories: "30", protein: "0.6", carbs: "7.6", fat: "0.2" },
    { name: "Pomegranate", calories: "83", protein: "1.7", carbs: "18", fat: "1.2" },
    { name: "Kiwi", calories: "61", protein: "1.1", carbs: "14.7", fat: "0.5" },
    { name: "Chickpeas", calories: "164", protein: "9", carbs: "27.4", fat: "2.6" },
    { name: "Black Beans", calories: "132", protein: "8.9", carbs: "23.7", fat: "0.9" },
    { name: "Lamb", calories: "294", protein: "25", carbs: "0", fat: "21" },
    { name: "Pork Chop", calories: "231", protein: "23", carbs: "0", fat: "13" },
    { name: "Duck", calories: "337", protein: "27", carbs: "0", fat: "28" },
    { name: "Cod", calories: "82", protein: "18", carbs: "0", fat: "0.7" },
    { name: "Sardines", calories: "208", protein: "25", carbs: "0", fat: "11" },
    { name: "Octopus", calories: "164", protein: "29", carbs: "0", fat: "3" },
    { name: "Dark Chocolate", calories: "546", protein: "4.9", carbs: "46", fat: "31" },
    { name: "Peas", calories: "81", protein: "5", carbs: "14.5", fat: "0.4" },
    { name: "Zucchini", calories: "17", protein: "1.2", carbs: "3.1", fat: "0.3" },
    { name: "Radish", calories: "16", protein: "0.7", carbs: "3.4", fat: "0.1" },
    { name: "Chia Seeds", calories: "486", protein: "17", carbs: "42.1", fat: "30.9" },
    { name: "Cashews", calories: "553", protein: "18", carbs: "30.2", fat: "43.9" },
  ];
  

  // Filter food based on search input
  const filteredFoods = popularFoods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="dark:bg-[#232323] h-full">
      {/* Header */}
      <View className="bg-emerald-500 flex-row items-center justify-between px-6 py-4 rounded-t-xl mx-4 mt-3">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#10B981"
            className="bg-white p-1.5 rounded-full"
          />
        </Pressable>
        <Text className="text-white text-2xl font-semibold">Add Food</Text>
      </View>

      {/* Search Bar */}
        <View className="mt-9 mx-4">
          <View className="flex-row items-center bg-stone-300 dark:bg-[#3a3a3a] rounded-full px-4 py-2">
            <FontAwesome5 name="search" size={20} color={isDark ? "#10B981" : "#adadad"} />
            <TextInput
          className="dark:text-white text-black flex-1 ml-3 text-lg"
          placeholder="Search Your Food ..."
          placeholderTextColor={isDark ? "#10B981" : "#adadad"}
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
                className="bg-white dark:bg-[#3a3a3a] px-5 py-4 rounded-lg flex-row justify-between items-center mb-3"
              >
                <View className="">
                  <Text className="text-gray-700 dark:text-white font-bold">{food.name}</Text>
                  <Text className="text-gray-500 dark:text-white font-extralight">
                    {food.calories}, {food.protein}
                  </Text>
                </View>
                <Pressable
                  onPress={() => navigation.navigate("(logFood)/FoodInfo")}
                >
                  <Ionicons
                    name="add"
                    size={25}
                    color="#fff"
                    className="bg-emerald-500 rounded-full p-2"
                  />
                </Pressable>
              </View>
            ))
          ) : (
            <View className="flex flex-row justify-between">
              <Text className="dark:text-white px-4 py-2">No food found?</Text>
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
      <View className="mt-9 mx-4 flex-1">
        <Text className="text-gray-500 dark:text-emerald-400 text-xl font-semibold mb-4">
          Popular Foods
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {popularFoods.map((food, index) => (
            <View
              key={index}
              className="bg-white dark:bg-[#3a3a3a] px-5 py-4 rounded-lg flex-row justify-between items-center mb-3"
            >
              <View>
                <Text className="dark:text-white font-bold">{food.name}</Text>
                <Text className="dark:text-white font-thin">
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
                  color="#fff"
                  className="bg-emerald-400 rounded-full p-2"
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
