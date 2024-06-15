import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, SafeAreaView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserData, getUserEmail } from "../../services/userServiceMob";
import { getCareReceiverData, updateCareReceiver } from "../../services/careReceiverMob";
import GenderPicker from "../../components/Picker/GenderPicker.jsx";
import SpecialCareModal from "../../components/Modal/SpecialCareModal.jsx";

const EditProfileScreenCareReceiver = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    phone: "",
    gender: 0,
    specialCare: "",
    emergencyContact: "",
    post_code: "",
    personalInfo: "",
    share_special_care: false,
    picture: "",
  });
  const [selectedGender, setSelectedGender] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const fieldLabels = {
    name: "Nome completo",
    birth_date: "Data de nascimento",
    phone: "Telefone",
    gender: "Gênero",
    specialCare: "Cuidados Especiais",
    emergencyContact: "Contato de Emergência",
    post_code: "CEP",
    personalInfo: "Informações Pessoais",
    share_special_care: "Compartilhar Cuidados Especiais",
    picture: "Link da imagem",
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
          name: user?.name || '',
          birth_date: user?.birth_date ? user.birth_date.split('-').reverse().join('/') : '',
          post_code: user?.post_code || '',
          phone: user?.phone || '',
          picture: user?.picture || "",
          gender: careReceiver?.gender || 0,
          specialCare: careReceiver?.specialCare || "", // Mantido como string
          emergencyContact: careReceiver?.emergency_contact || "",
          personalInfo: careReceiver?.additional_info || "",
          share_special_care: careReceiver?.share_special_care || false,
        });

        setSelectedGender([careReceiver?.gender || ""]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name, value) => {
    if (['post_code', 'phone', 'emergencyContact'].includes(name)) {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'post_code') {
        value = value.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
      } else if (name === 'phone' || name === 'emergencyContact') {
        value = value.slice(0, 11).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      }
      setFormData({ ...formData, [name]: value });
    } else if (name === 'birth_date') {
      value = value.replace(/[^0-9]/g, '');
      value = value.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    let hasError = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && value != 0 && key !== 'password' && key !== 'confirm_password') {
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
        };
        const careReceiver = {
          specialCare: formData.specialCare, 
          emergency_contact: formData.emergencyContact,
          additional_info: formData.personalInfo,
          share_special_care: formData.share_special_care,
        };

        if (formData.share_special_care) {
          careReceiver.specialCare = formData.specialCare.split(', ').map(item => item.trim());
        }

        const response = await updateCareReceiver(user, careReceiver);
        console.log("Atualização bem-sucedida", response);

        // Atualizar os dados no front-end
        setFormData({
          ...formData,
          ...response.user,
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

  const handleSpecialCareChange = (selectedCareTypes) => {
    setFormData({ ...formData, specialCare: selectedCareTypes.join(', ') });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>Cliente</Text>
          <Image
            source={{ uri: formData?.picture ? formData.picture : 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg' }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.form}>
          {Object.keys(formData).filter(key =>
            key !== 'gender' &&
            key !== 'specialCare' &&
            key !== 'personalInfo' &&
            key !== 'share_special_care'
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
            <Text style={styles.label}>{fieldLabels['specialCare']}</Text>
            <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
              <Text>{formData.specialCare || 'Selecione os cuidados especiais'}</Text>
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{fieldLabels['share_special_care']}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#a9b7a6" }}
              thumbColor={formData.share_special_care ? "#f4bc8c" : "#d06d39"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setFormData({ ...formData, share_special_care: !formData.share_special_care })}
              value={formData.share_special_care}
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
      <SpecialCareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCareTypes={formData.specialCare.split(', ').map(item => item.trim())}
        setSelectedCareTypes={handleSpecialCareChange}
      />
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