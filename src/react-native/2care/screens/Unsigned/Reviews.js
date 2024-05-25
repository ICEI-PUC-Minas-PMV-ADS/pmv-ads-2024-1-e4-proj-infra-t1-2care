import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import TopNav from '../../components/TopNav/TopNav';
import CardCaregiver from '../../components/Evaluation/CardCaregiver';
import ReviewStars from '../../components/Evaluation/ReviewStars';
import StarFilterOption from '../../components/Evaluation/StarFilterOption';

const Reviews = ({ imageUri, title }) => {
  const navigation = useNavigation();
  const [selectedStars, setSelectedStars] = useState([]);

  const handleStarPress = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  return (
    <View style={styles.container}>
      <TopNav navigation={navigation} />
      <CardCaregiver />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg' }}
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
      </View>
    </View>
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
});

export default Reviews;
