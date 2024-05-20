import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, Platform, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../../components/SearchBar.jsx';
import { updateCaregiver } from "../../services/caregiverServiceMob.js";
import QualificationsModal from "../../components/Modal/QualificationsModal.jsx";

const EditProfileScreenCareGiver = () => {
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
    unavailableDays: "",
    dailyRate: "",
    hourlyRate: "",
    additionalInfo: ""
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { id: '1', name: "Cuidados Básicos de Saúde"},
    { id: '2', name: "Apoio à Mobilidade"},
    { id: '3', name: "Higiene e Cuidados Pessoais"},
    { id: '4', name: "Nutrição e Preparo de Refeições"},
    { id: '5', name: "Estimulação Cognitiva e Emocional"},
    { id: '6', name: "Acompanhamento e Transporte"},
    { id: '7', name: "Gestão de Rotinas e Medicamentos"},
    { id: '8', name: "Cuidados com o Ambiente Doméstico"},
    { id: '9', name: "Suporte em Cuidados Paliativos"},
    { id: '10', name: "Formação em Demência e Alzheimer"},
  ];

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
    value = value.replace(/\D/g, '');
  
    const intValue = parseInt(value, 10);
  
    if (!isNaN(intValue)) {
      return (intValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  
    return '';
  };

  const handleSubmit = async () => {
    let hasError = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        setErrors(prev => ({ ...prev, [key]: "Campo obrigatório" }));
        hasError = true;
      }
    });

    if (!hasError) {
      try {
        const user = {
          email: formData.email,
          name: formData.name,
          // add outros campos
        };
        const caregiver = {
          gender: formData.gender,
          qualifications: formData.qualifications,
          specialization: selectedItems,
          workexperience: formData.workexperience,
          unavailableDays: formData.unavailableDays,
          dailyRate: formData.dailyRate,
          hourlyRate: formData.hourlyRate,
          additionalInfo: formData.additionalInfo,
          // add outros campos de caregiver
        };

        const response = await updateCaregiver(user, caregiver);
        console.log("Atualização bem-sucedida", response);
        navigation.goBack();
      } catch (error) {
        console.error("Erro na atualização", error);
        alert('Erro ao atualizar dados. Por favor, tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchBarContainer}>
        <SearchBar></SearchBar>
      </View>
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
            <View style={styles.pickerContainer}>
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
          </View>
          <View>
          <Text style={styles.label}>{fieldLabels['specialization']}</Text>
          <View style={styles.pickerContainer}>
          <SectionedMultiSelect
            items={items}
            IconRenderer={Icon} 
            uniqueKey="id"
            subKey="children"
            selectText="Escolha alguma opção"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={setSelectedItems}
            selectedItems={selectedItems}
          />
          </View>
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
    padding: 2,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff"
  },
  searchBarContainer: {
    width: '100%', 
    backgroundColor: "#fff",
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
    position: "relative",
  },
  label: {
    position: "absolute",
    backgroundColor: "#a9b7a6",
    left: 10,
    top: -10,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#486142",
    borderRadius: 10,
    zIndex: 1,
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
  pickerContainer: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10, 
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff', 
  },
  picker: {
    color: '#64785d',
    backgroundColor: '#ffffff', 
    width: '100%',
  },
  pickerItem: {
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
    backgroundColor: "#ED8733",
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: "#B65138",
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20
  }
});

export default EditProfileScreenCareGiver;