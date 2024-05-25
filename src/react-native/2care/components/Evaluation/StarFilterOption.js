import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StarFilterOption = ({ selected, onPress, number }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, selected && styles.selected]}>
        <MaterialIcons name="star" size={24} color={selected ? "#ED8733CC" : "#E0E0E0"} />
        <Text>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  }
});

export default StarFilterOption;
