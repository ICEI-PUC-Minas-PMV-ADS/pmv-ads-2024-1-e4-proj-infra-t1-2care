import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import theme from '../../theme/theme.js';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard.js';

const ScreenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  return (
    <View>
      <Text style={{ backgroundColor: theme.palette.back_ground.light }}>Main Page</Text>
      <View style={styles.container}>
        <h2>Cuidadores mais próximos</h2>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            <CaregiverCard></CaregiverCard>
            <CaregiverCard></CaregiverCard>
            <CaregiverCard></CaregiverCard>
            <CaregiverCard></CaregiverCard>
            <CaregiverCard></CaregiverCard>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight * 0.3, // Define a altura como 30% da altura da tela
    // backgroundColor: '#F6F6F6',
    paddingVertical: 10,
  },
  scrollViewContent: {
    alignItems: 'center', // Centraliza os itens horizontalmente na ScrollView
  },
  itemContainer: {
    flexDirection: 'row', // Alinha os itens na horizontal
    paddingHorizontal: 10, // Espaçamento horizontal entre os itens
  },
});
