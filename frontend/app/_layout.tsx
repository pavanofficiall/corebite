import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font'
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
      "FunnelDisplay-Bold": require("../assets/fonts/FunnelDisplay-Bold.ttf"),
      "FunnelDisplay-ExtraBold": require("../assets/fonts/FunnelDisplay-ExtraBold.ttf"),
      "FunnelDisplay-Light": require("../assets/fonts/FunnelDisplay-Light.ttf"),
      "FunnelDisplay-Medium": require("../assets/fonts/FunnelDisplay-Medium.ttf"),
      "FunnelDisplay-Regular": require("../assets/fonts/FunnelDisplay-Regular.ttf"),
      "FunnelDisplay-SemiBold": require("../assets/fonts/FunnelDisplay-SemiBold.ttf"),
      "FunnelDisplay-VariableFont_wght": require("../assets/fonts/FunnelDisplay-VariableFont_wght.ttf")
  });

  useEffect(() => {
      if(error) throw error;
      if(fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])
    
    if(!fontsLoaded && !error) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="(setup)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" /> */}
    </Stack>
  );
}
// app.fitness.corebite