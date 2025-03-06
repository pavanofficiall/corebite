import { View, Text, ScrollView, Dimensions, useColorScheme } from 'react-native';
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import clsx from 'clsx'; // Import clsx
import { lightTheme, darkTheme } from '../../assets/theme'; // Import themes

const screenWidth = Dimensions.get('window').width;

const Analytics = () => {
  const theme = useColorScheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ScrollView className={clsx(colors.background, "h-screen px-6")}>
      {/* Page Title */}
      <Text className={clsx(colors.accent, "font-semibold text-3xl mt-9 mb-5")}>Analytics</Text>

      {/* Graph Section */}
      <View className={clsx(colors.card, "rounded-md p-3 mb-6")}>
        <Text className={clsx(colors.text, "font-semibold text-lg mb-4")}>Weekly Progress</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: [2, 3, 1.5, 3.2, 4, 3.8, 5] }],
          }}
          width={screenWidth - 62}
          height={220}
          yAxisSuffix="h"
          chartConfig={{
            backgroundColor: "#3A3A3A",
            backgroundGradientFrom: "#232323",
            backgroundGradientTo: "#3a3333",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(206, 255, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: "#ceff00" },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Workout Summary */}
      <View className={clsx(colors.card, "w-full h-28 rounded-md p-5 mb-5 flex-row items-center")}>
        <MaterialIcons name="fitness-center" size={28} color="#ceff00" />
        <View className="ml-3">
          <Text className={clsx(colors.text, "text-lg font-semibold")}>Workout Summary</Text>
          <Text className="text-gray-400">5 Sessions | 3 Hours</Text>
        </View>
      </View>

      {/* Calories Burned */}
      <View className={clsx(colors.card, "w-full h-28 rounded-md p-5 flex-row items-center")}>
        <Ionicons name="flame" size={28} color="#ff5733" />
        <View className="ml-3">
          <Text className={clsx(colors.text, "text-lg font-semibold")}>Calories Burned</Text>
          <Text className="text-gray-400">1450 kcal this week</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Analytics;
