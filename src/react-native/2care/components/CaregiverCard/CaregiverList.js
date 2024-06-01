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
                    career_time={caregiver.career_time}
                    hour_price={caregiver.hour_price}
                    distance={caregiver.distance}
                    rating={caregiver.rating}
                />
            ))}
        </ScrollView>
    )
}

export default CaregiverList