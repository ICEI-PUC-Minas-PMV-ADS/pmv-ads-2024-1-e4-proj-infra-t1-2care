import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';
import { logout } from '../../../services/userService';

const ProfileCardCareReceiver = (props) => {
    return (
        <div>
            <div className="profileCard">
                <h2>{props.userData.name}</h2>
                <h3>Cliente</h3>

                <img 
                    alt={props.userData.name} 
                    src={props.userData.picture ? props.userData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
                />

                <NavigationButton to="/requests" text="Propostas Enviadas" />
                <NavigationButton to="/reviews" text="Avaliações Feitas" />

                <p>Membro(a) desde {props.userData.date_joined ? props.userData.date_joined.slice(0,10) : "-"}</p>
                <button onClick={logout} style={{backgroundColor:"#ed8733"}}>Sair</button>
            </div>
        </div>
    );
};

export default ProfileCardCareReceiver;