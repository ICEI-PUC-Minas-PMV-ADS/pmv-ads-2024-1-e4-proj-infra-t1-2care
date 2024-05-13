import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native';

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
    qualifications: "",
    workexperience: "",
    yearsexperience: "",
    unavailableDays: "", // Dias Fixos Indisponíveis
    dailyRate: "",       // Preço por Dia
    hourlyRate: "",      // Preço por Hora
    additionalInfo: ""   // Informações Adicionais
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
    qualifications: "Qualificações",
    workexperience: "Experiência de trabalho",
    yearsexperience: "Anos de experiência",
    unavailableDays: "Dias Fixos Indisponíveis",
    dailyRate: "Preço por Dia",
    hourlyRate: "Preço por Hora",
    additionalInfo: "Informações Adicionais"
  };

  const handleChange = (name, value) => {
    if (['dailyRate', 'hourlyRate'].includes(name)) {
      // Formatar a entrada como moeda
      const formattedValue = formatCurrency(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else if (['birth_date', 'post_code', 'phone'].includes(name)) {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'birth_date') {
        value = value.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      } else if (name === 'post_code') {
        value = value.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
      } else if (name === 'phone') {
        value = value.slice(0, 11).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      }
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const formatCurrency = (value) => {
    // Remover tudo que não é número ou ponto
    value = value.replace(/[^0-9.]/g, '');
  
    // Converter para float
    const num = parseFloat(value);
  
    // Checar se é um número válido para evitar NaN
    if (!isNaN(num)) {
      // Formatar como moeda
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return ''; // Caso não seja um número válido, retornar string vazia
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
          <Text style={styles.profileName}>João Silva</Text>
          <Text style={styles.profileRole}>Cuidador</Text>
          <Image
            source={{ uri: 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.form}>
          {Object.keys(formData).filter(key => 
            key !== 'gender' && 
            key !== 'specialization' && 
            key !== 'qualifications' && 
            key !== 'workexperience' && 
            key !== 'yearsexperience' &&
            key !== 'unavailableDays' &&
            key !== 'dailyRate' &&
            key !== 'hourlyRate' &&
            key !== 'additionalInfo'
        ).map((key) => (
            <View key={key} style={styles.inputContainer}>
                <Text style={styles.label}>{fieldLabels[key]}</Text>
                <TextInput
                    style={styles.input}
                    value={formData[key]}
                    onChangeText={(text) => handleChange(key, text)}
                    onBlur={() => handleChange(key, formData[key])}
                    secureTextEntry={key.includes("password")}
                    placeholder={`${fieldLabels[key].toLowerCase()}`}
                    keyboardType={['birth_date', 'post_code', 'phone', 'dailyRate', 'hourlyRate'].includes(key) ? 'numeric' : 'default'}
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
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Experiência de trabalho</Text>
            <TextInput
              style={styles.input}
              value={formData.workexperience}
              onChangeText={(text) => handleChange('workexperience', text)}
              placeholder="Digite suas experiências de trabalho"
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Anos de experiência</Text>
            <TextInput
              style={styles.input}
              value={formData.yearsexperience}
              onChangeText={(text) => handleChange('yearsexperience', text)}
              placeholder="Digite seus anos de experiências"
              multiline={true}
              numberOfLines={1}
            />
          </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['unavailableDays']}</Text>
            <TextInput
              style={styles.input}
              value={formData.unavailableDays}
              onChangeText={(text) => handleChange('unavailableDays', text)}
              placeholder="Informe os dias indisponíveis"
              multiline={true}
              numberOfLines={1}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['dailyRate']}</Text>
            <TextInput
              style={styles.input}
              value={formData.dailyRate}
              onChangeText={(text) => handleChange('dailyRate', text)}
              placeholder="Informe o preço por dia"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['hourlyRate']}</Text>
            <TextInput
              style={styles.input}
              value={formData.hourlyRate}
              onChangeText={(text) => handleChange('hourlyRate', text)}
              placeholder="Informe o preço por hora"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['additionalInfo']}</Text>
            <TextInput
              style={styles.input}
              value={formData.additionalInfo}
              onChangeText={(text) => handleChange('additionalInfo', text)}
              placeholder="Digite informações adicionais"
              multiline={true}
              numberOfLines={3}
            />
          </View>
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
    padding: 10,
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
    position: "relative",
  },
  label: {
    position: "absolute",
    backgroundColor: "#a9b7a6",
    left: 10,
    top: -10,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#64785d",
    borderRadius: 10
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
    backgroundColor: '#ffffff',
    color: '#64785d',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
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
  safeArea: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default EditProfileScreen;