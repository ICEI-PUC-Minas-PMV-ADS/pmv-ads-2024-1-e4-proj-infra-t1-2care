import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import LoginForm from "../components/LoginForm/LoginForm";
import { useTheme } from '@mui/material/styles';
import './App.css'


const Login = () => {
    const theme = useTheme();

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <section style={{ backgroundColor: theme.palette.background.main, display: 'flex', backgroundImage: "url('https://jaycampbell.com/wp-content/uploads/2022/08/dreamstime_s_27991533.jpg')" }} >
                <article style={{ backgroundColor: '#799275', borderRadius: '20px', margin: '10em', padding: '1em' }}>
                    <h2 style={{ color:'#ED8733', fontWeight:'700' }}>Bem-vindos ao 2Care!</h2>
                    <h6 style={{ justifyContent: 'center', fontSize: '1.2em', color: '#ffffff' }}>Conectamos famílias a cuidadores de idosos de maneira ágil e eficiente, facilitando a busca pelo profissional que melhor atenda às suas necessidades.</h6>

                </article>
                <article>
                    <LoginForm></LoginForm>
                </article>
            </section>
        </div >
    )
}

export default Login;