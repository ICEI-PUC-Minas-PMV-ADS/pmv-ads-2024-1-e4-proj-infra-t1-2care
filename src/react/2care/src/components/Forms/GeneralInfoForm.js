const GeneralInfoForm = () => {
    const css = {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-around', justifyItems: 'left'
    }
    
    return (
        <form action="#" method="POST" >
            <div style={css}>
                <div style={{ flex: '1' }}>
                    <div>
                        <label for="nome_completo">Nome completo:</label>
                        <input type="text" id="nome_completo" name="nome_completo" required></input>
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required></input>
                    </div>
                    <div>
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required></input>
                    </div>
                    <div>
                        <label for="confirmar_senha">Confirmar senha:</label>
                        <input type="password" id="confirmar_senha" name="confirmar_senha" required></input>
                    </div>
                </div>
                <div style={{ flex: '2' }}>
                    <div>

                        <label for="telefone">Telefone/Celular:</label>
                        <input type="tel" id="telefone" name="telefone"></input>
                    </div>
                    <div>
                        <label for="genero">Gênero:</label>
                        <select id="genero" name="genero">
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div>
                        <label for="idioma">Idioma:</label>
                        <select id="idioma" name="idioma">
                            <option value="portugues">Português</option>
                            <option value="ingles">Inglês</option>
                            <option value="espanhol">Espanhol</option>
                        </select>
                    </div>
                    <div>
                        <label for="data_nascimento">Data de Nascimento:</label>
                        <input type="date" id="data_nascimento" name="data_nascimento">
                        </input>
                    </div>
                </div>
            </div>
            <div>
                <label>Agora, escolha o tipo do seu perfil:</label>
                <input type="radio" id="cliente" name="perfil" value="cliente"></input>
                <label for="cliente">Cliente</label>
                <input type="radio" id="cuidador" name="perfil" value="cuidador"></input>
                <label for="cuidador">Cuidador</label>
            </div>
            <div>
                <input type="submit" value="Enviar">
                </input>
            </div>
        </form>
    )
}

export default GeneralInfoForm;