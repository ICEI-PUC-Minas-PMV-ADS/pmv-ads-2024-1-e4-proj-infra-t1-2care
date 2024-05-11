import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TopNav = ({ navigation, title }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.backButton}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#799275',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TopNav;
