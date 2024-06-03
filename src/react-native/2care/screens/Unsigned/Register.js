import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "../AppMobile.css";
import Icon from "react-native-vector-icons/Ionicons";

export default function Register() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerRegister}>
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={24} color="#486142" />
      </Pressable>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/logo2care.png")}
          style={styles.logoImg}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>Você é</Text>
        <Pressable
          onPress={() =>
            navigation.navigate("RegisterUsers", { type: "carereceiver" })
          }
          style={({ pressed }) => [
            styles.buttonUser,
            pressed && { transform: [{ scale: 1.1 }] },
          ]}
        >
          <Text style={styles.buttonUserText}>Cliente</Text>
        </Pressable>
        <Text style={styles.subtitle}>
          Familiares ou pessoas que buscam por cuidadores para assistência
          personalizada.
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate("RegisterUsers", { type: "caregiver" })
          }
          style={({ pressed }) => [
            styles.buttonUser,
            pressed && { transform: [{ scale: 1.1 }] },
          ]}
        >
          <Text style={styles.buttonUserText}>Cuidador</Text>
        </Pressable>
        <Text style={styles.subtitle}>
          Para cuidadores e profissionais de home care qualificados que desejam
          divulgar suas habilidades e experiências para encontrar oportunidades
          de trabalho na área de cuidadores de pessoas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRegister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
  goBackButton: {
    position: "absolute",
    top: 20, 
    left: -9, 
    zIndex: 1, 
  },
  logo: {
    alignItems: "center",
    marginTop: -30,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  description: {
    alignItems: "left",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: "left",
    color: "#486142",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  buttonUser: {
    backgroundColor: "#486142",
    padding: 10,
    borderRadius: 25,
    alignItems: "left",
    width: 170,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonUserText: {
    color: "#FFFFFF",
    textAlign: "center",
    margin: "auto",
    fontSize: 20,
  },
});
