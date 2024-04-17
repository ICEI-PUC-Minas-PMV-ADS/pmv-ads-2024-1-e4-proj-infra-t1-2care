// import NavBar from "../components/NavBar/NavBar";
// import TopBar from "../components/TopBar/TopBar";
// import { useTheme } from '@mui/material/styles';
// import './App.css'
// import RequestCard from "../components/Requests/RequestCard";
// import { useEffect } from "react";


// const SendRequest = () => {
//     const theme = useTheme();
//     useEffect(() => {
//         document.title = 'Envie uma proposta';
//     }, []);

//     return (
//         <div>
//             <TopBar></TopBar>
//             <NavBar></NavBar>
//             <header>
//                 <h1>Envie uma proposta: </h1>
//             </header>
//             <main>
//                 <form>
//                     <label>Selecione o horário: </label>
//                     <input type='datetime-local'></input>
//                 </form>
//                 <RequestCard></RequestCard>
//             </main>
//         </div>
//     )
// }

// export default SendRequest;

import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import './App.css'
import RequestCard from "../components/Requests/RequestCard";
import { useEffect } from "react";

const SendRequest = () => {
    const theme = useTheme();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        document.title = 'Envie uma proposta';
    }, []);

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Envie uma proposta:</h1>
            </header>
            <main>
                <form>
                    <label>Data/Hora inicial:</label>
                    <input type='datetime-local' value={startTime} onChange={handleStartTimeChange}></input>

                    <label>Data/Hora final:</label>
                    <input type='datetime-local' value={endTime} onChange={handleEndTimeChange}></input>
                </form>
                <RequestCard startTime={startTime} endTime={endTime}></RequestCard>
            </main>
        </div>
    )
}

export default SendRequest;
