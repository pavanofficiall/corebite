import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import images from '../constants/image';

const Home = () => {
  return (
    <View className="bg-[#232323] h-screen">
      {/* Vertical Scroll */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text className='text-white font-bold text-4xl ml-6 mt-8'>Quick Start</Text>
        {/* Horizontal Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mt-4 "
        >
          <Image
            source={images.OnboardingImg1}
            className="w-96 h-60 ml-6 rounded-3xl border-white border-8 mx-2"
          />
          <Image
            source={images.OnboardingImg2}
            className="w-96 h-60 rounded-3xl border-white border-8 mx-2"
          />
          <Image
            source={images.OnboardingImg3}
            className="w-96 h-60 rounded-3xl border-white border-8 mx-2"
          />
        </ScrollView>

        {/* Rest of the Content */}
        <View className="mb-28 mt-10 mx-6">
          <Text className="text-white text-4xl font-bold capitalize ml-3">
            Discover
          </Text>

          <View className="flex-row flex-wrap justify-between">
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Chest</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Arms</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Legs</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Back</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Chest</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Chest</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Chest</Text>
            </View>
            <View className='flex-col items-center'>
              <Image
                source={images.OnboardingImg1}
                className="w-44 h-40 rounded-3xl m-3"
              />
             <Text  className="text-white font-semibold text-2xl uppercase ">Chest</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
