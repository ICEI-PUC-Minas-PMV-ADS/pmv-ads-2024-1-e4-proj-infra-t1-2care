import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const items = [
  { id: '1', name: "Cuidados Básicos de Saúde" },
  { id: '2', name: "Apoio à Mobilidade" },
  { id: '3', name: "Higiene e Cuidados Pessoais" },
  { id: '4', name: "Nutrição e Preparo de Refeições" },
  { id: '5', name: "Estimulação Cognitiva e Emocional" },
  { id: '6', name: "Acompanhamento e Transporte" },
  { id: '7', name: "Gestão de Rotinas e Medicamentos" },
  { id: '8', name: "Cuidados com o Ambiente Doméstico" },
  { id: '9', name: "Suporte em Cuidados Paliativos" },
  { id: '10', name: "Formação em Demência e Alzheimer" },
];

const SpecializationPicker = ({ selectedItems, onSelectedItemsChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item.id)) {
      onSelectedItemsChange(selectedItems.filter(id => id !== item.id));
    } else {
      onSelectedItemsChange([...selectedItems, item.id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Especialização</Text>
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {selectedItems.length > 0 ? `Selecionado: ${selectedItems.length}` : 'Selecione alguma Especialização'}
        </Text>
        <Icon name="arrow-drop-down" color="#486142" />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione Especializações</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.item, 
                    selectedItems.includes(item.id) ? styles.selectedItem : null
                  ]}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  {selectedItems.includes(item.id) && <Icon name="check" color="#486142" />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#799275",
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#486142',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#486142',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 16,
    color: '#486142',
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  confirmButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ED8733',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SpecializationPicker;