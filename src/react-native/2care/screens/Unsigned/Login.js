import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import theme from "../../theme/theme.js";
import "../AppMobile.css";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    //Adicionar a validação do formulário
  };

  const handleSubmit = () => {
    //Adicionar a lógica de submissão do formulário
  };

  const handleTextPress = () => {
    navigation.navigate('Register');
  };



  return (
    <View style={styles.containerLogin}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.containerLogin}>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logoImg}
            />
          </View>

          <View style={styles.description}>
            <Text style={styles.title}>
              Bem-vindos ao <Text style={{ color: "#ED8733" }}>2Care!</Text>
            </Text>
            <Text style={styles.subtitle}>
              Conectamos famílias a cuidadores de idosos de maneira ágil e
              eficiente, facilitando a busca pelo profissional que melhor atenda
              às suas necessidades.
            </Text>
          </View>

          <View style={styles.formLogin}>
            <TextInput
              placeholder="E-mail"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              style={[styles.input, errors.email && styles.errorBorder]}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Senha"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={true}
              style={[styles.input, errors.password && styles.errorBorder]}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Pressable onPress={handleTextPress}>
              <Text style={styles.linkText}>Crie a sua conta aqui</Text>
            </Pressable>

            <Pressable onPress={handleSubmit} style={styles.buttonLogin}>
              <Text style={styles.buttonLoginText}>Entrar</Text>
            </Pressable>

            <Pressable onPress={handleTextPress}>
              <Text style={styles.linkText}>Continuar como visitante</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 0,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  description: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#486142",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formLogin: {
    width: "80%",
    alignItems: "stretch",
    margin: "auto",
    marginTop: 30,
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
    fontSize: 20,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  linkText: {
    color: "#ED8733",
    //textDecorationLine: "underline",
    marginBottom: 20,
    alignContent: "flex-start",
    fontSize: 16,
  },
  buttonLogin: {
    backgroundColor: "#799275",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonLoginText: {
    color: "black",
    //fontWeight: "bold",
    fontSize: 25,
  },
});
