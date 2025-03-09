import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'; // Import the hook

const SignUpScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View className="flex-1 bg-[#232323] pt-10 px-4">
      {/* Top Header Row */}
      <View className="flex-row items-center justify-between mb-6">
        {/* Back Arrow */}
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#ceff00" />
        </Pressable>

        {/* "Sign Up" Title in neon color */}
        <Text className="text-xl font-bold" style={{ color: "#CEFF00" }}>
          Sign Up
        </Text>

        {/* Empty placeholder to balance the row */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View className="mx-6 flex-1 justify-center">
        {/* "Full Name" Label + Input */}
        <Text className="text-white mb-2">Username</Text>
        <TextInput
          placeholder="JohnDoe"
          placeholderTextColor="#BBBBBB"
          className="bg-[#6ab547] text-white px-4 py-3 mb-4 rounded-full"
        />

        {/* "Email" Label + Input */}
        <Text className="text-white mb-2">Email</Text>
        <TextInput
          placeholder="example@example.com"
          placeholderTextColor="#BBBBBB"
          className="bg-[#6ab547] text-white px-4 py-3 mb-4 rounded-full"
        />

        {/* "Password" Label + Input */}
        <Text className="text-white mb-2">Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor="#BBBBBB"
          secureTextEntry
          className="bg-[#6ab547] text-white px-4 py-3 mb-4 rounded-full"
        />

        {/* "Confirm Password" Label + Input */}
        <Text className="text-white mb-2">Confirm Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor="#BBBBBB"
          secureTextEntry
          className="bg-[#6ab547] text-white px-4 py-3 rounded-full"
        />

        {/* Sign Up Button */}
        <Pressable className="bg-black border border-white rounded-full py-3 mt-6 mb-6">
          <Text className="text-white text-center font-bold">Sign Up</Text>
        </Pressable>

        {/* or sign up with */}
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-white">or sign up with</Text>
        </View>

        {/* Social Icons Row */}
        <View className="flex-row items-center justify-center space-x-5 gap-3 mb-6">
          <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-[#6ab547]">
            <Ionicons name="logo-google" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-[#6ab547]">
            <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-[#6ab547]">
            <Ionicons name="finger-print" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* Log In Prompt */}
      <View className="flex-row justify-center absolute bottom-11 w-full py-4">
        <Text className="text-white mr-1">Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('(auth)/Sign-in')}>
          <Text className="text-[#CEFF00]">Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;