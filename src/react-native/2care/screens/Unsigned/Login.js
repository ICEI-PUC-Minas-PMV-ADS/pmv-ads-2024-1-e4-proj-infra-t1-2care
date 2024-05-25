import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import "../AppMobile.css";
import { signIn } from "../../services/authServiceMob";

export default function Login() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
    });
    return unsubscribe;
  }, [navigation]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (name === "email" && !value) {
      setErrors({
        ...errors,
        [name]: "Por favor, insira seu e-mail cadastrado.",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "password" && !value) {
      setErrors({ ...errors, [name]: "Por favor, verifique sua senha." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleBlur = (name, value) => {
    if (name === "email" && !validateEmail(value)) {
      setErrors({ ...errors, [name]: "Por favor, insira o e-mail válido." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = {};

    if (!formData.email || !formData.password || formData.password.length < 6) {
      (validationErrors.email = !formData.email
        ? "Por favor, insira o e-mail cadastrado."
        : ""),
        (validationErrors.password =
          !formData.password || formData.password.length < 6
            ? "Por favor, confira sua senha."
            : ""),
        setErrors(validationErrors);
      return;
    }

    try {
      await signIn(formData);
      console.log("Usuário logado com sucesso");
      navigation.navigate("HomeTest");
      //setIsLogged(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerLogin}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <View>
            <TextInput
              placeholder="E-mail"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              onBlur={() => handleBlur("email", formData.email)}
              style={[styles.input, errors.email && styles.errorBorder]}
              onSubmitEditing={handleSubmit}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
          <View>
            <TextInput
              placeholder="Senha"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              onBlur={() => handleBlur("password", formData.password)}
              secureTextEntry={true}
              style={[styles.input, errors.password && styles.errorBorder]}
              onSubmitEditing={handleSubmit}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

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
            onPress={() => navigation.navigate("Register")}
            style={({ pressed }) => [
              styles.linkContainer,
              pressed && { transform: [{ scale: 1.1 }], fontWeight: "bold" },
            ]}
          >
            <Text style={styles.linkText}>Crie a sua conta clicando aqui</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              console.log("Você será redirecionado para a nova Tela.");
              navigation.navigate("HomeTest");
            }}
            style={({ pressed }) => [
              styles.linkContainer,
              pressed && { transform: [{ scale: 1.05 }], fontWeight: "bold" },
            ]}
          >
            <Text style={styles.linkText}>Continuar como visitante</Text>
          </Pressable>
        </View>

         {/* somente para desenvolvimento até que tenhamos mais telas */}
        <View style={styles.bottomButtons}>
          <Pressable
            onPress={() => navigation.navigate("Requests")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Propostas gerais</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SendRequest")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Enviar proposta</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Reviews")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Avaliações gerais</Text>
          </Pressable>            

          <Pressable
            onPress={() => navigation.navigate("AgendaMob")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Agenda</Text> 
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ProfileCaregiverMob")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Perfil Cuidador</Text> 
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ProfileCarereceiverMob")}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 1.1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Perfil Cliente</Text>      
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    alignItems: "center",
    margin: "auto",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  logo: {
    alignItems: "center",
    marginTop: 40,
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
    fontSize: 17,
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
    marginBottom: 20,
  },
  buttonLoginText: {
    color: "black",
    fontSize: 25,
  },
  bottomButtons: {
    flexDirection: "column",
    //justifyContent: "center",
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#799275",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: "auto",
    width: "30%",
    marginBottom: 10,
    width: 200,
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 13,
  },
});
