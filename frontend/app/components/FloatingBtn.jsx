
import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FloatingBtn = () => {
    const navigation = useNavigation();
  return (
    <View>
  {/* Floating Button */}
  <TouchableOpacity onPress={() => (navigation.navigate('(logFood)/LogFood'))} className="absolute bottom-[138px] right-5 bg-[#10B981] p-3 rounded-full shadow-lg">
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default FloatingBtn