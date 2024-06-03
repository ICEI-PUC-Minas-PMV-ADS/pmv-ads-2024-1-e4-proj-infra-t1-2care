import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import TopNav from '../../components/TopNav/TopNav';
import CardCaregiver from '../../components/Evaluation/CardCaregiver';
import ReviewStars from '../../components/Evaluation/ReviewStars';
import StarFilterOption from '../../components/Evaluation/StarFilterOption';
import CardEvaluation from '../../components/Evaluation/CardEvaluation';

const Reviews = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const caregiver = route.params?.caregiver ?? {};

  const [selectedStars, setSelectedStars] = useState([]);

  const handleStarPress = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TopNav navigation={navigation} />
      <CardCaregiver caregiver={caregiver} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: caregiver.picture || 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg' }}
        />
        <ReviewStars />
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filtre por:</Text>
          {[1, 2, 3, 4, 5].map((number) => (
            <StarFilterOption
              key={number}
              number={number}
              selected={selectedStars.includes(number)}
              onPress={() => handleStarPress(number)}
            />
          ))}
        </View>
        <View style={styles.evaluationsContainer}>
          {caregiver.evaluations && caregiver.evaluations.length > 0 ? (
            caregiver.evaluations.map((evaluation, index) => (
              <CardEvaluation key={index} evaluation={evaluation} />
            ))
          ) : (
            <Text style={styles.noEvaluationsText}>Nenhuma avaliação disponível.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  filterText: {
    marginRight: 10,
  },
  evaluationsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  noEvaluationsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default Reviews;
