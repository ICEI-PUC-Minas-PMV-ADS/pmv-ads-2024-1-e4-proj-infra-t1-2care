const LoginForm = () => {
    return (
        <form style={{ width: '90%' }}>
            <div style={{ width: '100%', textAlign: 'center', padding: '1.5em' }}>
                <h2>Entre agora mesmo!</h2>
                <input type="text" id="email" placeholder="E-mail" required />
                <input type="password" id="password" placeholder="Senha" required />
                <button type="submit">Entrar</button>
            </div>
        </form>
    )
}

export default LoginForm;