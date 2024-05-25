import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const QualificationsModal = ({ visible, onClose, addQualification }) => {
  const [inputValue, setInputValue] = useState('');
  const [qualifications, setQualifications] = useState([]);

  const handleAddQualification = () => {
    if (inputValue.trim()) {
      const newQualification = inputValue.trim();
      setQualifications([...qualifications, newQualification]);
      addQualification(newQualification);
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
          <Text style={styles.modalText}>Adicionar Qualificação</Text>
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
    marginTop: 22
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
    width: screenWidth - 40
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#486142'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#799275',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white'
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
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#799275',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white'
  },
  qualificationText: {
    flex: 1,
    color: '#486142'
  },
  deleteText: {
    color: '#B65138',
    marginLeft: 10
  },
  list: {
    width: '100%',
    marginTop: 10
  }
});

export default QualificationsModal;