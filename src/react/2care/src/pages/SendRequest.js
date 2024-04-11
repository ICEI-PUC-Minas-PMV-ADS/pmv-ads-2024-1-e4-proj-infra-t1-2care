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
                <RequestCard></RequestCard>
                <button>Enviar</button>
            </main>
        </div>
    )
}

export default SendRequest;