import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = (props) => {
    const navigation = useNavigation();
    const [textToSearch, setTextToSearch] = useState('');

    const handleBusca = () => {
        props.onAppliedSearch(textToSearch);
        navigation.navigate('Search');
        setTextToSearch('');
    };

    const handleFilterPress = () => {
        navigation.navigate('Search');
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar"
                placeholderTextColor="#828282"
                selectTextOnFocus={false}
                onChangeText={text => setTextToSearch(text)}
                onSubmitEditing={handleBusca}
            />
            <Pressable>
                <MaterialIcons name="search" size={20} color="#828282" style={styles.icon} />
            </Pressable>
            <Pressable onPress={handleFilterPress}>
                <MaterialIcons name="tune" size={20} color="#828282" style={styles.icon} />
            </Pressable>
        </View>

    );
};

const styles = StyleSheet.create({
    all: {
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 16,
        marginTop: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#828282',
        backgroundColor: '#D2DAC3',
        border: 'none',
        padding: 10,
        borderRadius: 20,
        borderWidth: 0,
        shadow: 'transparent',
        elevation: 0,
    },
    button: {
        backgroundColor: '#D2DAC3',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default SearchBar;
