import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';


export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(workout)/Workout"); // Redirect to signup page
    }, 3000); // Wait 3 seconds before redirecting
  }, []);

  return (
    <View className="flex-1 h-screen justify-center items-center bg-green-500">
      <ActivityIndicator size="large" color="#3498db" />
      <Text className="pt-4 text-white text-5xl font-extrabold">COREBITE</Text>
    </View>
  );
}
