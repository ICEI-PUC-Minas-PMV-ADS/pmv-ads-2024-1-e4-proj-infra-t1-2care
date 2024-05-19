import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
//import Icon from "react-native-vector-icons/Ionicons";
import "../AppMobile.css";

export default function ProfileCaregiverMob({ userData }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.name}>Carlos Alberto Mansur</Text>
        <Text style={styles.role}>Cuidador</Text>

        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            //source={{ uri: userData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s",
            }}
          />
          <Pressable style={styles.editIcon}>
            <Icon name="pencil" size={20} color="#000" />
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Avaliações</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Agenda</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="envelope" size={20} style={styles.icon} />
          <Text style={styles.label}>E-MAIL</Text>
          {/*<Text style={styles.info}>{userData.email}</Text>*/}
          <Text style={styles.info}>carlos.alberto@gmail.com</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="phone" size={20} style={styles.icon} />
          <Text style={styles.label}>TELEFONE</Text>
          {/*<Text style={styles.info}>{userData.phone}</Text>*/}
          <Text style={styles.info}>31 99999-9999</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon
            name="circle"
            size={20}
            style={[styles.icon, { color: "green" }]}
          />
          <Text style={styles.label}>GÊNERO</Text>
          {/*<Text style={styles.info}>{userData.gender}</Text>*/}
          <Text style={styles.info}>Masculino</Text>
        </View>

        <View style={styles.section}>
          <Icon name="graduation-cap" size={20} style={styles.icon} />
          <Text style={styles.label}>QUALIFICAÇÕES</Text>
          <View style={styles.qualifications}>
            {/*<Text>{userData.qualifications}</Text>*/}
            <Text>Graduado em Phonoudiologia</Text>
            <Text>Graduado em Enfermagem</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Icon name="briefcase" size={20} style={styles.icon} />
          <Text style={styles.label}>ESPECIALIZAÇÕES</Text>
          <View style={styles.qualifications}>
            {/*<Text>{userData.specializations}</Text>*/}
            <Text> . Cuidados com pessoas da terceira idade</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Icon name="book" size={20} style={styles.icon} />
          <Text style={styles.label}>EXPERIÊNCIAS DE TRABALHO</Text>
          <View style={styles.experiences}>
            {/*{userData.experiences.map((experience, index) => (
            <View key={index} style={styles.experienceCard}>
              <Text>{experience}</Text>
            </View>
          ))}*/}
            <View style={styles.experienceCard}>
              <Text>Trabalho como cuidador em Belo Horinte...</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          {/*<Text style={styles.years}> {new Date().getFullYear() - new Date(userData.date_joined).getFullYear()} </Text>*/}
          <Text style={styles.years}>5 </Text>
          <Text style={styles.label}>ANOS DE EXPERIÊNCIA</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="calendar" size={20} style={styles.icon} />
          <Text style={styles.label}>DIAS FIXOS INDISPONÍVEIS</Text>
        </View>
        <View style={styles.fixedDays}>
          {/* <Text>{userData.fixedDaysUnavailable}</Text> */}
          <Text>Segunda-feira, Quarta-feira</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="clock-o" size={20} style={styles.icon} />
          <Text style={styles.label}>HORÁRIOS FIXOS INDISPONÍVEIS</Text>
        </View>
        <View style={styles.fixedHours}>
          {/* <Text>{userData.fixedHoursUnavailable}</Text> */}
          <Text>09:00 - 12:00, 15:00 - 18:00</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="dollar" size={20} style={styles.icon} />
          <Text style={styles.label}>PREÇO POR DIA</Text>
        </View>
        <View style={styles.pricing}>
          {/* <Text>{userData.pricePerDay}</Text> */}
          <Text>R$ 300,00</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="dollar" size={20} style={styles.icon} />
          <Text style={styles.label}>PREÇO POR HORA</Text>
        </View>
        <View style={styles.pricing}>
          {/* <Text>{userData.pricePerHour}</Text> */}
          <Text>R$ 50,00</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="info-circle" size={20} style={styles.icon} />
          <Text style={styles.label}>INFORMAÇÕES ADICIONAIS</Text>
        </View>
        <View style={styles.additionalInfo}>
          {/* <Text>{userData.additionalInfo}</Text> */}
          <Text>Disponível para viagens curtas e emergências.</Text>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>Editar</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.logoutButton]}>
            <Text style={styles.buttonText}>Sair</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40,
    //paddingBottom: 20,
    width: "80%",
    margin: "auto",
    marginBottom: "5%",
  },
  innerContainer: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  role: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    //position: "relative",
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    right: 80,
    bottom: 0,
    backgroundColor: "#ED8733",
    size: 100,
    borderRadius: 10,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#486142",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 130,
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
  },
  qualifications: {
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  experiences: {
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  experienceCard: {
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  years: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fixedDays: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  fixedHours: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  pricing: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  additionalInfo: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 130,
    marginBottom: 20,
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#B65138",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 130,
    marginBottom: 20,
    justifyContent: "center",
  },
});
