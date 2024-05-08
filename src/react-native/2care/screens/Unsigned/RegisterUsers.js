import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import theme from "../../theme/theme.js";
import "../AppMobile.css";
import { useNavigation } from "@react-navigation/native";
import CaregiverFormMob from "../../components/Forms/CaregiverFormMob.js";
import CarereceiverFormMob from "../../components/Forms/CarereceiverFormMob.js";

export default function RegisterUsers({ route }) {
  const { type } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80%",
    margin: "auto",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "left",
    color: "#486142",
  },
});
