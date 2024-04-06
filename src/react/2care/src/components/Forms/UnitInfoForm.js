const UnitInfoForm = () => {
    return (
        <form action="#" method="POST">
            <div class="radio-buttons">
                <label>Agora, escolha o tipo do seu perfil:</label>
                <input type="radio" id="familiar" name="perfil" value="familiar" />
                <label for="familiar">Familiar</label>
                <input type="radio" id="cuidador" name="perfil" value="cuidador" />
                <label for="cuidador">Quem receberá os cuidados</label>
            </div>
            <div>
                <label for="localizacao">Localização:</label>
                <input type="text" id="localizacao" name="localizacao" ></input>
            </div>
            <div>
                <label for="contato_emergencia">Contatos de Emergência:</label>
                <input type="text" id="contato_emergencia" name="contato_emergencia" ></input>
            </div>
            <div>
                <label for="cuidados_especiais">Cuidados Especiais:</label>
                <input type="text" id="cuidados_especiais" name="cuidados_especiais" ></input>
            </div>
            <div>
                <input type="checkbox" id="compartilhar_cuidados" name="compartilhar_cuidados" ></input>
                <label for="compartilhar_cuidados">Aceito compartilhar cuidados especiais</label>
            </div>
            <div>
                <label for="info_adicionais">Informações Adicionais:</label>
                <textarea id="info_adicionais" name="info_adicionais"></textarea>
            </div>
            <div>
                <input type="submit" value="Enviar" />
            </div>
        </form >
    )
}

export default UnitInfoForm;