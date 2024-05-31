import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getRequestsList } from "../../services/caregiverServiceMob"; 

import TopNavOptions from "../../components/TopNav/TopNavOptions"

export default function Requests({ userType }) {
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    getRequestsList().then((requestList) => {
      console.log(requestList);
      if (requestList) {
        setRequestsList(requestList);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TopNavOptions />
      {requestsList.map((request, index) => (
        <View key={index} style={styles.requestContainer}>
          <Image
            style={styles.image}
            source={{ uri: request.caregiver.user.picture }}
          />
          <Text>Cuidador: {request.caregiver.user.name || 'N/A'}</Text>
          <Text>Data: {request.date}</Text>
          <Text>Hora inicial: {request.start_time}</Text>
          <Text>Hora final: {request.end_time}</Text>
          <Text>Total de horas: {request.total_hours}</Text>
          <Text>Valor a pagar: {request.final_price}</Text>
          <Text>Status: {request.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: '#486142',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    resizeMode: 'cover',
  },
});
