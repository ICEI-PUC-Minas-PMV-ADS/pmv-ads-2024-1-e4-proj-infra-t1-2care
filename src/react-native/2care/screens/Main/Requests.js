import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getRequestsList, acceptRequest, declineRequest } from "../../services/caregiverServiceMob"; 
import { FontAwesome } from '@expo/vector-icons';

import TopNavOptions from "../../components/TopNav/TopNavOptions";

function Requests({ userType }) {
  const [requestsList, setRequestsList] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Pendentes');

  useEffect(() => {
    getRequestsList().then((requestList) => {
      console.log(requestList);
      if (requestList) {
        setRequestsList(requestList);
      }
    });
  }, []);

  useEffect(() => {
    if (requestsList.length > 0) {
      const status = requestsList[0].status;
      switch (status) {
        case 0:
          setSelectedOption('Pendentes');
          break;
        case 1:
          setSelectedOption('Aceitas');
          break;
        case 2:
        case 3:
          setSelectedOption('Recusadas');
          break;
        default:
          setSelectedOption('Pendentes');
      }
    }
  }, [requestsList]);

  const scrollToTop = () => {
    scrollViewRef.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowScrollTop(y > 0);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pendentes";
      case 1:
        return "Aceitas";
      case 2:
      case 3:
        return "Recusadas";
      default:
        return "Desconhecido";
    }
  };

  const handleAcceptRequest = async (requestId) => {
    const response = await acceptRequest(requestId);
    if (response) {
      Alert.alert("Sucesso", "Solicitação aceita com sucesso");
      getRequestsList().then((requestList) => {
        if (requestList) {
          setRequestsList(requestList);
        }
      });
    } else {
      Alert.alert("Erro", "Falha ao aceitar solicitação");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    const response = await declineRequest(requestId);
    if (response) {
      Alert.alert("Sucesso", "Solicitação recusada com sucesso");
      getRequestsList().then((requestList) => {
        if (requestList) {
          setRequestsList(requestList);
        }
      });
    } else {
      Alert.alert("Erro", "Falha ao recusar solicitação");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavOptions onSelect={setSelectedOption} selectedOption={selectedOption} />
      <ScrollView
        ref={(ref) => (scrollViewRef = ref)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {requestsList.map((request, index) => (
          <View key={index} style={[styles.requestContainer, getStatusText(request.status) === selectedOption ? null : { display: 'none' }]}>
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
              <View style={styles.iconTextContainer}>
                <FontAwesome name="calendar" size={18} color="#486142" />
                <Text style={styles.iconText}>{request.date}</Text>
              </View>
              <View style={styles.timeContainer}>
                <View style={styles.timeTextContainer}>
                  <FontAwesome name="clock-o" size={18} color="#486142" />
                  <Text style={styles.iconText}>{request.start_time}</Text>
                </View>
                <View style={styles.timeTextContainer}>
                  <FontAwesome name="clock-o" size={18} color="#486142" />
                  <Text style={styles.iconText}>{request.end_time}</Text>
                </View>
              </View>
              <View style={styles.iconTextContainer}>
                <FontAwesome name="money" size={18} color="#486142" />
                <Text style={styles.iconText}>{request.final_price}</Text>
              </View>
              <Text>Status: {getStatusText(request.status)}</Text>
              {request.status === 0 && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#B65138' }]} onPress={() => handleDeclineRequest(request.id)}>
                    <Text style={styles.buttonText}>Recusar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#ED8733' }]}
                  onPress={() => handleAcceptRequest(request.id)}>
                  <Text style={styles.buttonText}>Aceitar</Text>
                  </TouchableOpacity>
                  </View>
                  )}
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
                iconTextContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
                },
                timeContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
                },
                timeTextContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                },
                iconText: {
                marginLeft: 5,
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
                buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                },
                button: {
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 50,
                marginHorizontal: 5
                },
                buttonText: {
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
                },
                });

                export default Requests;