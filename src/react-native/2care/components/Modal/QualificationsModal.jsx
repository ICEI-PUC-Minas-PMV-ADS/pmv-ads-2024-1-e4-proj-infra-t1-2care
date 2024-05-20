import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QualificationsModal = ({ visible, onClose }) => {
  const [qualifications, setQualifications] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddQualification = () => {
    if (inputValue.trim()) {
      setQualifications([...qualifications, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
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
          <Text style={styles.modalText}>Qualificações</Text>
          <TextInput
            placeholder="Adicione uma qualificação"
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddQualification}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <FlatList
            data={qualifications}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.qualificationItem}>
                <Text style={styles.qualificationText}>{item}</Text>
                <TouchableOpacity onPress={() => handleDeleteQualification(index)}>
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={onClose}>
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    elevation: 2,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  qualificationText: {
    marginRight: 10
  },
  deleteText: {
    color: 'red'
  }
});

export default QualificationsModal;