import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "../AppMobile.css";

export default function Login() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async () => {
    const validationErrors = {};
  
    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Por favor, insira o e-mail cadastro.";
    }
  
    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "Por favor, confira sua senha.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // Lógica de submissão do formulário 
    try {
      await loginUser(formData);
      console.log("Usuário logado com sucesso");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setLoginError("Erro ao fazer login. Verifique E-mail e Senha e tente novamente.");
    }
  };
  

  return (
    <View style={styles.containerLogin}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.containerLogin}>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/logo2care.png")}
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

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={({ pressed }) => [
                styles.linkContainer,
                pressed && { transform: [{ scale: 1.1 }], fontWeight: "bold" },
              ]}
            >
              <Text style={styles.linkText}>
                Crie a sua conta clicando aqui
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.buttonLogin,
                pressed && { transform: [{ scale: 1.1 }] },
              ]}
            >
              <Text style={styles.buttonLoginText}>Entrar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                console.log("Você será redirecionado para a nova Tela.");
                navigation.navigate("Home");
              }}
              style={({ pressed }) => [
                styles.linkContainer,
                pressed && { transform: [{ scale: 1.05 }], fontWeight: "bold" },
              ]}
            >
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
    marginTop: -20,
  },
  linkText: {
    color: "#ED8733",
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
    fontSize: 25,
  },
});
