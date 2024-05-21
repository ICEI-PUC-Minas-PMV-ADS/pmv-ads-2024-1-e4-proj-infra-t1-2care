import React, { createContent, useContext, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import theme from "../../theme/theme.js";
import { logout } from "../../services/authServiceMob.js";

export default function HomeTest({ navigation }) {
  const handleLogout = async () => {
    const navigateToLogin = () => {
      console.log("Usuário deslogado");
      navigation.navigate("Login");
    };
    await logout(navigateToLogin);
  };

  const navigateToProfileCaregiver = () => {
    navigation.navigate("ProfileCaregiverMob");
  };

  const navigateToProfileCarereceiver = () => {
    navigation.navigate("ProfileCarereceiverMob");
  };

  return (
    <View style={styles.containerHomeTest}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/logo2care.png")}
          style={styles.logoImg}
        />
      </View>
      <View style={styles.userLogged}>
        <Text style={styles.textUserLogged}>
          Você está na HomeTest do App 2Care
        </Text>
      </View>

      <View style={styles.usersContainer}>
        <Pressable
          onPress={navigateToProfileCarereceiver}
          style={({ pressed }) => [
            styles.userImageContainer,
            pressed && { transform: [{ scale: 1.1 }] },
          ]}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userText}>Cliente</Text>
        </Pressable>

        <Pressable
          onPress={navigateToProfileCaregiver}
          style={({ pressed }) => [
            styles.userImageContainer,
            pressed && { transform: [{ scale: 1.1 }] },
          ]}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userText}>Cuidador</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.buttonUser,
          pressed && { transform: [{ scale: 1.1 }] },
        ]}
      >
        <Text style={styles.buttonUserText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHomeTest: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
  logo: {
    alignItems: "center",
    marginTop: "10%",
  },
  userLogged: {
    justifyContent: "center",
    alignItems: "center",
  },
  textUserLogged: {
    fontSize: 20,
  },
  buttonUser: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 25,
    width: 170,
    //margin: "auto",
    justifyContent: "center",
    //marginBottom: 20,
    marginVertical: 20,
  },
  buttonUserText: {
    color: "#FFFFFF",
    textAlign: "center",
    margin: "auto",
    fontSize: 20,
  },
  userImageContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },


  usersLogged: {
    justifyContent: "center",
    alignItems: "center",
  },
});
