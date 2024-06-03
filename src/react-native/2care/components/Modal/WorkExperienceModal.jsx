import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const WorkExperienceModal = ({ visible, onClose, experiences, addExperience }) => {
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExperience = () => {
    if (place.trim() && startDate && endDate && description) {
      const newExperience = { place: place.trim(), start_date: startDate, end_date: endDate, description: description.trim()};

      addExperience(newExperience);
      setPlace('');
      setStartDate('');
      setEndDate('');
      setDescription('');
    }
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    addExperience(updatedExperiences);
  };

  const formatDate = (dateString) => {
    dateString = dateString.replace(/\//g, "").substring(0, 8)
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);
    return `${day}/${month}/${year}`;
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
          <Text style={styles.modalText}>Adicionar Experiência de Trabalho</Text>
          <TextInput
            placeholder="Local de trabalho"
            value={place}
            onChangeText={setPlace}
            style={styles.input}
          />
          <TextInput
            placeholder="Data de início"
            value={startDate}
            onChangeText={t => setStartDate(formatDate(t))}
            style={styles.input}
          />
          <TextInput
            placeholder="Data de saída"
            value={endDate}
            onChangeText={t => setEndDate(formatDate(t))}
            style={styles.input}
          />
          <TextInput
            placeholder="Descrição do trabalho"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddExperience}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <FlatList
            data={experiences}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.experienceItem}>
                <Text style={styles.experienceText}>{item.place}</Text>
                <Text style={styles.experienceText}>{item.start_date}</Text>
                <Text style={styles.experienceText}>{item.end_date}</Text>
                <Text style={styles.experienceText}>{item.description}</Text>
                <TouchableOpacity onPress={() => handleDeleteExperience(index)}>
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
  experienceItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
    borderColor: '#799275',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white'
  },
  experienceText: {
    color: '#486142',
    fontWeight: 'bold'
  },
  linkText: {
    color: '#486142'
  },
  deleteText: {
    color: '#B65138',
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  list: {
    width: '100%',
    marginTop: 10
  }
});

export default WorkExperienceModal;