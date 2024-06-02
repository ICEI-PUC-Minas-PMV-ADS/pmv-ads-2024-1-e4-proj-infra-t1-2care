import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Modal } from "react-native";
import { sendProposalToCaregiver } from "../../services/caregiverServiceMob";

const CustomLabel = ({ text }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );
};

export default function SendRequest({ visible, onClose, caregiver }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const formatDate = (inputDate) => {
    const cleaned = ('' + inputDate).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      setDate(!match[2] ? match[1] : match[1] + '/' + match[2] + (match[3] ? '/' + match[3] : ''));
    }
  };

  const formatTime = (inputTime, setTime) => {
    const cleaned = ('' + inputTime).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/);
    if (match) {
      setTime(!match[2] ? match[1] : match[1] + ':' + match[2]);
    }
  };

  const handleSendProposal = async () => {
    const proposalData = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      caregiver: caregiver.id 
    };

    try {
      await sendProposalToCaregiver(proposalData);
    } catch (error) {
      console.log('Erro ao enviar proposta para o cuidador:', error);
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const totalHours = parseFloat((hours + minutes / 60).toFixed(2));
      setTotalHours(totalHours);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (totalHours > 0) {
      const finalPrice = totalHours * caregiver.hour_price;
      setFinalPrice(finalPrice);
    }
  }, [totalHours, caregiver.hour_price]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Monte sua proposta para: {caregiver.name}</Text>
          <View style={styles.formContent}>
            <CustomLabel text="Data" />
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={formatDate}
              placeholder="DD/MM/AAAA"
              maxLength={10}
              keyboardType="numeric"
            />
            <View style={styles.timeInputs}>
              <View style={styles.timeInput}>
                <CustomLabel text="Hora inicial" />
                <TextInput
                  style={styles.input}
                  value={startTime}
                  onChangeText={(text) => formatTime(text, setStartTime)}
                  placeholder="HH:MM"
                  maxLength={5}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.timeInput}>
                <CustomLabel text="Hora final" />
                <TextInput
                  style={styles.input}
                  value={endTime}
                  onChangeText={(text) => formatTime(text, setEndTime)}
                  placeholder="HH:MM"
                  maxLength={5}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={styles.labelText}>Total de horas: {totalHours}</Text>
            <Text style={styles.labelText}>Total a pagar: {finalPrice}</Text>
            <Pressable style={styles.button} onPress={handleSendProposal}>
              <Text style={styles.buttonText}>Enviar proposta</Text>
            </Pressable>
          </View>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContent: {
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#B65138",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeInput: {
    width: '48%',
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "#D2DAC3",
    paddingLeft: 2,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 8,
    top: -10,
    left: 10,
    opacity: 0.7,
    height: "auto",
    textAlign: "center",
    width: "auto",
    borderRadius: 5,
  },
  labelText: {
    color: "#000000",
    fontSize: 13,
    lineHeight: 2,
    fontWeight: 400,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 3,
  },
  button: {
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 130,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  
buttonText: {
    color: "white",
}, 
});

