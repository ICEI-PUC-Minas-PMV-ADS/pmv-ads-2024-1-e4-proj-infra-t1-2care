import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import CaregiverList from "../components/CaregiverList/CaregiverList";
import RequestCard from '../components/RequestCard/RequestCard';
import { useTheme } from '@mui/material/styles';
import './App.css'

const ProposalsReceived = () => {
    const theme = useTheme();

    return (
        <div className="App">
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header className='App-header'>
            <h1>Veja suas propostas recebidas: </h1>
            <CaregiverList></CaregiverList>
            </header>
            <RequestCard></RequestCard>
        </div >
    )
}

export default ProposalsReceived;