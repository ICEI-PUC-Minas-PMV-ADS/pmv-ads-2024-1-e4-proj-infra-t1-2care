import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import "../AppMobile.css";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
};
LocaleConfig.defaultLocale = "pt-br";

export default function AgendaMob() {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedTimeSlotsByDay, setSelectedTimeSlotsByDay] = useState({});
  const [selectedDayForDetails, setSelectedDayForDetails] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [tempSelectedTimeSlots, setTempSelectedTimeSlots] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSelectedDayForDetails(day.dateString);
    setTempSelectedTimeSlots(appointments[day.dateString] || []);
    setModalVisible(true);
  };

  const handleTimeSelection = (timeSlot) => {
    const updatedSelectedTimeSlots = [
      ...(selectedTimeSlotsByDay[selectedDay] || []),
    ];
    const index = updatedSelectedTimeSlots.indexOf(timeSlot);

    if (index === -1) {
      updatedSelectedTimeSlots.push(timeSlot);
    } else {
      updatedSelectedTimeSlots.splice(index, 1);
    }

    setSelectedTimeSlotsByDay({
      ...selectedTimeSlotsByDay,
      [selectedDay]: updatedSelectedTimeSlots,
    });
    console.log("Horários atualizados:", updatedSelectedTimeSlots);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleModalClose = () => {
    setTempSelectedTimeSlots([]);
    setModalVisible(false);
  };

  const handleSelect = () => {
    console.log("Agendamento para:", selectedDay);
    console.log("Horários selecionados:", tempSelectedTimeSlots);
    setAppointments((prevState) => ({
      ...prevState,
      [selectedDay]: tempSelectedTimeSlots,
    }));
    setSelectedTimeSlots(tempSelectedTimeSlots);
    setModalVisible(false);
  };

  const renderAppointments = () => {
    const months = Object.keys(appointments).reduce((acc, date) => {
      const [year, month] = date.split("-");
      const monthYear = `${month}-${year}`;
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(date);
      return acc;
    }, {});

    return Object.keys(months).map((monthYear) => (
      <View key={monthYear} style={styles.appointmentCard}>
        <Text style={styles.appointmentMonth}>
          {
            LocaleConfig.locales["pt-br"].monthNames[
              parseInt(monthYear.split("-")[0], 10) - 1
            ]
          }
        </Text>
        {months[monthYear].map((date) => (
          <Pressable
            key={date}
            onPress={() => handleDayPress({ dateString: date })}
          >
            <Text style={styles.appointmentDate}>
              {date.split("-").reverse().join("-")}
            </Text>
          </Pressable>
        ))}
      </View>
    ));
  };

  const getMarkedDates = () => {
    const markedDates = {};
    Object.keys(appointments).forEach((date) => {
      markedDates[date] = {
        selected: true,
        marked: true,
        selectedColor: "red",
        selectedTextColor: "white",
      };
    });
    return markedDates;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.goBackButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Agenda</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          style={styles.calendar}
          markedDates={getMarkedDates()}
          theme={{
            todayTextColor: "#ED8733",
            //todayBackgroundColor: "#ED8733",
            selectedDayBackgroundColor: "#799275",
            arrowColor: "#799275",
            monthTextColor: "#486142",
            textSectionTitleColor: "#799275",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            selectedDayTextColor: "#ffffff",
          }}
        />
      </View>

      <View style={styles.appointmentsContainer}>{renderAppointments()}</View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Horários de {selectedDay}</Text>
            <ScrollView contentContainerStyle={styles.timeSlotsContainer}>
              {[
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
                "24:00",
              ].map((timeSlot, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleTimeSelection(timeSlot)}
                  style={[
                    styles.timeSlot,
                    selectedTimeSlotsByDay[selectedDay]?.includes(timeSlot) && {
                      backgroundColor: "#ED8733",
                    },
                  ]}
                >
                  <Text style={styles.timeSlotText}>{timeSlot}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.selectedDayDetailsContainer}>
              <Text style={styles.selectedDayDetailsTitle}>
                Horários Selecionados para {selectedDayForDetails}:
              </Text>
              <Text style={styles.selectedDayDetailsTimeSlots}>
                {selectedTimeSlotsByDay[selectedDayForDetails]?.join(", ")}
              </Text>
            </View>
            <View style={styles.buttonsModalSelec}>
              <Pressable style={styles.closeButton} onPress={handleModalClose}>
                <Text style={styles.closeButtonText}>Voltar</Text>
              </Pressable>
              <Pressable style={styles.closeButton} onPress={handleSelect}>
                <Text style={styles.closeButtonText}>Selecionar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#486142",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "center",
    paddingHorizontal: 20,
    positon: "absolute",
    zIndex: 10,
  },
  goBackButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    marginLeft: 50,
  },
  calendarContainer: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 30,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  calendar: {
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  appointmentsContainer: {
    width: "80%",
    marginTop: 25,
    marginHorizontal: "auto",
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minHeight: 180,
  },
  appointmentCard: {
    //backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  appointmentMonth: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  appointmentDate: {
    fontSize: 16,
    color: "#486142",
    //textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#486142",
  },
  timeSlotsContainer: {
    alignItems: "center",
  },
  timeSlot: {
    width: "100%",
    padding: 10,
    backgroundColor: "#799275",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  timeSlotText: {
    color: "white",
    fontSize: 16,
  },
  selectedTimeSlotsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
  selectedTimeSlotsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#486142",
  },
  selectedTimeSlot: {
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedDayDetailsContainer: {
    marginTop: 10,
  },
  buttonsModalSelec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "#ED8733",
    padding: 5,
    borderRadius: 25,
    textAlign: "center",
    width: 120,
    marginBottom: 0,
    justifyContent: "center",
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});
