import React, {useState, useEffect} from 'react';
import { 
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import FilterContainer from '../../components/Filter.js';
import { getCaregiverList } from '../../services/filterCaregiver.js';
import CaregiverList from '../../components/CaregiverCard/CaregiverList.js';

const ScreenHeight = Dimensions.get('window').height;

export default function Search({route}) {
  const filter = route.params?.filter ?? null;
  const [appliedFilters, setAppliedFilters] = useState([]);
  
  const [filteredCaregiverList, setFilteredCaregiverList] = useState([]);
  const [caregiverList, setCaregiverList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };
  
  useEffect(() =>  {
      getCaregiverList().then((CaregiverList) => setCaregiverList(CaregiverList ? CaregiverList : []))
  }, []);


  useEffect(() => {
    const filterCaregivers = () => {
      return caregiverList.filter(caregiver => {
        // const filterDistance = appliedFilters.distance ? caregiver.max_request_km <= appliedFilters.distance : true;
        const filterExperience = appliedFilters?.experience ? caregiver.career_time >= appliedFilters.experience : true;
        const filterRating = appliedFilters?.rating ? caregiver.evaluations.length > 0 && Math.round(caregiver.evaluations.reduce((sum, item) => sum + item.rating, 0) / caregiver.evaluations.length) >= appliedFilters.rating : true;
        const filterDayPrice = appliedFilters?.day_price ? caregiver.day_price <= appliedFilters.day_price : true;
        const filterHourPrice = appliedFilters?.hour_price ? caregiver.hour_price <= appliedFilters.hour_price : true; 
        const filterSpecializations = appliedFilters?.specializations?.length > 0 ? appliedFilters.specializations.every(spec => caregiver.specializations.includes(spec)) : true;
        
        return filterExperience && filterRating && filterDayPrice && filterHourPrice && filterSpecializations ;
      });
    };

    setFilteredCaregiverList(filterCaregivers());
  }, [caregiverList, appliedFilters]);

  const handleApplyFilter = (appliedFilters) => {
    console.log(appliedFilters)
    console.log(appliedFilters.distance)
    setAppliedFilters(appliedFilters)
  };


  return (
    <View> 
      <View style={styles.filter}>
        <FilterContainer filter={filter} onAppliedFilters={handleApplyFilter}></FilterContainer>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            <CaregiverList caregiverList={filteredCaregiverList}></CaregiverList>
          </View> 
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  filter: {
    height: ScreenHeight * 0.5,
    paddingVertical: 10,
  },
  results: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});