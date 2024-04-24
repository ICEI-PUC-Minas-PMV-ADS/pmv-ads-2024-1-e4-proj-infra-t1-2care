import React, { useState } from 'react';
import CaregiverCard from '../CaregiverCard/CaregiverCard'
import './CaregiverList.css'


const CaregiverList = ({ caregiver }) => {

    const caregivers = [
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
        <div className='caregiverList'>             
            <div className='cards'>
            {caregivers.map(caregiver => (
                    <CaregiverCard
                        key={caregiver.name}
                        name={caregiver.name}
                        especialization={caregiver.especialization}
                        distance={caregiver.distance}
                        rating={caregiver.rating}
                        image={caregiver.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default CaregiverList;