import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <MaterialIcons
          key={index}
          name="star"
          size={24}
          color={index < rating ? '#ED8733CC' : '#CCCCCC'}
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default RatingStars;
