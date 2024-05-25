import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Specializations from './specializations';


const ScreenWidth = Dimensions.get('window').width;

const FilterContainer = () => {
  const [values, setValues] = useState({
    distance: '',
    experience: '',
    rating: '',
    day_price: '',
    hour_price: '',
  });
  const [checkboxes, setCheckboxes] = useState({
    check1: false, check2: false, check3: false, 
    check4: false, check5: false, check6: false, 
    check7: false, check8: false, check9: false 
  });

  const specializations = [
    { id: 1, text: 'Cuidados básicos de saúde' },
    { id: 2, text: 'Apoio à mobilidade' },
    { id: 3, text: 'Higiene e cuidados especiais' },
    { id: 4, text: 'Nutrição e preparo de refeições' },
    { id: 5, text: 'Acompanhamento e transporte' },
    { id: 6, text: 'Gestão e rotina de medicamentos' },
    { id: 7, text: 'Suporte em cuidados paliativos' },
    { id: 8, text: 'Demência e Alzheimer' },
];

  const handleInputChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheckboxChange = (name) => {
    setCheckboxes({ ...checkboxes, [name]: !checkboxes[name] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Filtrar por</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Distância de você</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="5"
          value={values.distance}
          onChangeText={(value) => handleInputChange('distance', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Anos de experiência</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1"
          value={values.experience}
          onChangeText={(value) => handleInputChange('experience', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Avaliação</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="5"
          value={values.rating}
          onChangeText={(value) => handleInputChange('rating', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor por dia</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="100,00"
          value={values.day_price}
          onChangeText={(value) => handleInputChange('day_price', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor por hora</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="100,00"
          value={values.hour_price}
          onChangeText={(value) => handleInputChange('hour_price', value)}
        />
      </View>

      <Text style={styles.header}>Especializações</Text>
      <View style={styles.checkboxGrid}>
      {specializations.map((specialization) => (
          <View key={specialization.id} style={styles.checkboxContainer}>
            <CheckBox
              checked={values[`check${specialization.id}`]}
              onPress={() => handleInputAndCheckboxChange(`check${specialization.id}`)}
              title={specialization.text}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    flex: 3,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default FilterContainer;
