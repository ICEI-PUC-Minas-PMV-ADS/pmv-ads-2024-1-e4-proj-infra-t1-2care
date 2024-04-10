import NavBar from "../components/NavBar/NavBar";
import RequestList from "../components/RequestList/RequestList";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';

const Requests = () => {
    const theme = useTheme();

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <main>
                <RequestList></RequestList>
            </main>
        </div>
    )
}

export default Requests;