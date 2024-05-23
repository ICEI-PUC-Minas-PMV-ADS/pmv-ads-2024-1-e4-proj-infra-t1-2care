import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, Platform, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../../components/SearchBar.jsx';
import { updateCaregiver } from "../../services/caregiverServiceMob.js";
import QualificationsModal from "../../components/Modal/QualificationsModal.jsx";
import WorkExperienceModal from "../../components/Modal/WorkExperienceModal.jsx";
import SpecializationPicker from "../../components/Picker/SpecializationPicker.jsx";
import GenderPicker from "../../components/Picker/GenderPicker.jsx";

const screenWidth = Dimensions.get('window').width;

const EditProfileScreenCareGiver = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  
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
          qualifications: qualifications.join(', '), // Certifique-se de que qualificações estejam aqui
          specialization: selectedItems,
          workexperience: experiences.map(exp => `${exp.experience} (${exp.link})`).join(', '), // Formate a experiência de trabalho
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

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddQualification = (qualification) => {
    setQualifications([...qualifications, qualification]);
  };

  const handleOpenExperienceModal = () => {
    setExperienceModalVisible(true);
  };

  const handleCloseExperienceModal = () => {
    setExperienceModalVisible(false);
  };

  const handleAddExperience = (experience) => {
    setExperiences([...experiences, experience]);
  };

  const handleGenderChange = (selectedItems) => {
    if (selectedItems.length > 0) {
      handleChange('gender', selectedItems[0]);
    } else {
      handleChange('gender', '');
    }
    setSelectedGender(selectedItems);
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
                />
                {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
            </View>
          ))}
          <View style={styles.inputContainer}>
            <GenderPicker
              selectedItems={selectedGender}
              onSelectedItemsChange={handleGenderChange}
            />
          </View>
          <View style={styles.inputContainer}>
            <SpecializationPicker
              selectedItems={selectedItems}
              onSelectedItemsChange={setSelectedItems}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Qualificações</Text>
            <TouchableOpacity style={styles.openModalButton} onPress={handleOpenModal}>
              <Text style={styles.openModalButtonText}>Adicionar Qualificações</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Experiência de trabalho</Text>
            <TouchableOpacity style={styles.openModalButton} onPress={handleOpenExperienceModal}>
              <Text style={styles.openModalButtonText}>Adicionar Experiência de Trabalho</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Anos de experiência</Text>
            <TextInput
              style={styles.input}
              value={formData.yearsexperience}
              onChangeText={(text) => handleChange('yearsexperience', text)}
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
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['hourlyRate']}</Text>
            <TextInput
              style={styles.input}
              value={formData.hourlyRate}
              onChangeText={(text) => handleChange('hourlyRate', text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['additionalInfo']}</Text>
            <TextInput
              style={styles.input}
              value={formData.additionalInfo}
              onChangeText={(text) => handleChange('additionalInfo', text)}
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
      <QualificationsModal
        visible={modalVisible}
        onClose={handleCloseModal}
        addQualification={handleAddQualification}
      />
      <WorkExperienceModal
        visible={experienceModalVisible}
        onClose={handleCloseExperienceModal}
        addExperience={handleAddExperience}
      />
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
    position: "relative",
  },
  label: {
    position: "absolute",
    backgroundColor: "#D2DAC3",
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
    borderColor: "#799275",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    color: '#486142',
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#799275",
    borderRadius: 5,
    padding: 10, 
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff', 
  },
  picker: {
    color: '#486142',
    backgroundColor: '#ffffff', 
    width: '100%',
  },
  pickerItem: {
    color: '#486142',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20
  },
  openModalButton: {
    backgroundColor: "#ED8733",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  openModalButtonText: {
    color: "white",
    fontSize: 16
  }
});

export default EditProfileScreenCareGiver;