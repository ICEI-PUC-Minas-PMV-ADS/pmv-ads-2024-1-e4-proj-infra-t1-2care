import React, { useState, useEffect } from "react";

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
import CaregiverList from '../../components/CaregiverCard/CaregiverList.js';
import { getCaregiverList } from '../../services/filterCaregiver.js';
import { useNavigation } from "@react-navigation/native";


const ScreenHeight = Dimensions.get('window').height;

export default function Home() {

  const navigation = useNavigation();

  const [caregiverList, setCaregiverList] = useState([]);
  const [highRatingcaregiverList, setHighRatingCaregiverList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };
  
  useEffect(() =>  {
    if (isLoggedIn) {
      getCaregiverList().then((CaregiverList) => {
        if(CaregiverList){
          const user_pos = getUserPosition();
          let remove_list = [];
          CaregiverList.forEach((c) => {
            const dist = calcDistanceKm(user_pos.latitude, user_pos.longitude, c.latitude, c.longitude);
            c["distance"] = dist
            if (c.max_request_km < dist) {
                remove_list.push(c._id);
            }
        });
        const filteredList = CaregiverList.filter((c) => !remove_list.includes(c._id));
        setCaregiverList(filteredList);

        } else{
          setCaregiverList([])
        }       

      })
    }else{
      getCaregiverList().then((CaregiverList) => setCaregiverList(CaregiverList ? CaregiverList : []))
    }
  }, []);

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
            <CaregiverList caregiverList={caregiverList}></CaregiverList>
            {/* {caregiverList.map((caregiver) => <CaregiverCard key={`${caregiver._id}_next_to_you`} caregiver={caregiver}></CaregiverCard>)} */}
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bem avaliados</Text>
          <Pressable style={styles.button}>
            <Text style={{color: '#FFFFFF', fontWeight: '200', fontSize: 12}}>Ver mais</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            <CaregiverList caregiverList={caregiverList}></CaregiverList>
            {/* {caregiverList.map((caregiver) => <CaregiverCard key={`${caregiver._id}_high_rating`} caregiver={caregiver}></CaregiverCard>)} */}
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
            <CaregiverList caregiverList={caregiverList}></CaregiverList>
            {/* {caregiverList.map((caregiver) => <CaregiverCard key={`${caregiver._id}_high_exp`} caregiver={caregiver}></CaregiverCard>)} */}
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
