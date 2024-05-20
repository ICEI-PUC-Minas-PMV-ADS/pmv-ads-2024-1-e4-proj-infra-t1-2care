import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';
import { logout } from '../../../services/userService';
import { Link } from 'react-router-dom';

const ProfileCardCaregiver = (props) => {

    return (
        <div>
            <div className="profileCard">
                <h2>{props.userData.name}</h2>
                <h3>Cuidador</h3>

                <img    
                    alt={props.userData.name} 
                    src={props.userData.picture ? props.userData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
                />

                <Link to="/profile/caregiver/calendar" state={{ caregiver: !props.isSelf ? props : undefined }} >
                    <button className='nav-button'>Agenda</button>
                </Link>

                <Link to="/profile/caregiver/evaluations" state={{ caregiver: !props.isSelf ? props : undefined }} >
                    <button className='nav-button'>Avaliações Recebidas</button>
                </Link>

                {props.isSelf 
                    ? 
                        <NavigationButton to="/requests" text="Propostas Recebidas" />
                    :
                        <Link to="/request" state={{ caregiver: !props.isSelf ? props : undefined }} >
                            <button className='nav-button'>Enviar proposta</button>
                        </Link>
                }

                <p>Membro(a) desde {props.userData.date_joined ? props.userData.date_joined.slice(0,10) : "-"}</p>
                {props.isSelf &&
                    <button onClick={logout} style={{backgroundColor:"#ed8733"}}>Sair</button>
                }
            </div>
        </div>
    );
};

export default ProfileCardCaregiver;