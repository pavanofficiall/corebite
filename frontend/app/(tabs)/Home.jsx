import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import images from '../constants/image';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../assets/theme'; // Import themes
// import Carosel from '../components/Carosel';
import Ionicons from '@expo/vector-icons/Ionicons';


const Home = () => {
  const navigation = useNavigation();
  const theme = useColorScheme(); // Detect system theme
  const colors = theme === 'dark' ? darkTheme : lightTheme; // Apply theme

  return (
    <View className={`${colors.background} h-screen`}>
      {/* Vertical Scroll */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className={`${colors.text} text-4xl ml-6 mt-6 font-bold`}>Quick Start</Text>

        {/* Horizontal Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mt-4"
        >
          <Image
            source={images.OnboardingImg1}
            className="w-96 h-60 ml-6 rounded-3xl border-8 mx-1.5"
            style={{ borderColor: colors.card }}
          />
          <Image
            source={images.img1}
            className="w-96 h-60 rounded-3xl border-8 mx-1.5"
            style={{ borderColor: colors.card }}
          />
          <Image
            source={images.OnboardingImg3}
            className="w-96 h-60 rounded-3xl border-8 mx-1.5"
            style={{ borderColor: colors.card }}
          />
        </ScrollView>
        

        {/* Rest of the Content */}
        <View className="mb-36 mt-10 mx-6">
          <Text className={`${colors.text} text-4xl font-bold capitalize ml-3`}>
            Discover
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {/* Chest */}
            <Pressable onPress={() => navigation.navigate('(workout)/Exercises')}>
              <View className="flex-col items-center">
                <Image source={images.OnboardingImg3} className="w-44 h-40 rounded-3xl m-3" />
                <Text className={`${colors.text} font-semibold text-2xl uppercase`}>Chest</Text>
              </View>
            </Pressable>

            {/* Back */}
            <Pressable onPress={() => navigation.navigate('(auth)/Sign-in')}>
              <View className="flex-col items-center">
                <Image source={images.back} className="w-44 h-40 rounded-3xl m-3" />
                <Text className={`${colors.text} font-semibold text-2xl uppercase`}>Back</Text>
              </View>
            </Pressable>

            {/* Leg */}
            <Pressable onPress={() => navigation.navigate('(auth)/Sign-in')}>
              <View className="flex-col items-center">
                <Image source={images.OnboardingImg1} className="w-44 h-40 rounded-3xl m-3" />
                <Text className={`${colors.text} font-semibold text-2xl uppercase`}>Leg</Text>
              </View>
            </Pressable>

            {/* Arm */}
            <Pressable onPress={() => navigation.navigate('(auth)/Sign-in')}>
              <View className="flex-col items-center">
                <Image source={images.arm} className="w-44 h-40 rounded-3xl m-3" />
                <Text className={`${colors.text} font-semibold text-2xl uppercase`}>Arm</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity onPress={() => (navigation.navigate('(logFood)/LogFood'))} className="absolute bottom-[138px] right-5 bg-[#ceff00] p-3 rounded-full shadow-lg">
        <Ionicons name="add" size={30} color="#232323" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
