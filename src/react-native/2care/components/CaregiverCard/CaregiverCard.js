import React from 'react';
import './CaregiverCard.css';
import { View, Image, Text, StyleSheet } from 'react-native';

const CaregiverCard = (propsprops) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageview}>
                <Image source={{ uri: props?.caregiver?.picture ? props.caregiver.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s', }} style={styles.image} resizeMode="cover" accessibilityLabel="Foto de perfil" />
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText}>{props?.name}</Text>
                <Text style={styles.infoText}>2 km de distância</Text>{/*  tem que fazer o calc da distancia, tem no outro app */}
                <Text style={styles.infoText}>{props?.career_time} anos de experiência</Text>
                <Text style={styles.infoText}>R$ {props?.hour_price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageview: {
        width: '50%',
        height: '50%',
        borderRadius: 200,
        overflow: 'hidden',
    },
    image: {
        width: ' 100%',
        height: '100%',
        objectFit: 'cover',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1em',
        borderWidth: 0.5,
        borderColor: '#D2DAC3',
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: '10em',
        height: '12em',
        margin: 5,
    },
    infoText: {
        textAlign: 'center',
        display: 'block',
        marginBlockStart: '0',
        marginBlockEnd: '0',
        // lineHeight: '1em',
    },
});

export default CaregiverCard;
