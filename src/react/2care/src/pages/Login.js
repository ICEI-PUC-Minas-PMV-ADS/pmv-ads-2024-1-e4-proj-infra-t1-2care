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

        backgroundImage: "url('https://jaycampbell.com/wp-content/uploads/2022/08/dreamstime_s_27991533.jpg')",
        
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        display: 'flex',
    }

    {/* 


        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElXejxt2tigB6vAZYXkz9FqKMA6O9mWv32Q&s')",
    
        

backgroundImage: "url('https://jaycampbell.com/wp-content/uploads/2022/08/dreamstime_s_27991533.jpg')",

backgroundImage: "url('https://ohoje.com/public/imagens/fotos/amp/2022/06/9-abre-Pedro-Pinheiro-3-scaled.jpg')",

backgroundImage: "url('https://img.portalt5.com/lYiPACEftl3E50KsPwMuC6-yJTE=/516x350/smart/imagens%2FParaiba_recebe_forca-tarefa_que_investiga_crimes_de_violencia_contra_idosos.jpeg')", 

backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElXejxt2tigB6vAZYXkz9FqKMA6O9mWv32Q&s')",

backgroundImage: "url('https://images.unsplash.com/photo-1580893246395-52aead8960dc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

    */}




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