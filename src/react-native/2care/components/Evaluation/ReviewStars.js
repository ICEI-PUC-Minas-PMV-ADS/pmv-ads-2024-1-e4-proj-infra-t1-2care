import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewStars = () => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <MaterialIcons key={index} name="star" size={24} color="#ED8733CC" style={styles.star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default ReviewStars;
