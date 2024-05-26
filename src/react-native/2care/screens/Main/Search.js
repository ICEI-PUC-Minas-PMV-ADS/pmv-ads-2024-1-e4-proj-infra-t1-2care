import React from 'react';
import { 
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import theme from '../../theme/theme.js'; 
import FilterContainer from '../../components/Filter.js';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard.js';

const ScreenHeight = Dimensions.get('window').height;

export default function Search({route}) {
  const filter = route.params?.filter ?? null;

  return (
    <View> 
      <View style={styles.filter}>
        <FilterContainer filter={filter}></FilterContainer>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            <CaregiverCard></CaregiverCard>
            <CaregiverCard></CaregiverCard>
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