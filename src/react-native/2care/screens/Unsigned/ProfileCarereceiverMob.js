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
import "../AppMobile.css";
import { logout } from "../../services/authServiceMob.js";

export default function ProfileCarereceiverMob({ userData }) {
  const navigation = useNavigation();

  const handleAgendaPress = () => {
    navigation.navigate("AgendaMob");
  };

  //const handleAvaliationMov = () => {}
  const handleHomeTestPress = () => {
    //navigation.navigate('AvaliationMob')
    navigation.navigate("HomeTest");
  };

  //const handleProfileEditMov = () => {}
  const handleHomeTestPressPress = () => {
    //navigation.navigate('ProfileEditMob')
    navigation.navigate("HomeTest");
  };

  const handleLogout = async () => {
    const navigateToLogin = () => {
      console.log("Usuário deslogado");
      navigation.navigate("Login");
    };
    await logout(navigateToLogin);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {/*<Text style={styles.info}>{userData.name}</Text>*/}
          <Text style={styles.name}>Maria Clara Brandão</Text>
          {/*<Text style={styles.info}>{userData.???}</Text>*/}
          <Text style={styles.role}>80 anos</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              //source={{ uri: userData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s",
              }}
            />
            <View style={styles.editIcon}>
              <Icon name="pencil" size={32} color="#fff" />
            </View>
          </View>

          <View style={styles.buttonsProfile}>
            {/*<Pressable onPress={handleAvaliationMov} style={styles.button}> */}
            <Pressable onPress={handleHomeTestPress} style={styles.button}>
              <Text style={styles.buttonText}>Propostas enviadas</Text>
            </Pressable>
            <Pressable onPress={handleAgendaPress} style={styles.button}>
              <Text style={styles.buttonText}>Avaliações feitas</Text>
            </Pressable>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="at" size={20} style={styles.icon} />
              <Text style={styles.label}>E-MAIL</Text>
            </View>
            {/*<Text style={styles.info}>{userData.email}</Text>*/}
            <Text style={styles.info}>maria.brandao@@gmail.com</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="phone" size={20} style={styles.icon} />
              <Text style={styles.label}>TELEFONE</Text>
            </View>
            {/*<Text style={styles.info}>{userData.phone}</Text>*/}
            <Text style={styles.info}>31 93333-4444</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="circle"
                size={20}
                style={[styles.icon, { color: "#486142" }]}
              />
              <Text style={styles.label}>GÊNERO</Text>
            </View>
            {/*<Text style={styles.info}>{userData.gender}</Text>*/}
            <Text style={styles.info}>Feminino</Text>
          </View>

          <View style={styles.section}>
            <Icon name="heart" size={20} style={styles.icon} />
            <Text style={styles.label}>CUIDADOS ESPECIAIS</Text>
          </View>
          <View style={styles.cuidadosEspeciais}>
            {/*<Text>{userData.cuidadosEspeciais????}</Text>*/}
            <Text> . Alimentação balanceada</Text>
            <Text> . Prática de atividades físicas</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="phone" size={20} style={styles.icon} />
              <Text style={styles.label}>CONTATOS DE EMERGÊNCIA</Text>
            </View>
            {/*<Text style={styles.info}>{userData.emergenceContact????}</Text>*/}
            <Text style={styles.info}> . 31 99999-9999</Text>
            <Text style={styles.info}> . 31 88888-8888</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="map-marker" size={20} style={styles.icon} />
              <Text style={styles.label}>CEP</Text>
            </View>
          </View>
          <View style={styles.cep}>
            {/* <Text>{userData.cep??????}</Text> */}
            <Text>55555-888</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="info-circle" size={20} style={styles.icon} />
              <Text style={styles.label}>INFORMAÇÕES ADICIONAIS</Text>
            </View>
          </View>
          <View style={styles.additionalInfo}>
            {/* <Text>{userData.additionalInfo}</Text> */}
            <Text>Busco um acompanhante que seja responsável e que me auxilie nas atividades cotidianas.</Text>
          </View>

          <View style={styles.buttonsProfile}>
            <Pressable
              onPress={handleHomeTestPressPress}
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
    borderRadius: 10,
    bottom: 0,
    backgroundColor: "#ED8733",
    //borderRadius: 10,
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
    width: 150,
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
  cuidadosEspeciais: {
    paddingLeft: 30,
    marginBottom: 5,
  },
  cep: {
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
