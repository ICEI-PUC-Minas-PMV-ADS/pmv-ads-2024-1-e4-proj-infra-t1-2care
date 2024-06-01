import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Specializations from './specializations';
import StarFilterOption from './Evaluation/StarFilterOption';
import { useAuth } from '../contexts/AuthContext';


const ScreenWidth = Dimensions.get('window').width;

const FilterContainer = (props) => {
  const [filter, setFilter] = useState(props.filter || null);
  const { user } = useAuth();
  const [values, setValues] = useState({
    distance: 0,
    experience: '',
    rating: 0,
    day_price: '',
    hour_price: '',
    specializations: [],
  });

  const clearCheckbox = {
    1: false, 2: false, 3: false,
    4: false, 5: false, 6: false,
    7: false, 8: false, 9: false
  };
  const [checkboxes, setCheckboxes] = useState(clearCheckbox);
 
  const specializations = [
    { id: 1, text: 'Cuidados Básicos de Saúde' },
    { id: 2, text: 'Apoio à Mobilidade' },
    { id: 3, text: 'Higiene e Cuidados Pessoais' },
    { id: 4, text: 'Nutrição e Preparo de Refeições' },
    { id: 5, text: 'Acompanhamento e Transporte' },
    { id: 6, text: 'Gestão de Rotinas e Medicamentos' },
    { id: 7, text: 'Suporte em Cuidados Paliativos' },
    { id: 8, text: 'Formação em Demência e Alzheimer' },
  ];

  useEffect(() => {
    setFilter(props.filter || null);
    if (props.filter) {
      handleCheckTrue(props.filter);
    }
  }, [props.filter]);

  const handleInputChange = (name, value) => {
    const updatedValues = { ...values, [name]: value }
    setValues(updatedValues);
    applyFilter(updatedValues, checkboxes);
  };
  
  const handleCheckboxChange = (name) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [name]: !checkboxes[name],
    };
    setCheckboxes(updatedCheckboxes);
    applyFilter(values, updatedCheckboxes);
  };

  const handleCheckTrue = (id) => {
    const updatedCheckboxes = {
      ...clearCheckbox,
      [id]: true,
    };
    setCheckboxes(updatedCheckboxes);
    applyFilter(values, updatedCheckboxes);
  };

  const applyFilter = (values, checkboxes) => {
    const textList = specializations.filter(specialization => checkboxes[specialization.id]).map(specialization => specialization.text);
    const selectedSpecializations = { specializations: textList };
    const appliedFilters = { ...values, ...selectedSpecializations }
    props.onAppliedFilters(appliedFilters);
  }

  const renderCheckboxes = () => {
    return specializations.map((specialization) => (
      <CheckBox
        key={specialization.id}
        checked={checkboxes[specialization.id]}
        onPress={() => handleCheckboxChange(specialization.id)}
        title={specialization.text}
        containerStyle={styles.checkbox}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Filtrar por</Text>
      {
        user
          ?
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
      :
      <></>
      }
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
        <Text style={styles.label}>Valor máximo por dia</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="100,00"
          value={values.day_price}
          onChangeText={(value) => handleInputChange('day_price', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor máximo por hora</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="100,00"
          value={values.hour_price}
          onChangeText={(value) => handleInputChange('hour_price', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Avaliação</Text>
        {[1, 2, 3, 4, 5].map((number) => (
            <StarFilterOption
              key={number}
              number={number}
              selected={values.rating == number}
              onPress={() => {number == values.rating ? handleInputChange('rating', 0) : handleInputChange('rating', number)}}
            />
          ))}
      </View>
      <Text style={styles.header}>Especializações</Text>
      <View style={styles.checkboxGrid}>
        <View style={styles.column}>
          {renderCheckboxes().slice(0, 4)}
        </View>
        <View style={styles.column}>
          {renderCheckboxes().slice(4)}
        </View>
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
    marginVertical: 5,
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
    alignItems: 'left',
  },
  checkboxGrid: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  checkboxContainer2: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'left',
    // paddingHorizontal: 10,
    // marginTop: 20,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
});

export default FilterContainer;
