import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#f4f4f4',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 1,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#007AFF',
  },
};

const WeightCard = () => {
  const [weight, setWeight] = useState('');
  const [weightsByWeek, setWeightsByWeek] = useState({});

  const getCurrentWeekKey = () => {
    const today = new Date();
    return format(today, "yyyy-'W'II");
  };

  const loadData = async () => {
    const stored = await AsyncStorage.getItem('weeklyWeights');
    if (stored) {
      setWeightsByWeek(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    const weekKey = getCurrentWeekKey();

    if (weightsByWeek[weekKey]) {
      Alert.alert('Already Entered', `You already saved weight for ${weekKey}.`);
      return;
    }

    const updated = {
      ...weightsByWeek,
      [weekKey]: parseFloat(weight),
    };

    try {
      await AsyncStorage.setItem('weeklyWeights', JSON.stringify(updated));
      setWeightsByWeek(updated);
      setWeight('');
      Alert.alert('Saved!', `Weight for ${weekKey} saved successfully.`);
    } catch (err) {
      Alert.alert('Error', 'Failed to save weight.');
    }
  };

  const sortedWeeks = Object.keys(weightsByWeek).sort();
  const weightValues = sortedWeeks.map((week) => weightsByWeek[week]);

  return (
    <ScrollView className="bg-white rounded-2xl shadow p-4 mt-4">
      <Text className="text-lg font-semibold mb-2">Enter your weight this week</Text>
      <TextInput
        className="border border-gray-300 rounded-xl p-2 mb-3"
        keyboardType="numeric"
        placeholder="e.g. 81.5"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Save Weight" onPress={handleSave} />

      {sortedWeeks.length > 0 && (
        <>
          <Text className="text-xl font-semibold mt-6 mb-2">📅 Weekly History</Text>
          {sortedWeeks.map((week) => (
            <View key={week} className="flex-row justify-between mb-1">
              <Text className="text-gray-600">{week}</Text>
              <Text className="font-semibold">{weightsByWeek[week]} kg</Text>
            </View>
          ))}

          <Text className="text-xl font-semibold mt-6 mb-2">📈 Weight Chart</Text>
          <LineChart
            data={{
              labels: sortedWeeks,
              datasets: [{ data: weightValues }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </>
      )}
    </ScrollView>
  );
};

export default WeightCard;
