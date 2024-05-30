import React, { useState } from 'react';
import CaregiverCard from '../CaregiverCard/CaregiverCard'
import { ScrollView } from 'react-native'

const CaregiverList = (props) => {
    
    // const [caregiverFilteredList, setCaregiverFilteredList] = React.useState([caregiverList]);

    return (
        <ScrollView horizontal>
            {props.caregiverList.map(caregiver => (
                <CaregiverCard
                    key={caregiver.email}
                    picture={caregiver.picture}
                    name={caregiver.name}
                    carrer_time={caregiver.carrer_time}
                    hour_value={caregiver.hour_price}
                    // rating={caregiver.rating}
                />
            ))}
        </ScrollView>
    )
}

export default CaregiverList