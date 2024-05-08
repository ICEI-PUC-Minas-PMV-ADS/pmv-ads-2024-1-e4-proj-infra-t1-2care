import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Picker,
  StyleSheet,
} from "react-native";
import theme from "../../theme/theme.js";
import { useNavigation } from "@react-navigation/native";

const CaregiverFormMob = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    phone: "",
    user_type: 1,
    gender: "",
    address: "",
    post_code: "",
  });
  const [errors, setErrors] = useState({});

  {
    /*}  useEffect(() => {
    if (phoneInputRef.current) {
      Inputmask({
        mask: ['(99) 9999-9999', '(99) 99999-9999'],
        placeholder: '(**) ****-****',
      }).mask(phoneInputRef.current);
    }
  }, [phoneInputRef]);
  
  useEffect(() => {
    if (codePostInputRef.current) {
      Inputmask({
        mask: '99999-999',
        placeholder: '*****-***',
      }).mask(codePostInputRef.current);
    }
  }, [codePostInputRef]);
  

  const phoneInputRef = useRef(null);
  const codePostInputRef = useRef(null);*/
  }

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validateCEP = (cep) => {
    const re = /^\d{5}-\d{3}$/;
    return re.test(cep);
  };

  const validatePhone = (phone) => {
    const re = /^\(\d{2}\)\s?\d?\d{4}-\d{4}$/;
    return re.test(phone);
  };

  const handleBlur = (name, value) => {
    const validationErrors = {};

    if (name === "email" && !validateEmail(value)) {
      validationErrors[name] = "Por favor, insira um e-mail válido.";
    } else if (name === "post_code" && !validateCEP(value)) {
      validationErrors[name] = "Por favor, insira um CEP válido.";
    }
    setErrors({ ...errors, ...validationErrors });
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
      navigation.navigate("ScreenTest");
    } catch (error) {
      console.error("Erro ao cadastrar o Cliente:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRegister}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          onBlur={() => handleBlur("email", formData.email)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          onBlur={() => handleBlur("password", formData.password)}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          value={formData.confirm_password}
          onChangeText={(text) => handleChange("confirm_password", text)}
          onBlur={() =>
            handleBlur("confirm_password", formData.confirm_password)
          }
          secureTextEntry={true}
        />
        {errors.confirm_password && (
          <Text style={styles.error}>{errors.confirm_password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
          onBlur={() => handleBlur("name", formData.name)}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={formData.birth_date}
          onChangeText={(text) => handleChange("birth_date", text)}
          onBlur={() => handleBlur("birth_date", formData.birth_date)}
        />
        {errors.birth_date && (
          <Text style={styles.error}>{errors.birth_date}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Telefone/Celular"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          onBlur={() => handleBlur("phone", formData.phone)}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

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
        {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={formData.address}
          onChangeText={(text) => handleChange("address", text)}
          onBlur={() => handleBlur("address", formData.address)}
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}

        <TextInput
          style={styles.input}
          placeholder="CEP"
          value={formData.post_code}
          onChangeText={(text) => handleChange("post_code", text)}
          onBlur={() => handleBlur("post_code", formData.post_code)}
        />
        {errors.post_code && (
          <Text style={styles.error}>{errors.post_code}</Text>
        )}
      </View>

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </Pressable>
    </View>
  );
};

export default CaregiverFormMob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formRegister:{
    flexDirection: "column",
    //justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginHorizontal: "auto",
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
  button: {
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 170,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    color : "#FFFFFF",
    textAlign: "center",
    margin: "auto",
    fontSize: 20,
  },
});
