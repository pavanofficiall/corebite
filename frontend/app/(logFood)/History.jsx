import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays, addDays } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../assets/theme';

const HistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [history, setHistory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const theme = useColorScheme(); // Detect system theme
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const dailyCalorieGoal = 2000;

  useEffect(() => {
    fetchHistory();
  }, [selectedDate]);

  const fetchHistory = async () => {
    try {
      const storedData = await AsyncStorage.getItem('foodLogs');
      if (storedData) {
        const parsedData = JSON.parse(storedData) || [];
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const filteredData = parsedData.filter(item => item.date?.trim() === formattedDate.trim());
        setHistory(filteredData);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error retrieving history:", error);
    }
  };

  const deleteLog = async () => {
    try {
      const storedData = await AsyncStorage.getItem('foodLogs');
      if (storedData && selectedLog) {
        const parsedData = JSON.parse(storedData);
        const updatedData = parsedData.filter(item =>
          !(
            item.name === selectedLog.name &&
            item.calories === selectedLog.calories &&
            item.time === selectedLog.time &&
            item.date === selectedLog.date
          )
        );

        await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedData));

        // Optional: log deletion
        console.log('Deleted log:', selectedLog);

        setShowDeleteModal(false);
        setSelectedLog(null);
        fetchHistory();
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const consumedCalories = history.reduce((sum, entry) => {
    const cal = parseInt(entry.calories);
    return sum + (isNaN(cal) ? 0 : cal);
  }, 0);

  const remainingCalories = dailyCalorieGoal - consumedCalories;

  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));

  return (
    <View className="dark:bg-[#232323] flex-1 p-4">
      {/* Header */}
      <View className="bg-emerald-500 py-5 px-4 rounded-t-xl">
        <Text className="text-white text-xl font-bold ">Diet History</Text>
      </View>
      
      {/* Date Navigation */}
      <View className="flex-row items-center justify-between px-4 py-3 dark:bg-[#232323] border-b border-gray-200">
        <TouchableOpacity onPress={goToPreviousDay} className="p-2">
          <Ionicons name="chevron-back" size={24} color="gray" />
        </TouchableOpacity>
        <Text className={`${colors.text} font-semibold text-lg`}>
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </Text>
        <TouchableOpacity onPress={goToNextDay} className="p-2">
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View className="bg-white mx-4 my-3 rounded-xl shadow-lg dark:shadow-white dark:bg-[#232323] dark:shadow-sm overflow-hidden">
        <View className="p-4 border-b border-gray-100">
          <Text className="text-gray-500 dark:text-gray-200 font-medium text-sm">Daily Summary</Text>
        </View>

        <View className="flex-row justify-between p-4">
          <View className="items-center flex-1">
            <Text className="text-gray-500 text-sm">Goal</Text>
            <Text className="text-gray-800 dark:text-gray-200 text-xl font-bold">{dailyCalorieGoal}</Text>
            <Text className="text-gray-500 text-xs">calories</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-gray-500 text-sm">Consumed</Text>
            <Text className="text-gray-800 dark:text-gray-200 text-xl font-bold">{consumedCalories}</Text>
            <Text className="text-gray-500 text-xs">calories</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-gray-500 text-sm">Remaining</Text>
            <Text className={`text-xl font-bold ${remainingCalories >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {remainingCalories}
            </Text>
            <Text className="text-gray-500 text-xs">calories</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="px-4 pb-4">
          <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <View 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min(100, (consumedCalories / dailyCalorieGoal) * 100)}%` }}
            />
          </View>
          <Text className="text-xs text-gray-500 text-right mt-1">
            {Math.round((consumedCalories / dailyCalorieGoal) * 100)}% of daily goal
          </Text>
        </View>
      </View>

      {/* Food Logs */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListHeaderComponent={
          <Text className={`${colors.text} font-semibold text-lg mt-4 mb-2`}>Food Log</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => {
              setSelectedLog(item);
              setShowDeleteModal(true);
            }}
          >
            <View className="bg-white dark:bg-[#232323] dark:shadow-white rounded-xl shadow-sm overflow-hidden mb-3 p-4 ">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    {item.mealType && <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />}
                    <Text className="text-xs text-emerald-600 font-medium">{item.mealType || "Logged Food"}</Text>
                  </View>
                  <Text className={`${colors.text} font-medium`}>{item.name || "Unknown Food"}</Text>
                </View>
                <View className="items-end">
                  {item.time ? <Text className={`${colors.text} text-xs`}>{item.time}</Text> : null}
                  <Text className={`${colors.text} font-bold mt-1`}>{item.calories} cal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className={`${colors.subText} text-center mt-4`}>No food logged on this date.</Text>
        }
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-[#3a3a3a] p-6 rounded-xl shadow-xl w-11/12">
            <Text className=" dark:text-white text-lg font-semibold mb-2">Delete Log</Text>
            <Text className="text-gray-600 dark:text-gray-200 mb-4">Are you sure you want to delete this food entry?</Text>
            <View className="flex-row items-center justify-end gap-4 space-x-4">
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text className="text-gray-500 dark:text-gray-200">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteLog}>
                <Text className="text-white font-semibold bg-red-500 px-3 py-2 rounded-lg">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryScreen;
