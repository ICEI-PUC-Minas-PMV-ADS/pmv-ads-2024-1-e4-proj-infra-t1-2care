import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
} from 'react-native';
import theme from '../../theme/theme.js'; 


export default function Home({ navigation }) {
  return (
    <View> 
        <Text style={{ backgroundColor: theme.palette.back_ground.light}}>Home 2 Care</Text>
    </View>
  )
}