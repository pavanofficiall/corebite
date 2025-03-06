import React from "react";
import { Button, Pressable, Text, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import FastImage from 'react-native-fast-image';

const Workout = () => {
  return (
    <View className="flex-1 justify-end bg-gray-200">
      <View className="flex-row items-center justify-between mb-6 mx-6 my-4">
        <Ionicons name="caret-back-outline" size={26} color="black" />
        <FontAwesome5 name="volume-mute" size={26} color="black" />
        {/* <FontAwesome5 name="volume-up" size={26} color="black" /> */}
      </View>

      <View className="mx-6 my-6 bg-white h-2/4 rounded-2xl flex items-center">
        <View className="h-full">
          <Image
            source={require("../../assets/images/workout/push-up.gif")}
            className="w-[350px] h-[422px] rounded-3xl"
          />
        </View>
        <View className="flex flex-row items-center mt-2 gap-x-72">
          <AntDesign
            name="like1"
            size={20}
            color="white"
            className="bg-black/25 p-2 rounded-full"
          />
          <AntDesign
            name="dislike1"
            size={20}
            color="white"
            className="bg-black/25 p-2 rounded-full"
          />
        </View>
      </View>

      <View className="w-full h-96 rounded-3xl flex flex-col justify-start items-center">
        <View className="flex flex-row items-center my-4">
          <Text className="text-4xl font-semibold px-1 py-3 uppercase">
            Pushups
          </Text>
          <AntDesign name="questioncircleo" size={20} color="gray" />
        </View>

        <Text className="font-bold text-6xl my-8">16×</Text>

        <Pressable className="bottom-0 bg-[#02c218] border border-white rounded-full py-3 px-36">
          <Text className="text-3xl text-white uppercase">Done</Text>
        </Pressable>

        <View className="flex-1 flex-row justify-between bottom-0 mt-5 items-center">
          {/* Previous Button */}
          <Pressable className="flex flex-row items-center mb-2 py-4 px-14">
            <Ionicons name="play-skip-back-outline" size={20} color="black" />
            <Text className="text-xl text-gray-500 uppercase px-1 font-semibold">
              Previous
            </Text>
          </Pressable>

          {/* Next Button */}
          <Pressable className="flex flex-row items-center mb-2 py-4 px-14">
            <Text className="text-xl text-gray-500 uppercase px-1 font-semibold">
              Next
            </Text>
            <Ionicons
              name="play-skip-forward-outline"
              size={20}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Workout;
