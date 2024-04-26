import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';

const ProfileCardCaregiver = (props) => {
    return (
        <div className="profileCard">
            <h2>{props.userData.name}</h2>
            <h3>{props.userData.user_type_display === "Caregiver" ? "Cuidador" : "Cliente"}</h3>

            <img 
                alt={props.userData.name} 
                src={props.userData.picture ? props.userData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
            />
            <NavigationButton to="/requests" text="Propostas Recebidas" />
            <NavigationButton to="/requests" text="Agenda" />
            <NavigationButton to="/request" text="Avaliações Recebidas" />

            <p>Membro(a) desde {props.userData.date_joined ? props.userData.date_joined.slice(0,10) : "-"}</p>
        </div>
    );
};

export default ProfileCardCaregiver;