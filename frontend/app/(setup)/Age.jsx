import React from "react";
import { useState, useRef } from "react";
import { View, Text, Pressable, Button, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'; 
import CustomButton  from "../components/Button";
import { useWindowDimensions } from "react-native";

const Age  = ({ onValueChange = () => {} }) => {
        const navigation = useNavigation();
        const ages = Array.from({ length: 69 }, (_, i) => 12 + i); // [12, 13, ..., 80]
  const [selectedIndex, setSelectedIndex] = useState(ages.indexOf(28)); // Default: 28
  const flatListRef = useRef(null);
  const { width } = useWindowDimensions();

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 50); // Adjust to item width
    if (ages[index] !== undefined) {
      setSelectedIndex(index);
      onValueChange(ages[index]);
    }
  };
    
return(
    <View className='bg-[#232323] h-screen'>
        <View className=" mx-7 ">
            <Pressable onPress={() => navigation.goBack()}
                className="flex-row my-7"
                >
                <Ionicons name="chevron-back" size={24} color="#CEFF00" />
            <Text className="text-xl font-bold" style={{ color: "#CEFF00" }}>
                Back
            </Text>
            </Pressable>
    <View className="flex-col justify-center items-center"> 
        <Text className="text-[#CEFF00] font-semibold text-3xl my-7">
            Choose Your Age
        </Text>
    </View>
 </View>

    {/* roller */}
    <View className="flex items-center mt-60">
      {/* Selected Age */}
      <Text className="text-white text-4xl font-bold mb-3">{ages[selectedIndex]}</Text>

      {/* Indicator Arrow */}
      <View className="w-full items-center">
        <Text className="text-[#CEFF00] text-lg">▲</Text>
      </View>

      {/* Scrollable Age List */}
      <FlatList
        ref={flatListRef}
        data={ages}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: width * 0.44 }}
        renderItem={({ item, index }) => (
          <View className="w-[50px] items-center">
            <Text className={`text-2xl font-semibold ${
              index === selectedIndex ? "text-white" : "text-gray-400"
            }`}>
              {item}
            </Text>
          </View>
        )}
      />
    </View>

 {/* button */}
 <View className="absolute bottom-8 w-full mb-10 px-20">
        <Pressable onPress={() => navigation.navigate('(setup)/Weight')}>
            <CustomButton 
                title="Next" 
                className="p-4 bg-[#ffffff]/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-20 mt-9"/>
        </Pressable>
    </View>
</View>
);
}
export default Age;