import React from 'react';
import './CaregiverCard.css';

const CaregiverCard = () => {
    return (
        <div className="profile-card">
            <div className="profile-image">
                <img src="caminho/para/sua/imagem.jpg" alt="Foto de perfil" />
            </div>
            <div className="profile-info">
                <h2>Maria Silva</h2>
                <p>2 km de distância</p>
                <p>2 anos de experiência</p>
                <p>R$ 500,00</p>
                <div className="rating">
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default CaregiverCard;
