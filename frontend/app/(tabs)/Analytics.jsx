import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

const Analytics = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'all'
  const colorScheme = useColorScheme();
  
  // Food icons mapping - in a real app, you might want to use actual food images
  const foodIcons = {
    default: "restaurant-outline",
    fruit: "nutrition-outline",
    vegetable: "leaf-outline",
    meat: "fast-food-outline",
    drink: "cafe-outline",
    snack: "ice-cream-outline"
  };
  
  // Function to determine icon based on food name (simplified example)
  const getFoodIcon = (foodName) => {
    const name = foodName.toLowerCase();
    if (name.includes('apple') || name.includes('banana') || name.includes('fruit')) return foodIcons.fruit;
    if (name.includes('salad') || name.includes('vegetable')) return foodIcons.vegetable;
    if (name.includes('chicken') || name.includes('beef') || name.includes('meat')) return foodIcons.meat;
    if (name.includes('coffee') || name.includes('tea') || name.includes('juice')) return foodIcons.drink;
    if (name.includes('cookie') || name.includes('chip') || name.includes('snack')) return foodIcons.snack;
    return foodIcons.default;
  };

  useEffect(() => {
    fetchTopFoods();
  }, [timeRange]);

  const fetchTopFoods = async () => {
    setLoading(true);
    try {
      const logsString = await AsyncStorage.getItem('foodLogs');
      const logs = logsString ? JSON.parse(logsString) : [];
      
      // Filter logs based on selected time range
      const today = new Date();
      let filteredLogs = logs;
      
      if (timeRange === 'week') {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredLogs = logs.filter(log => new Date(log.date) >= oneWeekAgo);
      } else if (timeRange === 'month') {
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filteredLogs = logs.filter(log => new Date(log.date) >= oneMonthAgo);
      }
      
      // Count food frequency
      const frequencyMap = {};
      for (const food of filteredLogs) {
        const name = food.name;
        if (frequencyMap[name]) {
          frequencyMap[name].count += 1;
        } else {
          frequencyMap[name] = { name, count: 1 };
        }
      }
      
      // Sort and get top 5
      const sortedFoods = Object.values(frequencyMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      setTopFoods(sortedFoods);
    } catch (err) {
      console.error('Error fetching top foods:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Find the highest count for relative bar sizing
  const maxCount = topFoods.length > 0 
    ? Math.max(...topFoods.map(food => food.count)) 
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#232323]">
      {/* Header */}
      <View className="px-6 pt-12 pb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-900 dark:text-[#10b981] font-bold text-xl">Food Analytics</Text>
          <TouchableOpacity>
            <Ionicons 
              name="calendar-outline" 
              size={24} 
              color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Time Range Selector */}
      <View className="px-6 mb-4">
        <View className="flex-row bg-gray-200 dark:bg-[#2a2a2a] rounded-full p-1">
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${
              timeRange === 'week' 
                ? 'bg-white dark:bg-[#3a3a3a]' 
                : 'bg-transparent'
            }`}
            onPress={() => setTimeRange('week')}
          >
            <Text 
              className={`text-center font-medium ${
                timeRange === 'week'
                  ? 'text-emerald-600 dark:text-[#10b981]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Week
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${
              timeRange === 'month' 
                ? 'bg-white dark:bg-[#3a3a3a]' 
                : 'bg-transparent'
            }`}
            onPress={() => setTimeRange('month')}
          >
            <Text 
              className={`text-center font-medium ${
                timeRange === 'month'
                  ? 'text-emerald-600 dark:text-[#10b981]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Month
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${
              timeRange === 'all' 
                ? 'bg-white dark:bg-[#3a3a3a]' 
                : 'bg-transparent'
            }`}
            onPress={() => setTimeRange('all')}
          >
            <Text 
              className={`text-center font-medium ${
                timeRange === 'all'
                  ? 'text-emerald-600 dark:text-[#10b981]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              All Time
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Top Foods Section */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 dark:text-white font-semibold text-lg">
            Most Frequently Logged Foods
          </Text>
          <TouchableOpacity onPress={fetchTopFoods}>
            <Ionicons 
              name="refresh" 
              size={20} 
              color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
            />
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator 
              size="large" 
              color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
            />
            <Text className="text-gray-500 dark:text-gray-400 mt-3">
              Analyzing your food logs...
            </Text>
          </View>
        ) : topFoods.length === 0 ? (
          <View className="bg-white dark:bg-[#2a2a2a] rounded-xl p-6 items-center">
            <Ionicons 
              name="nutrition-outline" 
              size={60} 
              color={colorScheme === 'dark' ? '#3a3a3a' : '#d1d5db'} 
            />
            <Text className="text-gray-800 dark:text-white font-medium text-lg mt-4">
              No Food Logs Found
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
              Start logging your meals to see your most frequently eaten foods here.
            </Text>
            <TouchableOpacity 
              className="mt-4 bg-emerald-500 dark:bg-[#10b981] px-6 py-3 rounded-full"
              onPress={() => {/* Navigate to food logging */}}
            >
              <Text className="text-white dark:text-[#232323] font-medium">
                Log a Meal
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={topFoods}
            keyExtractor={(item, index) => item.name + index}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              // Calculate percentage width for the bar
              const percentage = (item.count / maxCount) * 100;
              
              return (
                <View className="bg-white dark:bg-[#2a2a2a] rounded-xl mb-3 overflow-hidden">
                  <View className="flex-row items-center p-4">
                    <View className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mr-3">
                      <Ionicons 
                        name={getFoodIcon(item.name)} 
                        size={20} 
                        color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
                      />
                    </View>
                    
                    <View className="flex-1">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-gray-800 dark:text-white font-medium text-base">
                          {item.name}
                        </Text>
                        <View className="bg-emerald-100 dark:bg-[#3a3a3a] px-2 py-1 rounded-full">
                          <Text className="text-emerald-600 dark:text-[#10b981] font-bold">
                            {item.count}×
                          </Text>
                        </View>
                      </View>
                      
                      <View className="mt-2 h-2 bg-gray-200 dark:bg-[#3a3a3a] rounded-full overflow-hidden">
                        <View 
                          className="h-full bg-emerald-500 dark:bg-[#10b981] rounded-full" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      
      {/* Additional Analytics Card */}
      {topFoods.length > 0 && (
        <View className="px-6">
          <View className="bg-white dark:bg-[#2a2a2a] rounded-xl p-5">
            <Text className="text-gray-800 dark:text-white font-semibold text-lg mb-3">
              Food Logging Insights
            </Text>
            
            <View className="flex-row items-start mb-3">
              <View className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mr-3">
                <MaterialIcons 
                  name="insights" 
                  size={18} 
                  color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 dark:text-white font-medium">
                  Consistency
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  You've been consistent with logging your top foods.
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mr-3">
                <MaterialIcons 
                  name="recommend" 
                  size={18} 
                  color={colorScheme === 'dark' ? '#10b981' : '#10b981'} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 dark:text-white font-medium">
                  Recommendation
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Try adding more variety to your diet for better nutrition.
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Analytics;