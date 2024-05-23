import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Especialização</Text>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Selecione alguma Especialização"
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        confirmText="Confirmar"
        styles={{
          selectToggle: styles.selectToggle,
          chipText: styles.chipText,
          chipContainer: styles.chipContainer,
          selectedItemText: styles.selectedItemText,
          itemText: styles.itemText,
        }}
        searchPlaceholderText="Buscar..."
        colors={{
          primary: '#486142',
          text: '#486142',
          subText: '#486142',
          selectToggleTextColor: '#486142',
        }}
      />
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
  selectToggle: {
    borderWidth: 1,
    borderColor: "#799275",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#486142',
    backgroundColor: '#ffffff',
  },
  chipText: {
    color: "#486142",
  },
  chipContainer: {
    borderColor: "#799275",
  },
  selectedItemText: {
    color: "#486142",
  },
  itemText: {
    color: "#486142",
  },
});

export default SpecializationPicker;