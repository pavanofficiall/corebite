import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import images from '../constants/image';

const Home = () => {
  return (
    <View className="bg-[#232323] h-screen">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" mt-10 h-96">
        <Image
          source={images.OnboardingImg1}
          className="w-96 h-60 rounded-3xl border-white border-8 mx-2"
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
    </View>
  );
};

export default Home;
