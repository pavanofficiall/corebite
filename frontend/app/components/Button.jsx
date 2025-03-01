import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ 
  title = "Click Me", 
  onPress, 
  className = "", 
}) => {
  return (
      <Text className={` text-lg font-bold text-center ${className}`}>
        {title}
      </Text>

  );
};

export default CustomButton;
