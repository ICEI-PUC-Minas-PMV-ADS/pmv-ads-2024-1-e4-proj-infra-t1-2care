import './LoginForm.css'

const LoginForm = () => {
    return (
        <div className="loginForm">
            <form>
                <h2>Entre agora mesmo</h2>
                <h6>Cria a sua conta <a>aqui</a></h6>
                <div>
                    <input type="text" id="email" placeholder="E-mail" required />
                </div>
                <div>
                    <input type="password" id="password" placeholder="Senha" required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default LoginForm;