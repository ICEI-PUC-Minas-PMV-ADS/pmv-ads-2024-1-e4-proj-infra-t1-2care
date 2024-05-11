import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Picker,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../services/userServiceMob";

const CarereceiverFormMob = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    phone: "",
    user_type: 2,
    gender: "",
    address: "",
    post_code: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    let updatedValue = value;

    if (name === "post_code") {
      updatedValue = value.replace(/\D/g, "");
      updatedValue = updatedValue.slice(0, 8);
      if (updatedValue.length > 5) {
        updatedValue = updatedValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
      }
    }

    if (name === "birth_date") {
      updatedValue = value.replace(/\D/g, "");

      if (updatedValue.length > 2) {
        updatedValue = `${updatedValue.slice(0, 2)}/${updatedValue.slice(2)}`;
      }
      if (updatedValue.length > 5) {
        updatedValue = `${updatedValue.slice(0, 5)}/${updatedValue.slice(
          5,
          9
        )}`;
      }
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }
    }

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "");
      updatedValue = updatedValue.slice(0, 11);
      // Formata o telefone para o padrão (00) 99999-0000 ou (00) 3333-0000
      updatedValue = updatedValue.replace(
        /^(\d{2})(\d{4,5})(\d{4})$/,
        "($1) $2-$3"
      );
    }

    setFormData({ ...formData, [name]: updatedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validatePasswordConfirmation = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateGender = (gender) => {
    return gender !== "Selecione";
  };

  const validatePhone = (phone) => {
    const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return re.test(phone);
  };

  const validateCEP = (cep) => {
    const re = /^\d{5}-\d{3}$/;
    return re.test(cep);
  };

  const handleBlur = (name, value) => {
    const validationErrors = {};

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          validationErrors.email = "Por favor, insira um e-mail válido.";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          validationErrors.password =
            "A senha deve ter no mínimo 6 caracteres.";
        }
        break;
      case "confirm_password":
        if (value !== formData.password) {
          validationErrors.confirm_password = "As senhas não coincidem.";
        }
        break;
      case "birth_date":
        if (!value || value.length !== 10) {
          validationErrors.birth_date =
            "Por favor, insira sua data de nascimento.";
        }
        break;
      case "name":
        if (!value) {
          validationErrors.name = "Por favor, preencha seu nome completo.";
        }
        break;
      case "phone":
        if (!validatePhone(value)) {
          validationErrors.phone =
            "Por favor, insira um número de telefone válido.";
        }
        break;
      case "gender":
        if (!value) {
          validationErrors.gender = "Por favor, selecione seu gênero.";
        }
        break;
      case "address":
        if (!value) {
          validationErrors.address = "Por favor, insira seu endereço.";
        }
        break;
      case "post_code":
        if (!value) {
          validationErrors.post_code = "Por favor, insira um CEP válido.";
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, ...validationErrors });
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return <Text style={styles.error}>{errors[fieldName]}</Text>;
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Por favor, insira um e-mail válido.";
    }

    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (formData.password !== formData.confirm_password) {
      validationErrors.confirm_password = "As senhas não coincidem.";
    }

    if (!formData.birth_date) {
      validationErrors.birth_date = "Por favor, insira sua data de nascimento.";
    }

    if (!formData.name) {
      validationErrors.name = "Por favor, preencha seu nome completo.";
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      validationErrors.phone =
        "Por favor, insira um número de telefone válido.";
    }

    if (!formData.gender) {
      validationErrors.gender = "Por favor, selecione seu gênero.";
    }

    if (!formData.address) {
      validationErrors.address = "Por favor, insira seu endereço.";
    }

    if (!formData.post_code || !validateCEP(formData.post_code)) {
      validationErrors.post_code = "Por favor, insira um CEP válido.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      console.log("Usuário registrado com sucesso");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao cadastrar o Cliente:", error.message);
    }
  };

  const CustomLabel = ({ text }) => {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRegister}>
        
        <View style={styles.inputContainer}>
          <CustomLabel text="E-mail" />
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            onBlur={() => handleBlur("email", formData.email)}
          />
            {errors.email ? (
             <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}          
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Senha" />
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            onBlur={() => handleBlur("password", formData.password)}
            secureTextEntry={true}
          />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Confirmar Senha" />
          <TextInput
            style={styles.input}
            value={formData.confirm_password}
            onChangeText={(text) => handleChange("confirm_password", text)}
            onBlur={() =>
              handleBlur("confirm_password", formData.confirm_password)
            }
            secureTextEntry={true}
          />
          {errors.confirm_password ? (
            <Text style={styles.errorText}>{errors.confirm_password}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Nome completo" />
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            onBlur={() => handleBlur("name", formData.name)}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Data de Nascimento" />
          <TextInput
            style={styles.input}
            value={formData.birth_date}
            onChangeText={(text) => handleChange("birth_date", text)}
            onBlur={() => handleBlur("birth_date", formData.birth_date)}
          />
          {errors.birth_date ? (
            <Text style={styles.errorText}>{errors.birth_date}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Telefone/Celular" />
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            onBlur={() => handleBlur("phone", formData.phone)}
          />
          {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Gênero" />
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleChange("gender", itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Masculino" value="1" />
            <Picker.Item label="Feminino" value="2" />
            <Picker.Item label="Não especificado" value="0" />
          </Picker>
          {errors.gender ? (
          <Text style={styles.errorText}>{errors.gender}</Text>
        ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="Endereço" />
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
            onBlur={() => handleBlur("address", formData.address)}
          />
          {errors.address ? (
          <Text style={styles.errorText}>{errors.address}</Text>
        ) : null}
        </View>

        <View style={styles.inputContainer}>
          <CustomLabel text="CEP" />
          <TextInput
            style={styles.input}
            value={formData.post_code}
            onChangeText={(text) => handleChange("post_code", text)}
            onBlur={() => handleBlur("post_code", formData.post_code)}
          />
          {errors.post_code ? (
          <Text style={styles.errorText}>{errors.post_code}</Text>
        ) : null}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CarereceiverFormMob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "10%",
    marginTop: 40,
    alignItems: "center",
    width: "100%",
  },
  formRegister: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "#D2DAC3",
    paddingLeft: 2,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 8,
    top: -10,
    left: 10,
    opacity: 0.7,
    height: "auto",
    textAlign: "center",
    width: "auto",
    borderRadius: 5,
  },
  labelText: {
    color: "#486142",
    fontSize: 13,
    lineHeight: 2,
    fontWeight: 400,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 3,
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: "white",
    fontSize: 17,
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
    width: "100%",
  },
  picker: {
    width: "100%",
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: "white",
    fontSize: 15,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 170,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});
