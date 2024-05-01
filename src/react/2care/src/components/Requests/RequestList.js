import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

const RequestList = ({ userType }) => {
    const [acceptedChecked, setAcceptedChecked] = useState(true);
    const [declinedChecked, setDeclinedChecked] = useState(true);
    const [pendingChecked, setPendingChecked] = useState(true);

    const handleAccept = () => {

    };

    const requestCards = [
        {
            currentDate: '...',
            selectedDate: '...',
            selectedStartTime: '...',
            totalHours: '...',
            amount: '...',
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <FormControlLabel
                    control={<Checkbox checked={acceptedChecked} onChange={() => setAcceptedChecked(!acceptedChecked)} />}
                    label="Aceitas"
                />
                <FormControlLabel
                    control={<Checkbox checked={declinedChecked} onChange={() => setDeclinedChecked(!declinedChecked)} />}
                    label="Recusadas"
                />
                <FormControlLabel
                    control={<Checkbox checked={pendingChecked} onChange={() => setPendingChecked(!pendingChecked)} />}
                    label="Pendentes"
                />
            </div>
            {userType === 'carereceiver' && (
                <Button variant="contained" color="primary" href="/request" style={{ marginBottom: '10px' }}>
                    Envie sua proposta
                </Button>
            )}
            <div className='requestList'>
                {requestCards.map((request, index) => (
                    <div key={index} className="requestCard" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <img src="" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        <div style={{ flex: 3 }}>
                            <p>Data do envio da proposta: 27/11/2023 {request.currentDate}</p>
                            <p>Data: 14/12/2023 {request.selectedDate}</p>
                            <p>Horário: 17:45{request.selectedStartTime}</p>
                            <p>Total de horas: 2{request.totalHours}</p>
                            <p>Valor por hora: R$25,00</p>
                            <p>Valor total: R$50,00{request.amount}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default RequestList;
