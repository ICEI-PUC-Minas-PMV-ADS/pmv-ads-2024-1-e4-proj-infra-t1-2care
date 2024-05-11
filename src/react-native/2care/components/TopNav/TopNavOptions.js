import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TopNavOptions = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Pendentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Aceitas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Recusadas</Text>
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
  },
  optionText: {
    color: '#333333',
    fontSize: 16,
  },
});

export default TopNavOptions;
