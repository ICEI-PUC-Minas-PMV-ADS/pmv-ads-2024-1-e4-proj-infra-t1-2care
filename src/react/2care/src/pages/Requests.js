import NavBar from "../components/NavBar/NavBar";
import RequestList from "../components/Requests/RequestList";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";

const Requests = ({ userType }) => {
    const theme = useTheme();
    useEffect(() => {
        document.title = userType === 'caregiver' ? 'Propostas Recebidas' : 'Propostas Enviadas';
    }, [userType]);

    const getHeaderText = () => {
        if (userType === 'caregiver') {
            return 'Veja as suas propostas recebidas:';
        } else if (userType === 'carereceiver') {
            return 'Veja as propostas enviadas por você:';
        } else {
            return 'Veja suas propostas:';
        }
    };

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>{getHeaderText()}</h1>
            </header>
            <main>
                <RequestList userType={userType}></RequestList>
            </main>
        </div>
    )
}

export default Requests;
