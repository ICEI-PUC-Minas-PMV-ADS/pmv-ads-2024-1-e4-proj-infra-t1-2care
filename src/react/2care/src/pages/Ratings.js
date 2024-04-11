import NavBar from "../components/NavBar/NavBar";
import RatingList from "../components/RatingList/RatingList";
import TopBar from "../components/TopBar/TopBar";
import ProfileCard from '../components/ProfileCard/ProfileCard'
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
                <ProfileCard></ProfileCard>
                <RatingList></RatingList>
            </main>
        </div>
    )
}

export default Ratings;