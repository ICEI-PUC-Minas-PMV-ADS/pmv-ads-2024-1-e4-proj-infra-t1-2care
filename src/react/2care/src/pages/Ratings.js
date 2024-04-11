import NavBar from "../components/NavBar/NavBar";
import RatingList from "../components/Ratings/RatingList";
import TopBar from "../components/TopBar/TopBar";
import ProfileCard from '../components/Profile/ProfileCard/ProfileCard'
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";

const Ratings = () => {
    const theme = useTheme();
    useEffect(() => {
        document.title = 'Avaliações';
    }, []);

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Veja as avaliações feitas: </h1>
            </header>
            <main>
                <div className="columnLeft25" >
                    <ProfileCard></ProfileCard>
                </div>
                <div className="columnRight70">
                    <RatingList ></RatingList>
                </div>
            </main>
        </div>
    )
}

export default Ratings;