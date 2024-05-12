import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Rejected = ({ }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <Image
            style={styles.image}
            source={{ uri: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg' }}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.name, {fontSize: 20}]}>Maria Augusta Oliveira</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.icon}>📅</Text>
              <Text>11/05/2024</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.icon}>💰</Text>
              <Text>R$200,00</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.icon}>⏰</Text>
              <Text>08h - 12h</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    width: 385,
    height: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#486142',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 2,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontFamily: 'Catamaran',
    color: '#486142',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

export default Rejected;
