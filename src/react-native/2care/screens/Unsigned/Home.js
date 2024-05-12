import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import ResponsiveAppBar from '../../components/layout/ResponsiveAppBar.js';

export default function Home({ navigation }) {
  return (
    <View> 
        <ResponsiveAppBar/>
        <Text style={{ backgroundColor: theme.palette.back_ground.light}}>2 Care</Text>
    </View>
  )
}