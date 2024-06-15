import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewStars = ({ rating, onRatingChange, editable = true }) => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => editable && onRatingChange(index + 1)}
          disabled={!editable}
        >
          <MaterialIcons
            name="star"
            size={24}
            color={index < rating ? "#ED8733CC" : "#CCCCCC"}
            style={styles.star}
          />
        </TouchableOpacity>
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
