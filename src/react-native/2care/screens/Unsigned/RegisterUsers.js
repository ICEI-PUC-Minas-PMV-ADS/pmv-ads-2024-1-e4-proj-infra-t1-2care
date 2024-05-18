import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CaregiverFormMob from "../../components/Forms/CaregiverFormMob.js";
import CarereceiverFormMob from "../../components/Forms/CarereceiverFormMob.js";
import "../AppMobile.css";

export default function RegisterUsers({ route }) {
  const { type } = route.params;

  return (
    <ScrollView>
      <View style={styles.ContainerAllForm}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerRegister: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: "15%",
    textAlign: "left",
    color: "#486142",
    paddingHorizontal: "10%",
  },
});
