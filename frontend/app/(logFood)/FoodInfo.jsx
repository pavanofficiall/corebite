import React, { useState } from "react";
import { View, Text, Pressable, Modal, ToastAndroid } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns';


function FoodInfo() {
  const route = useRoute();
  const {food} = route.params || {};
  const navigation = useNavigation();
  // console.log("Food received from route:", food);

  // console.log("Route params:", route.params);

  const [mealType, setMealType] = useState("Select");
  const [servings, setServings] = useState(1);
  const [size, setSize] = useState("1 ounce");
  const [popoverType, setPopoverType] = useState(null);

  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const servingOptions = [1, 2, 3, 4, 5];
  const sizeOptions = ["1 ounce", "100 grams", "1 cup", "1 piece"];

  const handleSelect = (type, value) => {
    if (type === "meal") setMealType(value);
    if (type === "servings") setServings(value);
    if (type === "size") setSize(value);
    setPopoverType(null);
  };

  const renderPopover = (type, options) => (
    <Modal transparent animationType="fade" visible={popoverType === type}>
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="bg-[#232323] p-5 rounded-lg w-3/4">
          {options.map((option, index) => (
            <Pressable key={index} onPress={() => handleSelect(type, option)}>
              <Text className="text-white text-center py-2">{option}</Text>
            </Pressable>
          ))}
          <Pressable onPress={() => setPopoverType(null)}>
            <Text className="text-red-500 text-center mt-2">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  const handleDone = async () => {
    if (!food) return;
  
    const newEntry = {
      ...food,
      date: format(new Date(), 'yyyy-MM-dd'),
      mealType,
      size,
      servings,
    };
  
    try {
      const existingLogs = await AsyncStorage.getItem("foodLogs");
      let foodLogs = existingLogs ? JSON.parse(existingLogs) : [];
  
      foodLogs.push(newEntry);
      await AsyncStorage.setItem("foodLogs", JSON.stringify(foodLogs));
  
      ToastAndroid.show("Food added successfully!", ToastAndroid.SHORT);
      navigation.navigate("(logFood)/History");
  
    } catch (error) {
      console.error("Error saving food log:", error);
    }
  };
  
  return (
    <>
      <View className="bg-[#232323] flex-1">
        <View className="px-6 py-3">
          <View className="flex flex-row items-center justify-between gap-3 mb-8">
            <View className="flex-row items-center justify-evenly">
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
            <Pressable onPress={handleDone}>
              <MaterialIcons name="done" size={28} color="#ceff00" />
            </Pressable>
          </View>

          <View>
            <View>
              <View className="flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]">
                <Text className="text-white font-medium text-4xl capitalize">
                  {food.name || "Unknown Food"}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]">
                <Text className="text-white font-medium text-xl capitalize">
                  meal
                </Text>
                <Pressable onPress={() => setPopoverType("meal")}>
                  <Text className="font-extralight text-xl text-[#ceff00]">
                    {mealType}
                  </Text>
                </Pressable>
              </View>
              <View className="flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]">
                <Text className="text-white font-medium text-xl capitalize">
                  no of servings
                </Text>
                <Pressable onPress={() => setPopoverType("servings")}>
                  <Text className="text-[#ceff00] font-extralight text-xl">
                    {servings}
                  </Text>
                </Pressable>
              </View>
              <View className="flex flex-row justify-between items-center border-b py-3 border-[#3a3a3a]">
                <Text className="text-white font-medium text-xl capitalize">
                  size
                </Text>
                <Pressable onPress={() => setPopoverType("size")}>
                  <Text className="text-[#ceff00] font-extralight text-xl">
                    {size}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="flex flex-row justify-evenly py-2 border-b border-[#3a3a3a]">
              <View className="flex flex-col items-center">
                <Text className="text-white font-medium text-xl">{food.calories || '?'}<Text className='font-extralight text-lg'>g</Text></Text>
                <Text className="text-[#ceff00] font-extralight text-sm">
                  cal
                </Text>
              </View>

              <View className="flex flex-col items-center">
                <Text className="text-white font-medium text-xl">{food.carbs || '?'}<Text className='font-extralight text-lg'>g</Text></Text>
                <Text className="text-[#ceff00] font-extralight text-sm">
                  carbs
                </Text>
              </View>
              <View className="flex flex-col items-center">
                <Text className="text-white font-medium text-xl">{food.protein || '?'}<Text className='font-extralight text-lg'>g</Text></Text>
                <Text className="text-[#ceff00] font-extralight text-sm">
                  Protein
                </Text>
              </View>
              <View className="flex flex-col items-center">
                <Text className="text-white font-medium text-xl">{food.fat || '?'}<Text className='font-extralight text-lg'>g</Text></Text>
                <Text className="text-[#ceff00] font-extralight text-sm">
                  fat
                </Text>
              </View>
            </View>
          </View>

          <Pressable>
            <View className="flex flex-col items-center mt-6">
              <Text className="text-red-500">Report Food</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {renderPopover("meal", mealOptions)}
      {renderPopover("servings", servingOptions)}
      {renderPopover("size", sizeOptions)}
    </>
  );
}

export default FoodInfo;
