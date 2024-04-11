const LoginForm = () => {
    return (
        <form style={{ width: '60%' }}>
            <div style={{ width: '100%', textAlign: 'center'}}>
                <h2>Entre agora mesmo</h2>
                {/* <div className="field"> */}
                    <input type="text" id="email" placeholder="E-mail" required />
                {/* </div> */}
                {/* <div className="field"> */}
                    <input type="password" id="password" placeholder="Senha" required />
                {/* </div> */}
                <button type="submit">Entrar</button>
            </div>
        </form>
    )
}

export default LoginForm;