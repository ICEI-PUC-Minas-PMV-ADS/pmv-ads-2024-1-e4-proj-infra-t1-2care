import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import theme from '../../theme/theme.js';
import Specializations from '../../components/specializations.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard.js';
import CaregiverList from '../../components/CaregiverCard/CaregiverList.js';
import { getAverageRating } from '../../services/filterCaregiver.js';
import { useNavigation } from "@react-navigation/native";
import { CaregiversContext } from "../../contexts/CaregiversContext.js";
import { useAuth } from '../../contexts/AuthContext';

const ScreenHeight = Dimensions.get('window').height;

export default function Home() {

  const navigation = useNavigation();

  const { list, loadCaregiverList } = useContext(CaregiversContext);
  const [caregiverList, setCaregiverList] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    loadCaregiverList();
    setCaregiverList(list);
}, [list, user]);


  return (
    <ScrollView>
      <View>
        <SearchBar></SearchBar>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Especialidades para as suas necessidades</Text>
        <Specializations></Specializations>
      </View>
      {
        user
          ?
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mais próximos</Text>
              {/* <Pressable style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontWeight: '200', fontSize: 12 }}>Ver mais</Text>
              </Pressable> */}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.itemContainer}>
              {([...caregiverList].sort((a, b) => a.distance - b.distance)).map((caregiver) => <CaregiverCard key={`${caregiver._id}`} caregiver={caregiver}></CaregiverCard>)}
              </View>
            </ScrollView>
          </View>
          :
          <></>
      }
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bem avaliados</Text>
          {/* <Pressable style={styles.button}>
            <Text style={{ color: '#FFFFFF', fontWeight: '200', fontSize: 12 }}>Ver mais</Text>
          </Pressable> */}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            {([...caregiverList].sort((a, b) => getAverageRating(b.evaluations) - getAverageRating(a.evaluations))).map((caregiver) => <CaregiverCard key={`${caregiver._id}`} caregiver={caregiver}></CaregiverCard>)}
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais experientes</Text>
          {/* <Pressable style={styles.button}>
            <Text style={{ color: '#FFFFFF', fontWeight: '200', fontSize: 12 }}>Ver mais</Text>
          </Pressable> */}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
          {([...caregiverList].sort((a, b) => b.career_time - a.career_time)).map((caregiver) => <CaregiverCard key={`${caregiver._id}`} caregiver={caregiver}></CaregiverCard>)}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: ScreenHeight * 0.28,
    paddingVertical: 5,
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
