const CarereceiverForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para salvar os dados
        console.log('Dados salvos:', {});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="column-left">
                    <div className='field'>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required></input>
                    </div>
                    <div className='field'>
                        <label for="password">password:</label>
                        <input type="password" id="password" name="password" required></input>
                    </div>
                    <div className='field'>
                        <label for="confirm_password">Confirmar senha:</label>
                        <input type="password" id="confirm_password" name="confirm_password" required></input>
                    </div>
                    <div className='field'>
                        <label for="name">Nome completo:</label>
                        <input type="text" id="name" name="name" required></input>
                    </div>
                    <div className='field'>
                        <label for="birth_date">Data de Nascimento:</label>
                        <input type="date" id="birth_date" name="birth_date">
                        </input>
                    </div>
                    <div className='field'>
                        <label for="language">Idioma:</label>
                        <select id="language" name="language">
                            <option value="portugues">Português</option>
                            <option value="ingles">Inglês</option>
                            <option value="espanhol">Espanhol</option>
                        </select>
                    </div>
                    <div className='field'>
                        <label for="contact_number">Telefone/Celular:</label>
                        <input type="tel" id="contact_number" name="contact_number"></input>
                    </div>
                    <div className='field'>
                        <label for="gender">Gênero:</label>
                        <select id="gender" name="gender">
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                </div>
                <div className="column-right">
                    <div className='field'>
                        <label for="address">Localização:</label>
                        <input type="text" id="address" name="address" ></input>
                    </div>
                    <div className='field'>
                        <label for="special_care">Cuidados Especiais:</label>
                        <input type="text" id="special_care" name="special_care" ></input>
                    </div>
                    <div className='field'>
                        <input type="checkbox" id="share_special_Care" name="share_special_Care" ></input>
                        <label for="share_special_Care">Aceito compartilhar cuidados especiais</label>
                    </div>
                    <div className='field'>
                        <label for="emergency_contact">Contatos de Emergência:</label>
                        <input type="text" id="emergency_contact" name="emergency_contact" ></input>
                    </div>
                    <div className='field'>
                        <label for="additional_info">Informações Adicionais:</label>
                        <textarea id="additional_info" name="additional_info"></textarea>
                    </div>
                </div>
            <button type="submit">Salvar</button>
            </div>
        </form >
    )
}

export default CarereceiverForm;