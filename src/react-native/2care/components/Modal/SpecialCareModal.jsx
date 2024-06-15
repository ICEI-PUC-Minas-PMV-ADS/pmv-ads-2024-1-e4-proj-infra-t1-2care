import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CARE_TYPES = [
  { id: 0, label: "Cuidados com a Saúde" },
  { id: 1, label: "Apoio Emocional" },
  { id: 2, label: "Fisioterapia" },
  { id: 3, label: "Acompanhamento Médico" },
  { id: 4, label: "Apoio à Mobilidade" },
  { id: 5, label: "Cuidados Pessoais" },
  { id: 6, label: "Apoio Doméstico" },
  { id: 7, label: "Nutrição" },
  { id: 8, label: "Atividades Recreativas" },
  { id: 9, label: "Gestão de Demência/Alzheimer" },
  { id: 10, label: "Suporte Noturno" },
  { id: 11, label: "Gestão da Dor" },
  { id: 12, label: "Cuidados Paliativos" },
];

const SpecialCareModal = ({ visible, onClose, selectedCareTypes, setSelectedCareTypes }) => {
  const toggleCareType = (label) => {
    const updatedCareTypes = selectedCareTypes.includes(label)
      ? selectedCareTypes.filter(careLabel => careLabel !== label)
      : [...selectedCareTypes, label];
    setSelectedCareTypes(updatedCareTypes);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecionar Cuidados Especiais</Text>
          <FlatList
            data={CARE_TYPES}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.careTypeItem,
                  selectedCareTypes.includes(item.label) && styles.selectedCareType
                ]}
                onPress={() => toggleCareType(item.label)}
              >
                <Text style={[
                  styles.careTypeText,
                  selectedCareTypes.includes(item.label) && styles.selectedCareTypeText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  modalView: {
    margin: 20,
    backgroundColor: '#D2DAC3',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#486142'
  },
  careTypeItem: {
    padding: 10,
    borderColor: '#799275',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    backgroundColor: 'white'
  },
  careTypeText: {
    color: '#486142'
  },
  selectedCareType: {
    backgroundColor: '#a9b7a6',
  },
  selectedCareTypeText: {
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#ED8733',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonClose: {
    backgroundColor: '#B65138',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  list: {
    width: '100%',
    marginTop: 10
  }
});

export default SpecialCareModal;