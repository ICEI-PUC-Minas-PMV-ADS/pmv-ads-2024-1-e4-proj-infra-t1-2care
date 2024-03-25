import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from '../../theme/theme.js'; 

export default function ResponsiveAppBar() {

  return (
    <View> 
      <Text style={{ backgroundColor: theme.palette.back_ground.light}}>nav</Text>
    </View>
  );
}
