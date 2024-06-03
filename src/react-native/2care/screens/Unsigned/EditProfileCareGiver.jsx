import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserData, getUserEmail } from "../../services/userServiceMob";
import { getCaregiverData, updateCaregiver } from "../../services/caregiverServiceMob";
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
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    post_code: "",
    phone: "",
    gender: "",
    specialization: "",
    //qualifications: "",
    //workexperience: "",
    yearsexperience: "",
    dailyRate: "",
    hourlyRate: "",
    additionalInfo: "",
    address: "", 
    picture: "",
    //preferred_contact: "",
    max_request_km: "",
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const [errors, setErrors] = useState({});

  const fieldLabels = {
    name: "Nome completo",
    birth_date: "Data de nascimento",
    post_code: "CEP",
    phone: "Telefone",
    gender: "Gênero", 
    specialization: "Especialização",
    qualifications: "Qualificações",
    workexperience: "Experiência de trabalho",
    yearsexperience: "Anos de experiência",
    //unavailableDays: "Dias Fixos Indisponíveis",
    dailyRate: "Preço por Dia",
    hourlyRate: "Preço por Hora",
    additionalInfo: "Informações Adicionais",
    address: "Endereço", 
    picture: "Link da imagem",
    max_request_km: "Raio de Atendimento(Km)",
    //preferred_contact: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData();
        const caregiver = await getCaregiverData();

        setUserName(user?.name || 'Nome não disponível');
        setFormData({
          ...formData,
          name: user?.name || '',
          birth_date: user?. birth_date ? user.birth_date.split('-').reverse().join('/') : '',
          post_code: user?.post_code || '',
          phone: user?.phone || '',
          gender: user?.gender || 0,
          address: user?.address || "",
          picture: user?.picture || "",

          specialization: (caregiver?.specializations || []).map(spec => spec.id),
          //qualifications: caregiver?.qualifications || "",
          //workexperience: caregiver?.workexperience || "",
          yearsexperience: caregiver?.career_time || "",
          //unavailableDays: caregiver?.unavailableDays || "",
          dailyRate: caregiver?.day_price || "",
          hourlyRate: caregiver?.hour_price || "",
          additionalInfo: caregiver?.additional_info || ""
        });
        setQualifications((caregiver?.qualifications || []));
        setExperiences((caregiver?.work_exp || []));
        setSelectedGender([caregiver?.gender || 0]);
        setSelectedItems((caregiver?.specializations || []).map(spec => (spec.name.toString())));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

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
    } else if (name === 'yearsexperience') {
      value = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    //setErrors({ ...errors, [name]: "" });
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
      if (!value && value != 0) {
        setErrors(prev => ({ ...prev, [key]: "Campo obrigatório" }));
        hasError = true;
      }
    });
  
    if (!hasError) {
      try {
        const user = {
          name: formData.name,
          birth_date: formData.birth_date.split("/").reverse().join("-"),
          post_code: formData.post_code,
          phone: formData.phone,
          gender: parseInt(formData.gender),
          address: formData.address,
          picture: formData.picture,
          //preferred_contact: formData.preferred_contact,
        };

        const caregiver = {
          gender: parseInt(formData.gender),
          //qualifications: qualifications.join(', '),
          //specialization: selectedItems.map(item => item.id),
          //workexperience: experiences.join(', '),
          career_time: formData.yearsexperience,
          //unavailableDays: formData.unavailableDays,
          day_price: parseFloat(formData.dailyRate.replace("R$","").replace(",",".").trim()),
          hour_price: parseFloat(formData.hourlyRate.replace("R$","").replace(",",".").trim()),
          additional_info: formData.additionalInfo,
          max_request_km: formData.max_request_km
        };
        const response = await updateCaregiver(user, caregiver);
        console.log("Atualização bem-sucedida", response);
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

  const formatYearsExperience = (value) => {
    if (!value) return '';
    const intValue = parseInt(value, 10);
    return intValue === 1 ? `${intValue} ano` : `${intValue} anos`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>Cuidador</Text>
          <Image
            source={{ uri: formData?.picture ? formData.picture :'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
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
            key !== 'additionalInfo' &&
            key !== 'maxRequestKm'
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
              value={formatYearsExperience(formData.yearsexperience)}
              onChangeText={(text) => handleChange('yearsexperience', text)}
              keyboardType="numeric"
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['unavailableDays']}</Text>
            <TextInput
              style={styles.input}
              value={formData.unavailableDays}
              onChangeText={(text) => handleChange('unavailableDays', text)}
              multiline={true}
              numberOfLines={1}
            />
          </View> */}
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
            <Text style={styles.label}>{fieldLabels['max_request_km']}</Text>
            <TextInput
              style={styles.input}
              value={formData.max_request_km}
              onChangeText={(text) => handleChange('max_request_km', text)}
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
            <Pressable style={[styles.button, styles.cancelButton]} onPress={() => {handleCancel()}}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.saveButton]} onPress={() => {handleSubmit()}}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <QualificationsModal
        visible={modalVisible}
        onClose={handleCloseModal}
        qualifications={qualifications}
        addQualification={handleAddQualification}
      />
      <WorkExperienceModal
        visible={experienceModalVisible}
        experiences={experiences}
        onClose={handleCloseExperienceModal}
        addExperience={handleAddExperience}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f6f6f6",
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
    marginTop: 20,
    flex: 1,
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EditProfileScreenCareGiver;