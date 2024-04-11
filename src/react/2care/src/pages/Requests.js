import NavBar from "../components/NavBar/NavBar";
import RequestList from "../components/RequestList/RequestList";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";


const Requests = () => {
    const theme = useTheme();
    useEffect(() => {
        document.title = 'Propostas';
      }, []);

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Veja suas propostas: </h1>
            </header>
            <main>
                <RequestList></RequestList>
            </main>
        </div>
    )
}

export default Requests;