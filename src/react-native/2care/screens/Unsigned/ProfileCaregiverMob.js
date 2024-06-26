import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import "../AppMobile.css";
import { logout } from "../../services/authServiceMob.js";
import { getUserData, getUserEmail } from "../../services/userServiceMob";
import { getCaregiverData } from "../../services/caregiverServiceMob.js";

const GENDER_MAP = {
  0: "Não especificado",
  1: "Masculino",
  2: "Feminino",
};

const specializations = [
  "Cuidados Básicos de Saúde",
  "Apoio à Mobilidade",
  "Higiene e Cuidados Pessoais",
  "Nutrição e Preparo de Refeições",
  "Estimulação Cognitiva e Emocional",
  "Acompanhamento e Transporte",
  "Gestão de Rotinas e Medicamentos",
  "Cuidados com o Ambiente Doméstico",
  "Suporte em Cuidados Paliativos",
  "Formação em Demência e Alzheimer",
];

export default function ProfileCaregiverMob() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [caregiverData, setCaregiverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [yearsexperience, setYearsExperience] = useState(null);
  const [email, setEmail] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData();
        const caregiver = await getCaregiverData();
        // const userEmail = await getUserEmail();

        setUserData(user);
        setCaregiverData(caregiver);
        setYearsExperience(caregiver.yearsExperience); 
        // setEmail(userEmail || userEmail);

        console.log("User Data:", user);
        console.log("Caregiver Data:", caregiver);
        // console.log("User Email:", userEmail);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAgendaPress = () => {
    navigation.navigate("AgendaMob");
  };

  const handleReviews = () => {
    navigation.navigate('Reviews')
  };

  const handleEditProfileScreenCareGiver = () => {
    navigation.navigate('EditProfileScreenCareGiver')
  };

  const handleLogout = async () => {
    const navigateToLogin = () => {
      console.log("Usuário deslogado");
      navigation.navigate("Login");
    };
    await logout(navigateToLogin);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.name}>{userData.name}</Text>
          {/*<Text style={styles.name}>Carlos Alberto Mansur</Text>*/}
          <Text style={styles.role}>Cuidador</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: userData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" }}
              //source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s",}}
            />
            <View style={styles.editIcon}>
              <Icon name="pencil" size={32} color="#fff" />
            </View>
          </View>

          {caregiverData ? 
            // <View style={styles.buttonsProfile}>
            //   <Pressable onPress={handleReviews} style={styles.button}>
            //     <Text style={styles.buttonText}>Avaliações</Text>
            //   </Pressable>
            //   <Pressable onPress={handleAgendaPress} style={styles.button}>
            //     <Text style={styles.buttonText}>Agenda</Text>
            //   </Pressable>
            // </View> 
            <View/>
          :
            <View style={styles.buttonsProfile}>
              <Pressable onPress={ () => alert("Complete seu perfil primeiro")} style={[styles.button, { backgroundColor: '#a3b0a0' }]}>
                <Text style={styles.buttonText}>Avaliações</Text>
              </Pressable>
              <Pressable onPress={() => alert("Complete seu perfil primeiro")} style={[styles.button, { backgroundColor: '#a3b0a0' }]}>
                <Text style={styles.buttonText}>Agenda</Text>
              </Pressable>
            </View>
          }

          {/* <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="at" size={20} style={styles.icon} />
              <Text style={styles.label}>E-MAIL</Text>
            </View>
            <Text style={styles.info}>{email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="phone" size={20} style={styles.icon} />
              <Text style={styles.label}>TELEFONE</Text>
            </View>
            <Text style={styles.info}>{userData.phone}</Text>
          </View> */}

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="circle"
                size={20}
                style={[styles.icon, { color: "#486142" }]}
              />
              <Text style={styles.label}>GÊNERO</Text>
            </View>
            <Text style={styles.info}>{GENDER_MAP[userData.gender]}</Text>
            {/*<Text style={styles.info}>Masculino</Text>*/}
          </View>

          <View style={styles.section}>
            <Icon name="graduation-cap" size={20} style={styles.icon} />
            <Text style={styles.label}>QUALIFICAÇÕES</Text>
          </View>
          
          <View>
            {caregiverData.qualifications && caregiverData.qualifications.length > 0 ? (
              caregiverData.qualifications.map((qualification, index) => (
                <View style={styles.qualifications} key={index} >
                  <View style={styles.info}>
                    <Text>{qualification.name}</Text>
                    <Text>{qualification.conclusion_date}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.info}>Não informado.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Icon name="briefcase" size={20} style={styles.icon} />
            <Text style={styles.label}>ESPECIALIZAÇÕES</Text>
          </View>

          <View>
            {caregiverData.specializations && caregiverData.specializations.length > 0 ? (
              caregiverData.specializations.map((specialization, index) => (
                <Text style={styles.info} key={index}>• {specializations[specialization.name]}</Text>
              ))
            ) : (
              <Text style={styles.info}>Não informado.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Icon name="book" size={20} style={styles.icon} />
            <Text style={styles.label}>EXPERIÊNCIAS DE TRABALHO</Text>
          </View>
          <View>
            {caregiverData.work_exp && caregiverData.work_exp.length > 0 ? (
              caregiverData.work_exp.map((exp, index) => (
                <View key={index} style={styles.experiences}>
                  <View style={styles.info}>
                    <Text>{exp.place}</Text>
                    <Text>{exp.start_date} - {exp.end_date}</Text>
                    <Text>{exp.description}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.info}>Não informado.</Text>
            )}
          </View>
            

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.years}>{yearsexperience}</Text>
              <Text style={styles.label}> {caregiverData.career_time} </Text>
              <Text style={styles.label}>ANOS DE EXPERIÊNCIA</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="dollar" size={20} style={styles.icon} />
              <Text style={styles.label}>PREÇO POR DIA</Text>
            </View>
          </View>
          <View style={styles.pricing}>
            <Text>{caregiverData.day_price}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="dollar" size={20} style={styles.icon} />
              <Text style={styles.label}>PREÇO POR HORA</Text>
            </View>
          </View>
          <View style={styles.pricing}>
            <Text>{caregiverData.hour_price}</Text> 
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="info-circle" size={20} style={styles.icon} />
              <Text style={styles.label}>INFORMAÇÕES ADICIONAIS</Text>
            </View>
          </View>
          
          <View style={styles.additionalInfo}>
            {caregiverData.additional_info ? <Text> {caregiverData.additional_info}</Text> : <Text>Não informado.</Text>}
          </View>

          <View style={styles.buttonsProfile}>
            <Pressable
              onPress={handleEditProfileScreenCareGiver}
              style={[styles.button, styles.editButton]}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </Pressable>
            <Pressable
              onPress={handleLogout}
              style={[styles.button, styles.logoutButton]}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    width: "80%",
    margin: "auto",
    marginBottom: "5%",
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
    color: "#ED8733",
  },
  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  editIcon: {
    position: "absolute",
    right: "30%",
    bottom: 0,
    backgroundColor: "#ED8733",
    borderRadius: 10,
    padding: 5,
  },
  buttonsProfile: {
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
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    color: "#486142",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 0,
    color: "#486142",
  },
  info: {
    fontSize: 16,
    marginLeft: 30,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  qualifications: {
    borderWidth: 1,
    borderColor: "#486142",
    padding: 10,
    borderRadius: 5,
  },
  experiences: {
    borderWidth: 1,
    borderColor: "#486142",
    padding: 10,
    borderRadius: 5,
  },
  experienceCard: {
    borderWidth: 1,
    borderColor: "#486142",
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
    marginBottom: 5,
  },
  fixedHours: {
    paddingLeft: 30,
    marginBottom: 5,
  },
  pricing: {
    paddingLeft: 30,
    marginBottom: 5,
  },
  additionalInfo: {
    paddingLeft: 30,
    marginBottom: 5,
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
