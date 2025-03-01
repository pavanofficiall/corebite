import React from "react";
import { View, Image,Text,Pressable } from "react-native";
import CustomButton  from "../components/Button";
import { images } from "../constants";
import { useNavigation } from '@react-navigation/native';


const Setup = () => {
     const navigation = useNavigation();
   
  return (
    <View className=' flex flex-col justify-start items-center bg-[#232323] h-screen'>
         <Image
            source={images.OnboardingImg1}
            className="w-full h-1/2 " 
            resizeMode="cover"
          />   

          <View className='flex justify-center items-center '>
          <Text className='text-[#CEFF00] font-semibold text-3xl my-7'> Consistency Is the Key To progress. Don't Give Up!</Text>

<Text className='text-black font-light bg-[#CEFF00] w-auto px-7 py-5 mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur impedit odio ipsum est ipsa obcaecati ratione quaerat quasi magnam tenetur ipsam aperiam modi, veniam voluptate hic suscipit animi doloremque praesentium. </Text>

 <Pressable onPress={() => navigation.navigate('(setup)/Gender')}>
 <CustomButton 
  title="Next" 
  className=" p-4 bg-[#ffffff]/20 border border-[#CEFF00] text-[#CEFF00] font-extrabold rounded-full px-32 mt-10" 
/>
        </Pressable>
          </View>
  </View>
  );
};

export default Setup;

