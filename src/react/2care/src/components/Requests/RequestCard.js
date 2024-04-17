import React, { useState } from "react";

const RequestCard = ({ startTime, endTime }) => {
    const [proposalSent, setProposalSent] = useState(false);

    const handleSendProposal = () => {
        console.log("Proposta enviada com sucesso!");
        setProposalSent(true);
    };

    const calculateTotalHours = () => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const totalMilliseconds = end - start;
        const totalHours = totalMilliseconds / (1000 * 60 * 60);
        return totalHours.toFixed(2);
    };

    const calculateTotalPayment = () => {
        const totalHours = calculateTotalHours();
        const hourlyRate = 30;
        const totalPayment = totalHours * hourlyRate;
        return totalPayment.toFixed(2);
    };

    return (
        <div className="requestCard">
            <div style={{ width: '20%' }}>
                <img src="https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg" alt=""></img>
                <p></p>
            </div>
            <div style={{ width: '60%' }}>
                <p>Data do envio da proposta: {proposalSent ? new Date().toLocaleString() : "Não enviada"}</p>
                <p>Data: {startTime && new Date(startTime).toLocaleDateString('pt-BR')}</p>
                <p>Horário: {startTime && new Date(startTime).toLocaleTimeString()}</p>
                <p>Total de horas: {startTime && endTime && calculateTotalHours()}</p>
                <p>Valor por hora: R$30,00</p>
                <p>Valor a pagar: R${startTime && endTime && calculateTotalPayment()}</p>
            </div>
            <div style={{ width: '20%' }}>
                <p>Status: {proposalSent ? "Proposta Enviada!" : "Não enviada!"}</p>
                <button onClick={handleSendProposal}>Enviar</button>
            </div>
        </div>
    )
}

export default RequestCard;
