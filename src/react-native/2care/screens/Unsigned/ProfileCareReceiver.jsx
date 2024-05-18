import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, Platform, SafeAreaView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

const EditProfileScreenCareReceiver = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    phone: "",
    gender: "",
    specialCare: "",              
    emergencyContact: "",         
    post_code: "",
    personalInfo: "",              
    shareSpecialCare: false,
  });

  const [errors, setErrors] = useState({});

  const fieldLabels = {
    email: "E-mail",
    password: "Senha",
    confirm_password: "Confirmar senha",
    name: "Nome completo",
    birth_date: "Data de nascimento",
    phone: "Telefone",
    gender: "Gênero",
    specialCare: "Cuidados Especiais",
    shareSpecialCare: "Compartilhar Cuidados Especiais", // Movido para renderizar após Cuidados Especiais
    emergencyContact: "Contato de Emergência",
    post_code: "CEP",
    personalInfo: "Informações Pessoais",
  };

  const handleChange = (name, value) => {
    if (['birth_date', 'post_code', 'phone', 'emergencyContact'].includes(name)) {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'birth_date') {
        value = value.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      } else if (name === 'post_code') {
        value = value.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
      } else if (['phone', 'emergencyContact'].includes(name)) {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profileName}>Maria Augusta Oliveira</Text>
          <Text style={styles.profileRole}>Recebedor de Cuidados</Text>
          <Image
            source={{ uri: 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.form}>
          {Object.entries(fieldLabels).map(([key, label]) => (
            <View key={key} style={styles.inputContainer}>
              <Text style={key === 'shareSpecialCare' ? styles.specialLabel : styles.label}>
                {label}
              </Text>
              {key === 'gender' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData[key]}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue) => handleChange(key, itemValue)}
                >
                  <Picker.Item label="Selecione o gênero" value="" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Feminino" value="Feminino" />
                  <Picker.Item label="Outro" value="Outro" />
                </Picker>
              </View>
              ) : key === 'shareSpecialCare' ? (
                <Switch
                  trackColor={{ false: "#767577", true: "#a9b7a6" }}
                  thumbColor={formData.shareSpecialCare ? "#f4bc8c" : "#d06d39"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setFormData({ ...formData, shareSpecialCare: !formData.shareSpecialCare })}
                  value={formData.shareSpecialCare}
                  style={styles.switch}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  value={formData[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  secureTextEntry={key.includes("password")}
                  placeholder={`${fieldLabels[key].toLowerCase()}`}
                  keyboardType={['birth_date', 'post_code', 'phone', 'emergencyContact'].includes(key) ? 'numeric' : 'default'}
                  multiline={['specialCare', 'personalInfo'].includes(key)}
                  numberOfLines={['specialCare', 'personalInfo'].includes(key) ? 3 : 1}
                />
              )}
              {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff"
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    position: "absolute",
    backgroundColor: "#a9b7a6",
    left: 10,
    top: -10,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#64785d",
    borderRadius: 10,
    zIndex: 1,
  },
  specialLabel: {
    flex: 1,
    fontSize: 12,
    color: "#64785d",
    backgroundColor: "#a9b7a6",
    paddingHorizontal: 10,
    left: 10,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    borderRadius: 30,
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: "#f4bc8c",
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: "#d06d39",
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  errorText: {
    fontSize: 12,
    color: "red"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10, 
    marginBottom: 20,
    width: '100%', 
  },
  picker: {
    color: '#64785d',
    backgroundColor: '#ffffff', 
    width: '100%',
  },
  pickerItem: {
    color: '#64785d',
  },
  switch: {
    marginLeft: 70,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS ? 40 : 20
  }
});

export default EditProfileScreenCareReceiver;