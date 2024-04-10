import React, { useState } from 'react';

function CaregiverForm() {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Dados salvos:', {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className='column-left'>
          <div className='field'>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <div className='field'>
            <label for="password">Senha:</label>
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
            </input></div>
          <div className='field'>
            <label for="language">Idioma:</label>
            <select id="language" name="language">
              <option value="portugues">Português</option>
              <option value="ingles">Inglês</option>
              <option value="espanhol">Espanhol</option>
            </select></div>
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
        <div className='column-right'>
          <div className='field'>
            <label for="qualifications">Qualificações:</label>
            <input type="text" id="qualifications" name="qualifications" />
          </div>
          <div className='field'>
            <label for="work_experience">Experiência de trabalho:</label>
            <input type="text" id="work_experience" name="work_experience" />
          </div>
          <div className='field'>
            <label for="specializations">Especializações:</label>
            <select id="specializations" name="specializations">
              <option value=""></option>
            </select>
          </div>
          <div className='field'>
            <label for="unavailable_days">Dias fixos indisponíveis:</label>
            <input type="text" id="unavailable_days" name="unavailable_days" />
          </div>
          <div className='field'>
            <label for="unavailable_hours">Horários fixos indisponíveis:</label>
            <input type="text" id="unavailable_hours" name="unavailable_hours" />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <label for="daily_price">Valor diária:</label>
              <input type="text" id="daily_price" name="daily_price" />
            </div>
            <div>
              <label for="hourly_price">Valor hora:</label>
              <input type="text" id="hourly_price" name="hourly_price" />
            </div>
            <div>
              <label for="work_years">Anos na área:</label>
              <input type="text" id="work_years" name="work_years" />
            </div>
          </div>
          <div className='field'>
            <label for="address">Localização:</label>
            <input type="text" id="address" />
          </div>
          <div className='field'>
            <label for="additional_info">Informações adicionais:</label>
            <input type="text" id="additional_info" name="additional_info" />
          </div>
        </div>
        <button type="submit">Salvar</button>
      </div>
    </form >
  );
}

export default CaregiverForm;
