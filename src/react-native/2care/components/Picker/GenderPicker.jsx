import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';

const GenderPicker = ({ selectedItems, onSelectedItemsChange }) => {
  const GENDER_MAP = {
    1: "Masculino",
    2: "Feminino",
    3: "Outro",
  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Gênero</Text>
      <Picker
        selectedValue={selectedItems[0]}
        onValueChange={(itemValue) => onSelectedItemsChange([itemValue])}
        style={styles.picker}
      >
        {Object.entries(GENDER_MAP).map(([key, label]) => (
          <Picker.Item key={key} label={label} value={key} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    backgroundColor: '#D2DAC3',
    left: 10,
    top: -10,
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#486142',
    borderRadius: 10,
    zIndex: 1,
  },
  picker: {
    borderWidth: 1,
    width: "100%",
    borderColor: "#486142",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#486142',
    backgroundColor: '#f6f6f6',
  },
});

export default GenderPicker;