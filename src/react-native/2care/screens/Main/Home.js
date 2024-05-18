import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import theme from '../../theme/theme.js';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard.js';
import Specializations from '../../components/specializations.jsx';
import SearchBar from '../../components/SearchBar.jsx';

const ScreenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <View>
        <SearchBar></SearchBar>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Especialidades para as suas necessidades</Text>
        <Specializations></Specializations>
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais próximos</Text>
          <Pressable style={styles.button}>
            <Text style={{color: '#FFFFFF', fontWeight: '200', fontSize: 12}}>Ver mais</Text>
          </Pressable>
        </View>
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
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bem avaliados em sua cidade</Text>
          <Pressable style={styles.button}>
            <Text style={{color: '#FFFFFF', fontWeight: '200', fontSize: 12}}>Ver mais</Text>
          </Pressable>
        </View>
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
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais experientes</Text>
          <Pressable style={styles.button}>
            <Text style={{color: '#FFFFFF', fontWeight: '200', fontSize: 12}}>Ver mais</Text>
          </Pressable>
        </View>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight * 0.28,
    paddingVertical: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'rgba(237,135,51,0.8)',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#333333',
    padding: 16,
  }
});
