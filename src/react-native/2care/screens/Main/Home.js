import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import ResponsiveAppBar from '../../components/layout/ResponsiveAppBar.js';
import BottomBar from '../../components/BottomBar/BottomBar.js';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard.js';


export default function Home({ navigation }) {
  return (
    <View> 
        <Text style={{ backgroundColor: theme.palette.back_ground.light}}>Main Page</Text>
        <CaregiverCard></CaregiverCard>
        <CaregiverCard></CaregiverCard>
        <CaregiverCard></CaregiverCard>
        <CaregiverCard></CaregiverCard>
        <CaregiverCard></CaregiverCard>
    </View>
  )
}