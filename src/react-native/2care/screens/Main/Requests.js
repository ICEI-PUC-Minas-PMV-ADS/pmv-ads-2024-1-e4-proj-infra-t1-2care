import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getRequestsList, acceptRequest, declineRequest, cancelRequest } from "../../services/caregiverServiceMob";
import { getUserType } from "../../services/userServiceMob";
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import TopNavOptions from "../../components/TopNav/TopNavOptions";

function Requests() {
  const [requestsList, setRequestsList] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Pendentes');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    getRequestsList().then((requestList) => {
      if (requestList) {
        setRequestsList(requestList);
      }
    });

    getUserType().then((type) => {
      setUserType(type || '');
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
        return "Recusadas";
      case 2:
        return "Aceitas";
      case 3:
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const handleAcceptRequest = async (requestId) => {
    if (userType === 'Caregiver') {
      const response = await acceptRequest(requestId);
      if (response) {
        Alert.alert("Sucesso", "Solicitação aceita com sucesso");
        updateRequestsList();
      } else {
        Alert.alert("Erro", "Falha ao aceitar solicitação");
      }
    }
  };

  const handleDeclineRequest = async (requestId) => {
    if (userType === 'Caregiver') {
      const response = await declineRequest(requestId);
      if (response) {
        Alert.alert("Sucesso", "Solicitação recusada com sucesso");
        updateRequestsList();
      } else {
        Alert.alert("Erro", "Falha ao recusar solicitação");
      }
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (userType === 'CareReceiver') {
      const response = await cancelRequest(requestId);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Proposta cancelada com sucesso!'
        });
        updateRequestsList();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Erro ao cancelar proposta'
        });
      }
    }
  };

  const updateRequestsList = () => {
    getRequestsList().then((requestList) => {
      if (requestList) {
        setRequestsList(requestList);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TopNavOptions onSelect={setSelectedOption} selectedOption={selectedOption} />
      {userType ? (
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
                    {userType === 'Caregiver' && (
                      <>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B65138' }]} onPress={() => handleDeclineRequest(request.id)}>
                          <Text style={styles.buttonText}>Recusar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#ED8733' }]} onPress={() => handleAcceptRequest(request.id)}>
                          <Text style={styles.buttonText}>Aceitar</Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {userType === 'CareReceiver' && (
                      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => handleCancelRequest(request.id)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Faça login e envie/receba propostas!</Text>
        </View>
      )}
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
    flex: 1,
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
  cancelButton: {
    backgroundColor: '#B65138',
    marginLeft: 'auto',
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    color: '#486142',
    fontWeight: '600',
  },
});

export default Requests;
