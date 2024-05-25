import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const items = [
  { id: 'Masculino', name: 'Masculino' },
  { id: 'Feminino', name: 'Feminino' },
  { id: 'Outro', name: 'Outro' },
];

const GenderPicker = ({ selectedItems, onSelectedItemsChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gênero</Text>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        single={true}
        selectText="Selecione o gênero"
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

export default GenderPicker;