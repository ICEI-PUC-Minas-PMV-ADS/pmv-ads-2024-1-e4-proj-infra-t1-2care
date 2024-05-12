import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const TopNavOptions = ({ onSelect, selectedOption }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => onSelect('Pendentes')}>
        <Text style={[styles.optionText, selectedOption === 'Pendentes' && styles.selectedText]}>Pendentes</Text>
        {selectedOption === 'Pendentes' && <View style={styles.selectedIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => onSelect('Aceitas')}>
        <Text style={[styles.optionText, selectedOption === 'Aceitas' && styles.selectedText]}>Aceitas</Text>
        {selectedOption === 'Aceitas' && <View style={styles.selectedIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => onSelect('Recusadas')}>
        <Text style={[styles.optionText, selectedOption === 'Recusadas' && styles.selectedText]}>Recusadas</Text>
        {selectedOption === 'Recusadas' && <View style={styles.selectedIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#799275',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginLeft: 'inherit',
  },
  option: {
    marginLeft: 20,
    position: 'relative',
  },
  optionText: {
    color: '#333333',
    fontSize: 16,
  },
  selectedText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -11,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#ed8733',
  },
});

export default TopNavOptions;
