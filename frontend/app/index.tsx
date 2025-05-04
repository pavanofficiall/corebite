import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';


export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/Home"); 
    }, 1000); // Wait 3 seconds before redirecting
  }, []);

  return (
    <View className="flex-1 h-screen justify-center items-center bg-emerald-500">
      <ActivityIndicator size="large" color="#fff" />
      <Text className="pt-4 text-white text-5xl font-extrabold">COREBITE</Text>
    </View>
  );
}
