import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
// import { signIn } from "../../../backend/services/authService";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handler for logging in
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // On successful login, navigate to the main app screen
      navigation.navigate('(tabs)/Home');
    } catch (error) {
      // You can improve error handling as needed
      Alert.alert("Login Failed", error.message || "Please try again.");
    }
  };

  

  return (
    <View className="flex-1 bg-black pt-10 px-4">
      {/* Top Header Row */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text className="text-xl font-bold" style={{ color: "#CEFF00" }}>
          Log In
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Username/Email and Password Section */}
      <View className="mx-6 flex-1 justify-center">
        <Text className="text-white mb-2">Username or email</Text>
        <TextInput
          placeholder="example@example.com"
          placeholderTextColor="#BBBBBB"
          className="bg-[#6ab547] text-white px-4 py-3 mb-4 rounded-full"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-white mb-2">Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor="#BBBBBB"
          secureTextEntry
          className="bg-[#6ab547] text-white px-4 py-3 rounded-full"
          value={password}
          onChangeText={setPassword}
        />

        {/* Forgot Password Link */}
        <View className="flex-row justify-end mt-4 mb-6">
          <Pressable>
            <Text className="text-white">Forgot Password?</Text>
          </Pressable>
        </View>

        {/* Log In Button */}
        <Pressable onPress={handleLogin} className="bg-black border border-white rounded-full py-3 mb-6">
          <Text className="text-white text-center font-bold">Log In</Text>
        </Pressable>

        {/* "Or sign up with" Section */}
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

      {/* Sign Up Prompt */}
      <View className="flex-row justify-center absolute bottom-11 w-full py-4">
        <Text className="text-white mr-1">Don’t have an account?</Text>
        <Pressable onPress={() => navigation.navigate('(auth)/Sign-up')}>
          <Text className="text-[#CEFF00]">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;