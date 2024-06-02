import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, SafeAreaView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserData, getUserEmail } from "../../services/userServiceMob";
import { getCareReceiverData, updateCareReceiver } from "../../services/careReceiverMob";
import GenderPicker from "../../components/Picker/GenderPicker.jsx";

const formatDateToDisplay = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateToSave = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

const EditProfileScreenCareReceiver = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  
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

  const [selectedGender, setSelectedGender] = useState([]);
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
    emergencyContact: "Contato de Emergência",
    post_code: "CEP",
    personalInfo: "Informações Pessoais",
    shareSpecialCare: "Compartilhar Cuidados Especiais"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData();
        const careReceiver = await getCareReceiverData();
        const userEmail = await getUserEmail();

        setUserName(user?.name || 'Nome não disponível');
        setEmail(userEmail || 'Email não disponível');
        setFormData({
          ...formData,
          email: userEmail || '',
          name: user?.name || '',
          birth_date: formatDateToDisplay(user?.birth_date || ''),
          post_code: user?.post_code || '',
          phone: user?.phone || '',
          gender: careReceiver?.gender || "",
          specialCare: careReceiver?.specialCare || "",
          emergencyContact: careReceiver?.emergencyContact || "",
          personalInfo: careReceiver?.personalInfo || "",
          shareSpecialCare: careReceiver?.shareSpecialCare || false,
        });
        setSelectedGender([careReceiver?.gender || ""]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name, value) => {
    if (name === 'birth_date') {
      value = value.replace(/[^0-9/]/g, '');
      if (value.length === 2 || value.length === 5) {
        value += '/';
      }
    }
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    let hasError = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'password' && key !== 'confirm_password') {
        setErrors(prev => ({ ...prev, [key]: "Campo obrigatório" }));
        hasError = true;
      }
    });

    if (!hasError) {
      try {
        const user = {
          email: formData.email,
          name: formData.name,
          birth_date: formatDateToSave(formData.birth_date),
          post_code: formData.post_code,
          phone: formData.phone,
        };
        const careReceiver = {
          gender: formData.gender,
          specialCare: formData.specialCare,
          emergencyContact: formData.emergencyContact,
          personalInfo: formData.personalInfo,
          shareSpecialCare: formData.shareSpecialCare,
        };
  
        const response = await updateCareReceiver(user, careReceiver);
        console.log("Atualização bem-sucedida", response);
        
        // Atualizar os dados no front-end
        setFormData({
          ...formData,
          ...response.user,
          birth_date: formatDateToDisplay(response.user.birth_date),
          ...response.careReceiver,
        });
        
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>Cliente</Text>
          <Image
            source={{ uri: 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.form}>
          {Object.keys(formData).filter(key => 
            key !== 'gender' && 
            key !== 'specialCare' &&
            key !== 'personalInfo' &&
            key !== 'shareSpecialCare'
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
            <Text style={styles.label}>Cuidados Especiais</Text>
            <TextInput
              style={styles.input}
              value={formData.specialCare}
              onChangeText={(text) => handleChange('specialCare', text)}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['shareSpecialCare']}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#a9b7a6" }}
              thumbColor={formData.shareSpecialCare ? "#f4bc8c" : "#d06d39"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setFormData({ ...formData, shareSpecialCare: !formData.shareSpecialCare })}
              value={formData.shareSpecialCare}
              style={styles.switch}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Informações Pessoais</Text>
            <TextInput
              style={styles.input}
              value={formData.personalInfo}
              onChangeText={(text) => handleChange('personalInfo', text)}
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
    padding: 20,
    backgroundColor: "#f6f6f6"
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
  switch: {
    marginLeft: 70,
  },
  safeArea: {
    flex: 1,
  }
});

export default EditProfileScreenCareReceiver;