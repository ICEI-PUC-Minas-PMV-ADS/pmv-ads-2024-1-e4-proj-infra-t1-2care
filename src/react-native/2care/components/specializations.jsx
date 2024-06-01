import React from 'react';
import { View, Dimensions, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const screenWidth = Dimensions.get('window').width;

const Specializations = () => {
    const navigation = useNavigation();
    const buttons = [
        { id: 1, imageSource: require('../assets/Specializations/specialization-1.png'), text: 'Cuidados básicos de saúde' },
        { id: 2, imageSource: require('../assets/Specializations/specialization-2.png'), text: 'Apoio à mobilidade' },
        { id: 3, imageSource: require('../assets/Specializations/specialization-3.png'), text: 'Higiene e cuidados especiais' },
        { id: 4, imageSource: require('../assets/Specializations/specialization-4.png'), text: 'Nutrição e preparo de refeições' },
        { id: 5, imageSource: require('../assets/Specializations/specialization-5.png'), text: 'Acompanhamento e transporte' },
        { id: 6, imageSource: require('../assets/Specializations/specialization-6.png'), text: 'Gestão e rotina de medicamentos' },
        { id: 7, imageSource: require('../assets/Specializations/specialization-7.png'), text: 'Suporte em cuidados paliativos' },
        { id: 8, imageSource: require('../assets/Specializations/specialization-8.png'), text: 'Demência e Alzheimer' },
    ];

    const handleSelectSpecialization = (index) => {
        navigation.navigate('Search', {filter: index})
      };
    

    const renderButtons = () => {
        return buttons.map((button, index) => (
            <Pressable key={button.id} style={styles.buttonContainer}  onPress={() => handleSelectSpecialization(index + 1)}>
                <Image source={button.imageSource} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{button.text}</Text>
            </Pressable>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                {renderButtons().slice(0, 4)}
            </View>
            <View style={styles.column}>
                {renderButtons().slice(4)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        // justifyContent: 'space-around',
    },
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: ScreenWidth * 0.5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'rgba(210, 218, 195, 0.5)',
        // width: 180,
        width: ScreenWidth * 0.4,
        borderRadius: 4,
        height: 35,
    },
    buttonImage: {
        width: 20,
        height: 15,
        margin: 5,
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 12,
        maxWidth: ScreenWidth * 0.3,
    },
});

export default Specializations;
