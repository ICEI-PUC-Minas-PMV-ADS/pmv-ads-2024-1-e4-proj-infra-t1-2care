import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import theme from "../../theme/theme.js";
import ResponsiveAppBar from "../../components/layout/ResponsiveAppBar.js";

export default function HomeTest({ navigation }) {
  return (
    <View>
      <ResponsiveAppBar />
      <Text style={{ backgroundColor: theme.palette.back_ground.light }}>
        Teste 2 Care
      </Text>

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

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={({ pressed }) => [
          styles.buttonUser,
          pressed && { transform: [{ scale: 1.1 }] },
        ]}
      >
        <Text style={styles.buttonUserText}>Login</Text>
      </Pressable>
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
  logo: {
    alignItems: "center",
    marginTop: "auto",
  },
  userLogged: {
    justifyContent: "center",
    alignItems: "center",
  },
  textUserLogged: {
    fontSize: 20,
  },
  buttonUser: {
    backgroundColor: "#486142",
    padding: 10,
    borderRadius: 25,
    width: 170,
    margin: "auto",
    justifyContent: "center",
  },
  buttonUserText: {
    color: "#FFFFFF",
    textAlign: "center",
    margin: "auto",
    fontSize: 20,
  },
});
