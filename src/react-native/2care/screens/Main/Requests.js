import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { getRequestsList } from "../../services/caregiverServiceMob"; 

import TopNavOptions from "../../components/TopNav/TopNavOptions";

export default function Requests({ userType }) {
  const [requestsList, setRequestsList] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    getRequestsList().then((requestList) => {
      console.log(requestList);
      if (requestList) {
        setRequestsList(requestList);
      }
    });
  }, []);

  const scrollToTop = () => {
    scrollViewRef.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowScrollTop(y > 0);
  };

  return (
    <View style={styles.container}>
      <TopNavOptions />
      <ScrollView
        ref={(ref) => (scrollViewRef = ref)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {requestsList.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: request.caregiver.user.picture }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.caregiverName}>
                {request.caregiver.user.name || 'N/A'}
              </Text>
              <Text>Data: {request.date}</Text>
              <Text>Hora inicial: {request.start_time}</Text>
              <Text>Hora final: {request.end_time}</Text>
              <Text>Total de horas: {request.total_hours}</Text>
              <Text>Valor a pagar: {request.final_price}</Text>
              <Text>Status: {request.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
          <Text style={styles.scrollTopText}>↑</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  requestContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#486142',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  caregiverName: {
    fontSize: 18,
    color: '#486142',
    fontWeight: '600'
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollTopText: {
    color: '#fff',
    fontSize: 20,
  },
});
