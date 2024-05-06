import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import TopBarLogin from "../components/TopBar/TopBarLogin";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './App.css'
import { height, width } from "@mui/system";

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

    const sectionBackground = {
        alignItems: 'start', 
        padding: '8% 8% 10% 8%',
        height: '60vh', 
        backgroundImage: "url('https://ohoje.com/public/imagens/fotos/amp/2022/06/9-abre-Pedro-Pinheiro-3-scaled.jpg')",    
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        display: 'flex',
    }

        return (
        <div>
            <TopBarLogin></TopBarLogin>
            <NavBar isLogged={isLogged}></NavBar>
            <section style={sectionBackground}>
                <div className="columnContainer">
                    <div className="columnLeft50">
                        <div style={description}>
                            <h2>Bem-vindos ao <span style={{ color: theme.palette.secondary.main }}>2Care!</span></h2>
                            <h4>Conectamos famílias a cuidadores de idosos de maneira ágil e eficiente, facilitando a busca pelo profissional que melhor atenda às suas necessidades.</h4>
                        </div>
                        <div style={{ float: 'left'}}>
                            <h4 style={{ color: theme.palette.background.light }}>Crie agora mesmo a sua conta!</h4>
                            <Link to="/register/carereceiver">
                                <button style={{ width: '120px', background: theme.palette.secondary.main}}>Cliente</button>
                            </Link>
                            <Link to="/register/caregiver" style={{ marginLeft: '30px'}}>
                                <button style={{ width: '120px', background: theme.palette.secondary.main }}>Cuidador</button>
                            </Link>
                        </div>
                    </div>

                    <div className="columnRight50">
                        <LoginForm setIsLogged={setIsLogged}></LoginForm>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Login;