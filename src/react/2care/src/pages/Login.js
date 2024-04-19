import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import TopBarLogin from "../components/TopBar/TopBarLogin";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './App.css'
import { apiService } from "../services/apiService";


const Login = () => {
    const theme = useTheme();

    const [isLogged, setIsLogged] = useState(false);

    const description = {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        borderRadius: '1.5em',
        width: '90%',
        padding: '0.8em',
    }

    return (
        <div>
            <TopBarLogin></TopBarLogin>
            <NavBar isLogged={isLogged}></NavBar>
            <section style={{ alignItems: 'start', padding: '8% 8% 10% 8%', backgroundImage: "url('https://jaycampbell.com/wp-content/uploads/2022/08/dreamstime_s_27991533.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex' }}>
                <div className="columnLeft50" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <div style={description}>
                        <h2>Bem-vindos ao <span style={{ color: theme.palette.secondary.main }}>2Care!</span></h2>
                        <h4>Conectamos famílias a cuidadores de idosos de maneira ágil e eficiente, facilitando a busca pelo profissional que melhor atenda às suas necessidades.</h4>
                    </div>
                    <div style={{ float: 'left' }}>
                        <h4 style={{ color: theme.palette.background.light }}>Crie agora mesmo a sua conta!</h4>
                        <Link to="/register/carereceiver">
                            <button style={{ width: '120px'}}>Cliente</button>
                        </Link>
                        <Link to="/register/caregiver">
                            <button style={{ width: '120px'}}>Cuidador</button>
                        </Link>
                    </div>
                </div>

                <div className="columnRight50" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <LoginForm setIsLogged={setIsLogged}></LoginForm>
                </div>
            </section>
        </div >
    )
}

export default Login;