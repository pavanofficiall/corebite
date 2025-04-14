import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays, addDays } from 'date-fns';

const HistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, [selectedDate]);

  const fetchHistory = async () => {
    try {
      const storedData = await AsyncStorage.getItem('foodLogs');
      console.log("Raw Stored Data:", storedData);
  
      if (storedData) {
        const parsedData = JSON.parse(storedData);
console.log("Parsed Data:", parsedData); // 👀 Check this structure

        const formattedDate = format(selectedDate, 'yyyy-MM-dd');  
        const filteredData = parsedData.filter(
          item => item.date && item.date.trim() === formattedDate.trim()
        );
        
        console.log("Formatted Date for Filtering:", formattedDate);
        console.log("Checking Against:", parsedData.map(item => item.date));
    
        console.log("Filtered Data:", filteredData);
  
        setHistory(filteredData);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error retrieving history:", error);
    }
  };
  

  return (
    <View style={{ padding: 20 }}>
      {/* Date Picker Navigation */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title="Previous" onPress={() => setSelectedDate(subDays(selectedDate, 1))} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{format(selectedDate, 'yyyy-MM-dd')}</Text>
        <Button title="Next" onPress={() => setSelectedDate(addDays(selectedDate, 1))} />
      </View>

      {/* Display Logged Food */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
<Text>{item.name || "Unknown Food"}</Text>
</View>
        )}
        ListEmptyComponent={<Text>No food logged on this date.</Text>}
      />
    </View>
  );
};

export default HistoryScreen;
