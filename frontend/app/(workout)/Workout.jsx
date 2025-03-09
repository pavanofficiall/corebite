import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Button";
// import FastImage from 'react-native-fast-image';

const Workout = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-end bg-[#232323]">
      <View className="flex-row items-center justify-between mx-6 mt-4">
        <Pressable  onPress={() => navigation.goBack()} >
        <Ionicons name="chevron-back" size={26} color="#ceff00"  className='bg-black/50 p-1.5 rounded-full'/>
        </Pressable>
        <FontAwesome5 name="volume-mute" size={22} color="#ceff00" className='bg-black/50 p-2 rounded-full' />
        {/* <FontAwesome5 name="volume-up" size={26} color="black" /> */}
      </View>

      <View className="mx-6 my-6 bg-white h-2/4 rounded-2xl flex items-center relative">
  <View className="h-full relative">
    <Image
      source={require("../../assets/images/workout/push-up.gif")}
      className="w-[350px] h-[422px] rounded-3xl"
    />
    {/* Icons positioned at the bottom of the image */}
    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-x-64">
      <AntDesign
        name="like1"
        size={20}
        color="white"
        className="bg-black/25 p-3 rounded-full"
      />
      <AntDesign
        name="dislike1"
        size={20}
        color="white"
        className="bg-black/25 p-3 rounded-full"
      />
    </View>
  </View>
</View>


      <View className="w-full h-96 rounded-3xl flex flex-col justify-start items-center">
        <View className="flex flex-row items-center my-4">
          <Text className="text-4xl font-semibold px-1 py-3 uppercase text-white">
            Pushups
          </Text>
          <AntDesign name="questioncircleo" size={20} color="#ceff00" />
        </View>

        <Text className="font-bold text-6xl my-8 text-white">16×</Text>

        <Pressable className="bottom-0 border border-[#ceff00] rounded-full py-3 px-28">
          <CustomButton
          title="Done"
          className="text-3xl text-[#ceff00] uppercase"/>
        </Pressable>

        <View className="flex-1 flex-row justify-between bottom-0 mt-9 items-center bg-[#3a3a3a] rounded-2xl">
          {/* Previous Button */}
          <Pressable className="flex flex-row items-center mb-2 py-4 px-12 border-r">
            <Ionicons name="play-skip-back-outline" size={20} color="#ceff00" />
            <Text className="text-xl text-gray-500 uppercase px-1 font-semibold">
              Previous
            </Text>
          </Pressable>

          {/* Next Button */}
          <Pressable className="flex flex-row items-center mb-2 py-4 px-16" 
          onPress={() => navigation.navigate('(workout)/Switch')}
          >
            <Text className="text-xl text-gray-500 uppercase px-1 font-semibold">
              Next
            </Text>
            <Ionicons
              name="play-skip-forward-outline"
              size={20}
              color="#ceff00"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Workout;
