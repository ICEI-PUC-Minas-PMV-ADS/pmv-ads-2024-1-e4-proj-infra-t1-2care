import React, { useState } from 'react';
import { Button, Typography, Grid, Box, Divider } from '@mui/material';
import { getUserType } from '../../services/userService';
import { calculateAge } from '../../utils/utils';
import { acceptRequest, declineRequest, cancelRequest } from '../../services/caregiverService';
import { toast } from 'react-toastify';

const RequestList = (props) => {
    const [userType, setUserType] = useState('')

    React.useEffect(() => {
        const usert = getUserType()
        setUserType(usert ? usert : '')
    }, []);

    const handleAccept = (id) => {
        acceptRequest(id).then((result) => {
            result ? toast.success("Proposta aceita com sucesso!", { onClose: () => { window.location.reload(); }, autoClose: 1000 }) : toast.error("Erro ao aceitar proposta")
        })
    };

    const handleReject = (id) => {
        declineRequest(id).then((result) => {
            result ? toast.success("Proposta recusada com sucesso!", { onClose: () => { window.location.reload(); }, autoClose: 1000 }) : toast.error("Erro ao recusar proposta")
        })
    };

    const handleCancel = (id) => {
        cancelRequest(id).then((result) => {
            result ? toast.success("Proposta cancelada com sucesso!", { onClose: () => { window.location.reload(); }, autoClose: 1000 }) : toast.error("Erro ao cancelar proposta")
        })
    };

    const setBackgroundColor = (status) => {
        if (status === 0)
            return "#grey"
        else if (status === 1)
            return "#fcecef"
        else if (status === 2)
            return "#EFFCEC"
        else if (status === 3)
            return "lightgrey"
    }

    return (
        <div>
            {/* <div style={{ marginBottom: '20px' }}>
                <FormControlLabel
                    control={<Checkbox checked={filterOptions.accepted} onChange={() => setFilterOptions({ ...filterOptions, accepted: !filterOptions.accepted })} />}
                    label="Aceitas"
                />
                <FormControlLabel
                    control={<Checkbox checked={filterOptions.rejected} onChange={() => setFilterOptions({ ...filterOptions, rejected: !filterOptions.rejected })} />}
                    label="Recusadas"
                />
                <FormControlLabel
                    control={<Checkbox checked={filterOptions.pending} onChange={() => setFilterOptions({ ...filterOptions, pending: !filterOptions.pending })} />}
                    label="Pendentes"
                />
            </div> */}
            {userType ? props.requestList.map(request => (
                <div key={request.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: setBackgroundColor(request.status) }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            {userType == "Caregiver"
                                ?
                                <span><img src={request?.carereceiver?.user?.picture ? request.carereceiver.user.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"} alt="Imagem do Cliente" style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%', objectFit: 'cover' }} />
                                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">{request.carereceiver.user.name}</Typography></span>
                                :
                                <span><img src={request?.caregiver?.user?.picture ? request.caregiver.user.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"} alt="Imagem do Cuidador" style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%', objectFit: 'cover' }} />
                                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">{request.caregiver.user.name}</Typography></span>
                            }

                        </Grid>
                        <Grid item xs={12} md={8}>
                            {request.status != 2 ?
                                <Box>
                                    <Typography variant="body1"><strong>Data:</strong> {request.date}</Typography>
                                    <Typography variant="body1"><strong>Hora Inicial:</strong> {request.start_time}</Typography>
                                    <Typography variant="body1"><strong>Hora Final:</strong> {request.end_time}</Typography>
                                    <Typography variant="body1"><strong>Total de Horas:</strong> {request.total_hours}</Typography>
                                    <Typography variant="body1"><strong>Valor Total a Pagar: R$</strong>{request.final_price}</Typography>
                                </Box>
                                :
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Box>
                                            <Typography variant="body1"><strong>Data:</strong> {request.date}</Typography>
                                            <Typography variant="body1"><strong>Hora Inicial:</strong> {request.start_time}</Typography>
                                            <Typography variant="body1"><strong>Hora Final:</strong> {request.end_time}</Typography>
                                            <Typography variant="body1"><strong>Total de Horas:</strong> {request.total_hours}</Typography>
                                            <Typography variant="body1"><strong>Valor Total a Pagar: R$</strong>{request.final_price}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        {userType == "Caregiver" ?
                                            <Box>
                                                <Typography variant="body1"><strong>Tipo de contato preferido: </strong>{request.carereceiver.user.preferred_contact}</Typography>
                                                <Typography variant="body1"><strong>Email: </strong>{request.carereceiver.user.email}</Typography>
                                                <Typography variant="body1"><strong>Telefone:</strong> {request.carereceiver.user.phone}</Typography>
                                                <Typography variant="body1"><strong>Genêro:</strong> {request.carereceiver.user.gender}</Typography>
                                                <Typography variant="body1"><strong>Idade:</strong> {calculateAge(request.carereceiver.user.birth_date)}</Typography>
                                            </Box>
                                            :
                                            <Box>
                                                <Typography variant="body1"><strong>Tipo de contato preferido: </strong>{request.caregiver.user.preferred_contact}</Typography>
                                                <Typography variant="body1"><strong>Email: </strong>{request.caregiver.user.email}</Typography>
                                                <Typography variant="body1"><strong>Telefone:</strong> {request.caregiver.user.phone}</Typography>
                                            </Box>
                                        }
                                    </Grid>
                                </Grid>
                            }
                            <Divider sx={{ margin: "1em" }} />
                            {request.status == 0 ?
                                <div>
                                    {userType == "Caregiver"
                                        ?
                                        <div>
                                            <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>Recusar</Button>
                                            <Button variant="contained" sx={{ marginRight: 2, marginLeft: 2 }} color="primary" onClick={() => handleAccept(request.id)}>Aceitar</Button>
                                        </div>
                                        :
                                        <div>
                                            <Button variant="contained" color="secondary" onClick={() => handleCancel(request.id)}>Cancelar</Button>
                                        </div>
                                    }
                                </div>
                                :
                                <div></div>}
                            {request.status == 3 && (
                                <Typography variant="body1" style={{ color: 'red    ' }}>Proposta Cancelada</Typography>
                            )}
                            {request.status == 2 && (
                                <Typography variant="body1" style={{ color: 'green' }}>Proposta aceita</Typography>
                            )}
                            {request.status == 1 && (
                                <Typography variant="body1" style={{ color: 'red' }}>Proposta recusada</Typography>
                            )}
                            {request.status == 0 && userType == "CareReceiver" && (
                                <Typography variant="body1" style={{ color: 'grey' }}>Proposta pendente</Typography>
                            )}
                        </Grid>
                    </Grid>
                </div>
            )) : <div></div>}
        </div>
    );
}

export default RequestList;
