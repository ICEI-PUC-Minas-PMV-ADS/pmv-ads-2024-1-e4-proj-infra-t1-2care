import React from 'react';

const RequestCard = ({ currentDate, selectedDate, selectedStartTime, totalHours, amount, handleAccept }) => {

    return (
        <div className="requestCard">
            <div style={{ width: '20%' }}>
                <img src="" alt=""></img>
                <p></p>
            </div>
            <div style={{ width: '60%' }}>
                <p>Data do envio da proposta: {currentDate}</p>
                <p>Data: {selectedDate}</p>
                <p>Horário: {selectedStartTime}</p>
                <p>Total de horas: {totalHours}</p>
                <p>Valor por hora: R$25,00</p>
                <p>Valor a pagar: {amount}</p>
            </div>
            <div style={{ width: '20%' }}>
                <button onClick={handleAccept}>Enviar</button>
            </div>
        </div>
    )
}

export default RequestCard;
