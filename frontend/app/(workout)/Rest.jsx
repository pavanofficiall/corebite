// Rest.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Pressable } from "react-native";
import CustomButton from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { MotiText } from "moti";
import Ionicons from "@expo/vector-icons/Ionicons";

function Rest() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get nextIndex and the full exercise list from params
  const { nextIndex, exercises } = route.params;
  const nextExercise = exercises[nextIndex];

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30); // Rest timer starts at 0:30
  const [isActive, setIsActive] = useState(false);

  // Start timer when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, [])
  );

  useEffect(() => {
    if (!isActive) return;
    if (minutes === 0 && seconds === 0) {
      // Timer finished: navigate to next workout
      navigation.navigate("(workout)/Workout", {
        exerciseIndex: nextIndex,
        exercises,
      });
      return;
    }
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, isActive, navigation, nextIndex, exercises]);

  const addTime = () => {
    let totalSeconds = minutes * 60 + seconds + 20;
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
  };

  if (!nextExercise) {
    navigation.navigate("(workout)/Finished");
    return null;
  }
  

  return (
    <View className="bg-[#232323] h-screen">
      <View className="overflow-hidden relative">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute top-4 left-4 bg-[#232323]/50 p-2 rounded-full z-20"
        >
          <Ionicons name="chevron-back" size={24} color="#ceff00" />
        </Pressable>
        <Image
          source={nextExercise.image}
          className="w-full h-96 rounded-b-2xl"
        />
        <LinearGradient
          colors={["transparent", "#232323"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          className="flex justify-end pb-12 space-y-8 absolute bottom-0 w-full h-1/3 rounded-b-2xl"
        >
          <View className="flex flex-row items-center justify-between mx-6">
            <Text className="text-[#ceff00] text-4xl font-bold capitalize">
              {nextExercise.name}
            </Text>
            <Text className="text-[#ceff00] text-5xl font-extrabold">
              {nextExercise.reps}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="mx-6 flex flex-col items-center justify-center mt-5">
        <Text className="text-[#ceff00] text-3xl font-semibold">Take Rest</Text>

        {/* Animated Timer Display */}
        <View className="mt-40 gap-2 justify-center flex flex-col items-center border bg-[#3a3a3a] border-[#ceff00] rounded-3xl p-5 pb-2">
          <MotiText
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            key={`${minutes}:${seconds}`}
            className="text-[#ceff00] text-6xl font-light"
          >
            {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </MotiText>
        </View>

        <View className="flex flex-row items-center justify-between gap-8 mt-[128px]">
          <Pressable onPress={addTime}>
            <CustomButton
              title={"+20s"}
              className="text-[#232323] text-3xl bg-[#ceff00] px-[59px] py-4 rounded-full"
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("(workout)/Workout", {
                exerciseIndex: nextIndex,
                exercises,
              })
            }
          >
            <CustomButton
              title={"Skip"}
              className="text-[#ceff00] border border-[#ceff00] px-[59px] py-4 rounded-full"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Rest;
