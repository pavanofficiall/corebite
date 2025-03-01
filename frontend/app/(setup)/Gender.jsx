import React from "react";
import { View, Text, Pressable, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'; 
import CustomButton  from "../components/Button";


const Gender = () => {
    const navigation = useNavigation();
  
  return (
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
        <View style={{ width: 24 }} />
    <View className="flex-col justify-center items-center"> 
      <Text className="text-[#CEFF00] font-semibold text-3xl my-7">
        Choose Your Gender
      </Text>
      
      <View className="flex-col items-center justify-between gap-9">
    <View className="flex-col items-center justify-center gap-4">
      <View  className='bg-orange-700 rounded-full size-60 items-center justify-center'>
      <Ionicons name="male" size={130} color="#CEFF00"/>
      </View>
      <Text className="text-3xl text-[#CEFF00] font-semibold uppercase">male </Text>
     </View>
    <View className="flex-col items-center justify-center gap-4">
      <View  className='bg-orange-700 rounded-full size-60 items-center justify-center'>
      <Ionicons name="female" size={130} color="#CEFF00"/>
      </View>
      <Text className="text-3xl text-[#CEFF00] font-semibold uppercase">Female</Text>
     </View>
     </View>
    
    <Pressable onPress={() => navigation.navigate('(setup)/Age')}>
    <CustomButton 
      title="Next" 
      className=" p-4 bg-[#ffffff]/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-32 mt-9"/>
    </Pressable>
   </View>
   </View>
      </View>
  );
}

export default Gender;