import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    post_code: "",
    phone: "",
    gender: "",
    specialization: "",
    qualifications: ""
  });

  const [errors, setErrors] = useState({});

  const fieldLabels = {
    email: "E-mail",
    password: "Senha",
    confirm_password: "Confirmar senha",
    name: "Nome completo",
    birth_date: "Data de nascimento",
    post_code: "CEP",
    phone: "Telefone",
    gender: "Gênero",
    specialization: "Especialização",
    qualifications: "Qualificações"
  };

  const handleChange = (name, value) => {
    if (['birth_date', 'post_code', 'phone'].includes(name)) {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'birth_date') {
        value = value.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      } else if (name === 'post_code') {
        value = value.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
      } else if (name === 'phone') {
        value = value.slice(0, 11).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      }
    }
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    let hasError = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        setErrors(prev => ({ ...prev, [key]: "Campo obrigatório" }));
        hasError = true;
      }
    });
    if (!hasError) {
      console.log("Formulário submetido com sucesso", formData);
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileName}>João Silva</Text>
        <Text style={styles.profileRole}>Cuidador</Text>
        <Image
          source={{ uri: 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.form}>
        {Object.keys(formData).filter(key => key !== 'gender' && key !== 'specialization' && key !== 'qualifications').map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels[key]}</Text>
            <TextInput
              style={styles.input}
              value={formData[key]}
              onChangeText={(text) => handleChange(key, text)}
              onBlur={() => handleChange(key, formData[key])}
              secureTextEntry={key.includes("password")}
              placeholder={`...  ${fieldLabels[key].toLowerCase()}`}
              keyboardType={['birth_date', 'post_code', 'phone'].includes(key) ? 'numeric' : 'default'}
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </View>
        ))}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{fieldLabels['gender']}</Text>
          <Picker
            selectedValue={formData.gender}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => handleChange('gender', itemValue)}
          >
            <Picker.Item label="Selecione o gênero" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Especialização</Text>
          <Picker
            selectedValue={formData.specialization}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => handleChange('specialization', itemValue)}
          >
            <Picker.Item label="Selecione a especialização" value="" />
            <Picker.Item label="Especialização A" value="A" />
            <Picker.Item label="Especialização B" value="B" />
            <Picker.Item label="Especialização C" value="C" />
            <Picker.Item label="Especialização D" value="D" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Qualificações</Text>
          <TextInput
            style={styles.input}
            value={formData.qualifications}
            onChangeText={(text) => handleChange('qualifications', text)}
            placeholder="Digite suas qualificações"
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.buttonContainer}>
         <Pressable style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
           <Text style={styles.buttonText}>Salvar</Text>
         </Pressable>
         <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
           <Text style={styles.buttonText}>Cancelar</Text>
         </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f0"
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10
  },
  profileRole: {
    fontSize: 18,
    color: "#666"
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10
  },
  form: {
    marginTop: 20
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    position: "absolute",
    backgroundColor: "#a9b7a6",
    left: 10,
    top: -10,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#64785d"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    color: '#64785d',
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  errorText: {
    fontSize: 12,
    color: "red"
  },
  picker: {
    width: '100%',
    backgroundColor: '#f1f1f0',
    color: '#64785d',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  pickerItem: {
    color: 'red'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveButton: {
    marginRight: 10,
  },
  cancelButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  errorText: {
    fontSize: 12,
    color: "red"
  },
});

export default EditProfileScreen;