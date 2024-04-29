import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import './App.css'
import RequestCard from "../components/Requests/RequestCard";
import { useEffect } from "react";


const SendRequest = () => {
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const [formDataDraft, setFormDataDraft] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataDraft(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(formDataDraft);
        try {
            const response = await axios.post('/user/send-request', {
                date: formDataDraft.date,
                startTime: formDataDraft.startTime,
                endTime: formDataDraft.endTime
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const handleAccept = () => {
        console.log('Proposta Enviada');
    };

    const calculateHours = () => {
        if (formDataDraft.startTime && formDataDraft.endTime) {
            const start = new Date(`2022-01-01T${formDataDraft.startTime}`);
            const end = new Date(`2022-01-01T${formDataDraft.endTime}`);
            const diffMs = end - start;
            const diffHrs = diffMs / (1000 * 60 * 60);
            return diffHrs.toFixed(2);
        } else {
            return 0;
        }
    };

    const calculateAmount = () => {
        const hourlyRate = 25; 
        return (totalHours * hourlyRate).toFixed(2);
    };

    const currentDate = new Date().toISOString().slice(0, 10);
    const totalHours = calculateHours();
    const amount = calculateAmount();

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Envie uma proposta: </h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <label>Selecione a data:</label>
                    <input type='date' name='date' value={formDataDraft.date} onChange={handleChange}></input>
                    <label>Horário inicial:</label>
                    <input type='time' name='startTime' value={formDataDraft.startTime} onChange={handleChange}></input>
                    <label>Horário final:</label>
                    <input type='time' name='endTime' value={formDataDraft.endTime} onChange={handleChange}></input>
                    <button type="submit">Salvar data/hora</button>
                </form>
                <RequestCard
                    currentDate={currentDate}
                    selectedDate={formData.date}
                    selectedStartTime={formData.startTime}
                    totalHours={totalHours}
                    amount={amount}
                    handleAccept={handleAccept}
                />
            </main>
        </div>
    )
}

export default SendRequest;
