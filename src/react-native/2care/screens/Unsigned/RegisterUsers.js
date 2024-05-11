import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CaregiverFormMob from "../../components/Forms/CaregiverFormMob.js";
import CarereceiverFormMob from "../../components/Forms/CarereceiverFormMob.js";
import "../AppMobile.css";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterUsers({ route }) {
  const { type } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.ContainerAllForm}>
      {/*Botão provisório*/}
      <View style={styles.navigationContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Ionicons name="arrow-back" size={24} color="#486142" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("HomeTest")}
          style={styles.goForwardButton}
        >
          <Ionicons name="arrow-forward" size={24} color="#486142" />
        </Pressable>
      </View>
      {/*Fim Botão provisório*/}
      <View>
        <Text style={styles.title}>
          {type === "carereceiver" ? "Olá, cliente!" : "Olá, cuidador!"}
        </Text>
      </View>
      <View>
        {type === "carereceiver" && <CarereceiverFormMob />}
        {type === "caregiver" && <CaregiverFormMob />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRegister: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: "15%",
    textAlign: "left",
    color: "#486142",
    paddingHorizontal: "10%",
  },

  //Style IconButton "Provisório"
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingTop: 10, 
  },
  goBackButton: {
    // Adicione estilos adicionais conforme necessário
  },
  goForwardButton: {
    // Adicione estilos adicionais conforme necessário
  },
});
