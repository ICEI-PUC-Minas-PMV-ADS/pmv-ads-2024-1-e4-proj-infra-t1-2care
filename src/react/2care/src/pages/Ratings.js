import NavBar from "../components/NavBar/NavBar";
import RatingList from "../components/RatingList/RatingList";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';

const Ratings = () => {
    const theme = useTheme();

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <header>
                <h1>Veja as avaliações feitas: </h1>
            </header>
            <main>
                <RatingList></RatingList>
            </main>
        </div>
    )
}

export default Ratings;