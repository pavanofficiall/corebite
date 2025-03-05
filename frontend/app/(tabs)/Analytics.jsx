import { View, Text, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Analytics = () => {
  return (
    <ScrollView className="bg-[#232323] h-screen px-6">
      {/* Page Title */}
      <Text className="text-[#ceff00] font-semibold text-3xl mt-9 mb-5">Analytics</Text>

      {/* Graph Section */}
      <View className="rounded-md mb-6">
        <Text className="text-white font-semibold text-lg mb-4">Weekly Progress</Text>
        <LineChart
        className="p-"
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [2, 3, 1.5, 3.2, 4, 3.8, 5], // Example: Hours spent working out
              },
            ],
          }}
          width={screenWidth - 48}
          height={220}
          yAxisSuffix="h"
          chartConfig={{
            backgroundColor: '#3A3A3A',
            backgroundGradientFrom: '#232323',
            backgroundGradientTo: '#3A3A3A',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(206, 255, 0, ${opacity})`, // Greenish theme
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#ceff00' },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Workout Summary */}
      <View className="bg-[#3A3A3A] w-full h-28 rounded-md p-5 mb-5 flex-row items-center">
        <MaterialIcons name="fitness-center" size={28} color="#ceff00" />
        <View className="ml-3">
          <Text className="text-white text-lg font-semibold">Workout Summary</Text>
          <Text className="text-gray-400">5 Sessions | 3 Hours</Text>
        </View>
      </View>

      {/* Calories Burned */}
      <View className="bg-[#3A3A3A] w-full h-28 rounded-md p-5 flex-row items-center">
        <Ionicons name="flame" size={28} color="#ff5733" />
        <View className="ml-3">
          <Text className="text-white text-lg font-semibold">Calories Burned</Text>
          <Text className="text-gray-400">1450 kcal this week</Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default Analytics;
