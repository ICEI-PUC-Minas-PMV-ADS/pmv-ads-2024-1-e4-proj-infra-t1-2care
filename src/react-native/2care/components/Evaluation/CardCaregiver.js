import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardCaregiver = ({ caregiver }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{caregiver.name}</Text>
      <Text style={styles.subtitle}>Cuidador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#486142',
  },
  subtitle: {
    fontSize: 18,
    color: '#ED8733',
    marginTop: 10,
  },
});

export default CardCaregiver;
