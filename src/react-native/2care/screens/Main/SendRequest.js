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
  const [status, setStatus] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dateFilled, setDateFilled] = useState(false);
  const [startTimeFilled, setStartTimeFilled] = useState(false);
  const [endTimeFilled, setEndTimeFilled] = useState(false);

  const formatDate = (inputDate) => {
    const cleaned = inputDate.replace(/\D/g, '');
    const day = cleaned.slice(0, 2);
    const month = cleaned.slice(2, 4);
    const year = cleaned.slice(4, 8);
  
    let formattedDate = '';
    if (day) {
      formattedDate += day;
      if (month) {
        formattedDate += '/' + month;
        if (year) {
          formattedDate += '/' + year;
        }
      }
    }
    setDate(formattedDate);
  
    if (formattedDate.length === 10) {
      const proposedDate = new Date(year, month - 1, day);
      if (!(proposedDate.getDate() === parseInt(day) && proposedDate.getMonth() + 1 === parseInt(month) && proposedDate.getFullYear() === parseInt(year))) {
        setErrorMessage('Data inválida');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
    }
  };

  const formatTime = (inputTime, setTime) => {
    const cleaned = inputTime.replace(/\D/g, '');
    const hour = cleaned.slice(0, 2);
    const minute = cleaned.slice(2, 4);
  
    let formattedTime = '';
    if (hour) {
      formattedTime += hour;
      if (minute) {
        formattedTime += ':' + minute;
      }
    }
    setTime(formattedTime);
  
    if (formattedTime.length === 5) {
      const [hours, minutes] = formattedTime.split(':').map(Number);
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        setErrorMessage('');
      } else {
        setErrorMessage('Hora inválida');
      }
    } else {
      setErrorMessage('');
    }
  };

  const handleSendProposal = async () => {
    const proposalData = {
      caregiver: caregiver._id,
      date: date.split('/').reverse().join('-'), 
      startTime: startTime,
      endTime: endTime,
      total_hours: totalHours, 
      final_price: finalPrice.toString(),
      status: status,
    };
  
    console.log('Dados da proposta:', proposalData);
  
    try {
      await sendProposalToCaregiver(proposalData);
      setSuccessMessage('Proposta enviada com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      if (error.message === "Por favor, complete seu cadastro e tente novamente:") {
        setErrorMessage(error.message);
      } else {
        console.log('Erro ao enviar proposta para o cuidador:', error);
      }
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
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
          <View style={styles.formContent}>
            <CustomLabel text="Data" />
            <TextInput
              style={[styles.input, !dateFilled && { borderColor: 'red' }]}
              value={date}
              onChangeText={(text) => {
                formatDate(text);
                setDateFilled(!!text);
              }}
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
            <Text style={[styles.labelText, styles.spaceVertical]}>Valor por hora do cuidador: R${caregiver.hour_price}</Text>
            <Text style={[styles.labelText, styles.spaceVertical]}>Total de horas: {totalHours}</Text>
            <Text style={[styles.labelText, styles.spaceVertical]}>Total a pagar: R${finalPrice}</Text>
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
    marginBottom: 
    20,
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
    borderColor: '#486142',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
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
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  successMessage: {
    color: "green",
    marginBottom: 10,
  },
  spaceVertical: {
    marginVertical: 10,
  },
});
