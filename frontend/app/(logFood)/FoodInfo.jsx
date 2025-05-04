import React, { useState } from "react";
import { View, Text, Pressable, Modal, ToastAndroid, ScrollView } from "react-native";
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

  const handleDone = async () => {
    if (mealType === "Select") {
      ToastAndroid.show("Please select a meal type!", ToastAndroid.SHORT);
      return;
    }
  
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
  

  // Calculate total calories based on servings
  const totalCalories = food?.calories ? parseInt(food.calories) * servings : 0;
  
  const renderPopover = (type, options) => (
    <Modal transparent animationType="fade" visible={popoverType === type}>
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="bg-[#232323] p-5 rounded-lg w-3/4">
          <Text className="text-[#10B981] font-medium text-lg mb-4 text-center capitalize">
            Select {type}
          </Text>
          {options.map((option, index) => (
            <Pressable 
              key={index} 
              onPress={() => handleSelect(type, option)}
              className="py-3 border-b border-[#3a3a3a]"
            >
              <Text className="text-white text-center">{option}</Text>
            </Pressable>
          ))}
          <Pressable 
            onPress={() => setPopoverType(null)}
            className="mt-4"
          >
            <Text className="text-red-500 text-center">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <View className="bg-[#232323] flex-1">
      <View className="px-6 py-3">
        {/* Header */}
        <View className="flex flex-row items-center justify-between gap-3 mb-4">
          <View className="flex-row items-center justify-evenly">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={26}
                color="#10B981"
                className="bg-black/50 p-1.5 rounded-full"
              />
            </Pressable>
          </View>
          <Text className="text-[#10B981] font-medium text-xl flex-1 capitalize">
            add food
          </Text>
          <Pressable 
            onPress={handleDone}
            className="bg-[#10B981] px-4 py-1 rounded-full"
          >
<MaterialIcons name="done" size={24} color="black" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Food Name Card */}
          <View className="bg-[#2a2a2a] rounded-xl p-4 mb-4">
            <Text className="text-white text-sm mb-1">Food Name</Text>
            <Text className="text-white font-medium text-2xl capitalize">
              {food?.name || "Unknown Food"}
            </Text>
          </View>

          {/* Food Options Card */}
          <View className="bg-[#2a2a2a] rounded-xl p-4 mb-4">
            <Text className="text-white font-medium text-lg mb-3">Options</Text>
            
            <View className="flex-row justify-between items-center py-3 border-b border-[#3a3a3a]">
              <Text className="text-white text-base capitalize">Meal</Text>
              <Pressable 
                onPress={() => setPopoverType("meal")}
                className="flex-row items-center"
              >
                <Text className="text-[#10B981] text-base mr-2">{mealType}</Text>
                <Ionicons name="chevron-down" size={16} color="#10B981" />
              </Pressable>
            </View>
            
            <View className="flex-row justify-between items-center py-3 border-b border-[#3a3a3a]">
              <Text className="text-white text-base capitalize">Servings</Text>
              <Pressable 
                onPress={() => setPopoverType("servings")}
                className="flex-row items-center"
              >
                <Text className="text-[#10B981] text-base mr-2">{servings}</Text>
                <Ionicons name="chevron-down" size={16} color="#10B981" />
              </Pressable>
            </View>
            
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-white text-base capitalize">Serving Size</Text>
              <Pressable 
                onPress={() => setPopoverType("size")}
                className="flex-row items-center"
              >
                <Text className="text-[#10B981] text-base mr-2">{size}</Text>
                <Ionicons name="chevron-down" size={16} color="#10B981" />
              </Pressable>
            </View>
          </View>

          {/* Nutrition Card */}
          <View className="bg-[#2a2a2a] rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white font-medium text-lg">Nutrition</Text>
              <Text className="text-white text-sm">
                Per {servings} {servings > 1 ? 'servings' : 'serving'}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center py-3 border-b border-[#3a3a3a]">
              <Text className="text-white text-base">Calories</Text>
              <Text className="text-[#10B981] font-medium text-base">{totalCalories}</Text>
            </View>
            
            <View className="flex-row justify-between py-4">
              <View className="items-center">
                <Text className="text-white font-medium text-xl">{food?.carbs || '?'}<Text className="font-extralight text-lg">g</Text></Text>
                <Text className="text-[#10B981] font-extralight text-sm">carbs</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-white font-medium text-xl">{food?.protein || '?'}<Text className="font-extralight text-lg">g</Text></Text>
                <Text className="text-[#10B981] font-extralight text-sm">protein</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-white font-medium text-xl">{food?.fat || '?'}<Text className="font-extralight text-lg">g</Text></Text>
                <Text className="text-[#10B981] font-extralight text-sm">fat</Text>
              </View>
            </View>
          </View>

          {/* Calorie Impact Card */}
          <View className="bg-[#2a2a2a] rounded-xl p-4 mb-6">
            <Text className="text-white font-medium text-lg mb-2">Daily Impact</Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-[#10B981] text-3xl font-bold">{totalCalories}</Text>
                <Text className="text-white text-sm">calories to add</Text>
              </View>
              <View className="items-end">
                <Text className="text-white text-sm">Daily Goal</Text>
                <Text className="text-white text-xl font-medium">2000</Text>
              </View>
            </View>
            
            {/* Progress bar simulation */}
            <View className="mt-4 bg-[#3a3a3a] h-2 rounded-full overflow-hidden">
              <View 
                className="bg-[#10B981] h-full rounded-full" 
                style={{ width: `${Math.min(100, (totalCalories / 2000) * 100)}%` }} 
              />
            </View>
            <Text className="text-white text-xs text-right mt-2">
              {totalCalories} of 2000 calories
            </Text>
          </View>

          {/* Report Button */}
          <Pressable className="items-center mb-10">
            <Text className="text-red-500">Report Food</Text>
          </Pressable>
        </ScrollView>
      </View>

      {renderPopover("meal", mealOptions)}
      {renderPopover("servings", servingOptions)}
      {renderPopover("size", sizeOptions)}
    </View>
  );
}

export default FoodInfo;