import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import './App.css'
import RequestCard from "../components/Requests/RequestCard";
import { useEffect } from "react";


const SendRequest = () => {
    const theme = useTheme();
    useEffect(() => {
        document.title = 'Envie uma proposta';
    }, []);

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Envie uma proposta: </h1>
            </header>
            <main>
                <form>
                    <label>Selecione o horário: </label>
                    <input type='datetime-local'></input>
                    <button>Enviar</button>
                </form>
                <RequestCard></RequestCard>
            </main>
        </div>
    )
}

export default SendRequest;