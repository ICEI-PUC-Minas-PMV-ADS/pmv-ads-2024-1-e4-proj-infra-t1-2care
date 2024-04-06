import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';


const Login = () => {
    const theme = useTheme();

    return (
        <div>
            <TopBar></TopBar>
            <NavBar></NavBar>
            <section style={{ backgroundColor: theme.palette.background.main, display: 'flex' }} >
                <article style={{ backgroundColor: theme.palette.background.light, borderRadius: '20px' }}>
                    <h2>Bem-vindos ao 2Care!</h2>
                    <h6 style={{ justifyContent: 'center' }}>Conectamos famílias a cuidadores de idosos de maneira ágil e eficiente, facilitando a busca pelo profissional que melhor atenda às suas necessidades.</h6>

                </article>
                <article style={{ backgroundColor: theme.palette.background.light }}>
                    <form>
                        <h2>Entre agora mesmo</h2>
                        <h6>Cria a sua conta aqui</h6>
                        <div>
                            <input type="text" id="email" placeholder="E-mail" required />
                        </div>
                        <div>
                            <input type="password" id="password" placeholder="Senha" required />
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                </article>
            </section>
        </div >
    )
}

export default Login;