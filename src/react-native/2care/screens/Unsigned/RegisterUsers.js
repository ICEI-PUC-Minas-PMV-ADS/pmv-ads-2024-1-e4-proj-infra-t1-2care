import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CaregiverFormMob from "../../components/Forms/CaregiverFormMob.js";
import CarereceiverFormMob from "../../components/Forms/CarereceiverFormMob.js";
import "../AppMobile.css";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisterUsers({ route }) {
  const { type } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.containerRegister}>
      <View style={styles.header}>
        <Pressable style={styles.goBackButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="#486142" />
        </Pressable>
        <Text style={styles.title}>
          {type === "carereceiver" ? "Olá, cliente!" : "Olá, cuidador!"}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerLogin}
      >
        <ScrollView>
          <View style={styles.containerAllForm}>
            {type === "carereceiver" && <CarereceiverFormMob />}
            {type === "caregiver" && <CaregiverFormMob />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRegister: {
    flex: 1,
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: "9%",
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: "15%",
    textAlign: "left",
    color: "#486142",
    paddingHorizontal: "10%",
  },
});
