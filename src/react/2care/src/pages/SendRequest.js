import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import './App.css'
import RequestCard from "../components/RequestCard/RequestCard";


const SendRequest = () => {
    const theme = useTheme();

    return (
        <div className="App">
            <TopBar></TopBar>
            <NavBar></NavBar>
            <main>
                <RequestCard></RequestCard>

                <button>Enviar</button>
            </main>
        </div>
    )
}

export default SendRequest;