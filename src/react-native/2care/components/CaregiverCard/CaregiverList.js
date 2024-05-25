import React, { useState } from 'react';
import CaregiverCard from '../CaregiverCard/CaregiverCard'
import { ScrollView } from 'react-native'

const CaregiverList = (props) => {
    
    // const [caregiverFilteredList, setCaregiverFilteredList] = React.useState([caregiverList]);

    const caregiversExample = [
        {
            name: 'Maria Fontes',
            especialization: 'Enfermagem',
            distance: '10 km',
            rating: 4.5,
            image: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'
        },
        {
            name: 'Antônia Santos',
            especialization: 'Terapeuta',
            distance: '10 km',
            rating: 4.5,
            image: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'
        },
        {
            name: 'Joana Soares',
            especialization: 'Fonoaudióloga',
            distance: '10 km',
            rating: 4.5,
            image: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'
        },
        {
            name: 'Leila Souza',
            especialization: 'Fisioterapeuta',
            distance: '10 km',
            rating: 4.5,
            image: 'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'
        },

    ]


    return (
        <ScrollView horizontal>
            {props.caregiverList.map(caregiver => (
                <CaregiverCard
                    key={caregiver.email}
                    image={caregiver.picture}
                    name={caregiver.name}
                    // especialization={caregiver.especialization}
                    hour_value={caregiver.hour_price}
                    // rating={caregiver.rating}
                />
            ))}
        </ScrollView>
    )
}

export default CaregiverList