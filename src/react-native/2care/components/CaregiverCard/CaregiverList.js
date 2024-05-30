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