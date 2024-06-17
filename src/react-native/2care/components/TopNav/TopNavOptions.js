import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TopNavOptions = ({ onSelect, selectedOption }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={24} color="#333" />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  backButton: {
    marginRight: 10,
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
