import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import ResponsiveAppBar from '../../components/layout/ResponsiveAppBar.js';

export default function Profile({ navigation }) {
  return (
    <View> 
        <Text style={{ backgroundColor: theme.palette.back_ground.light}}>Perfil</Text>
    </View>
  )
};