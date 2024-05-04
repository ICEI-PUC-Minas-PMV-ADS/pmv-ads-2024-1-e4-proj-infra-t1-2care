import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Grid } from '@mui/material';

const RequestList = ({ userType }) => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            caregiver: {
                name: "Nome do Cuidador 1",
                image: "https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg"
            },
            date: "2024-05-03",
            startTime: "09:00",
            endTime: "17:00",
            totalHours: 8,
            totalPayment: 160.00,
            accepted: false,
            rejected: false
        },
        {
            id: 2,
            caregiver: {
                name: "Nome do Cuidador 2",
                image: "https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg"
            },
            date: "2024-05-04",
            startTime: "10:00",
            endTime: "18:00",
            totalHours: 8,
            totalPayment: 160.00,
            accepted: false,
            rejected: false
        }
    ]);

    const handleAccept = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                return { ...request, accepted: true };
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    const handleReject = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                return { ...request, rejected: true };
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    return (
        <div>
            {requests.map(request => (
                <div key={request.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <img src={request.caregiver.image} alt="Imagem do Cuidador" style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%', objectFit: 'cover' }} />
                            <Typography variant="body1">{request.caregiver.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="body1">Data: {request.date}</Typography>
                            <Typography variant="body1">Hora Inicial: {request.startTime}</Typography>
                            <Typography variant="body1">Hora Final: {request.endTime}</Typography>
                            <Typography variant="body1">Total de Horas: {request.totalHours}</Typography>
                            <Typography variant="body1">Valor Total a Pagar: R${request.totalPayment.toFixed(2)}</Typography>
                            {!request.accepted && !request.rejected && (
                                <div>
                                    <Button variant="contained" color="primary" onClick={() => handleAccept(request.id)}>Aceitar</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>Recusar</Button>
                                </div>
                            )}
                            {request.accepted && (
                                <Typography variant="body1" style={{ color: 'green' }}>Aceita</Typography>
                            )}
                            {request.rejected && (
                                <Typography variant="body1" style={{ color: 'red' }}>Recusada</Typography>
                            )}
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    );
}

export default RequestList;
