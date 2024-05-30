import React, {useState, useEffect, useContext} from 'react';
import { 
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import FilterContainer from '../../components/Filter.js';
import { CaregiversContext } from "../../contexts/CaregiversContext.js";
import CaregiverList from '../../components/CaregiverCard/CaregiverList.js';
import { getAverageRating } from '../../services/filterCaregiver.js';
import SearchBar from '../../components/SearchBar.jsx';

const ScreenHeight = Dimensions.get('window').height;

export default function Search({route}) {
  const filter = route.params?.filter ?? null;
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [textToSearch, setTextToSearch] = useState('');

  const { list, loadCaregiverList } = useContext(CaregiversContext);
  const [caregiverList, setCaregiverList] = useState([]);
  const [filteredCaregiverList, setFilteredCaregiverList] = useState([]);
  
  useEffect(() => {
    loadCaregiverList();
    setCaregiverList(list);
});

  useEffect(() => {
    const filterCaregivers = () => {
      return caregiverList.filter(caregiver => {
        // const filterDistance = appliedFilters.distance ? caregiver.max_request_km <= appliedFilters.distance : true;
        const filterTextToSearch = textToSearch ? caregiver.name.includes(textToSearch) : true;
        const filterExperience = appliedFilters?.experience ? caregiver.career_time >= appliedFilters.experience : true;
        const filterRating = appliedFilters?.rating ? (getAverageRating(caregiver.evaluations) >= appliedFilters.rating ? true : false) : true;
        const filterDayPrice = appliedFilters?.day_price ? caregiver.day_price <= appliedFilters.day_price : true;
        const filterHourPrice = appliedFilters?.hour_price ? caregiver.hour_price <= appliedFilters.hour_price : true; 
        const filterSpecializations = appliedFilters?.specializations?.length > 0 ? appliedFilters.specializations.every(spec => caregiver.specializations.includes(spec)) : true;
        
        return filterTextToSearch && filterExperience && filterRating && filterDayPrice && filterHourPrice && filterSpecializations ;
      });
    };

    setFilteredCaregiverList(filterCaregivers());
  }, [caregiverList, appliedFilters, textToSearch]);

  const handleApplyFilter = (appliedFilters) => {
    setAppliedFilters(appliedFilters)
  };

  const handleApplySearch = (textToSearch) => {
    setTextToSearch(textToSearch)
    handleApplyFilter(appliedFilters)
  };

  return (
    <View> 
      <SearchBar onAppliedSearch={handleApplySearch}></SearchBar>
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