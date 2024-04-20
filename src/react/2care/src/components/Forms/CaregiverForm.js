import React, { useState } from 'react';
import { registerCaregiver } from "../../services/authService";

const CaregiverForm = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    phone: "",
    user_type: 1, 
    gender: "",
    address: "",
    post_code: "",
    qualifications: [],
    work_experience: [],
    specializations: [],
    fixed_unavailable_days: [],
    fixed_unavailable_hours: [],
    custom_unavailable_days: [],
    hour_price: null,
    day_price: null,
    max_request_km: null,
    additional_info: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCaregiver(formData);
      console.log("Usuário registrado com sucesso");
      
    } catch (error) {
      console.error("Erro ao cadastrar os dados:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id='columnForm'> 
        <div className='columnLeft50'>
          <div className='field'>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required></input>
          </div>
          <div className='field'>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required></input>
          </div>
          <div className='field'>
            <label htmlFor="confirm_password">Confirmar senha:</label>
            <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required></input>
          </div>
          <div className='field'>
            <label htmlFor="name">Nome completo:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required></input>
          </div>
          <div className='field'>
            <label htmlFor="birth_date">Data de Nascimento:</label>
            <input type="date" id="birth_date" name="birth_date" value={formData.birth_date} onChange={handleChange}></input>
          </div>
          <div className='field'>
            <label htmlFor="phone">Telefone/Celular:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}></input>
          </div>
              <div className='field'>
                <label htmlFor="gender">Gênero:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                  <option value="0">Não especificado</option>
                </select>
              </div>
          <div className='field'>
            <label htmlFor="address">Address:</label>
            <input id="address" name="address" type='text' value={formData.address} onChange={handleChange}/>
          </div>
          <div className='field'>
            <label htmlFor="post_code">post_code:</label>
            <input type="text" id="post_code" name="post_code" value={formData.post_code} onChange={handleChange}/>
          </div>
        </div>
        {/* <div className='columnRight50'>
          <div className='field'>
            <label htmlFor="qualifications">Qualificações:</label>
            <input type="text" id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleChange} />
          </div>
          <div className='field'>
          <label htmlFor="work_experience">Experiência de trabalho:</label>
            <input type="text" id="work_experience" name="work_experience" value={formData.work_experience} onChange={handleChange} />
          </div>
          <div className='field'>
            <label htmlFor="specializations">Especializações:</label>
            <select id="specializations" name="specializations" value={formData.specializations} onChange={handleChange}>
              <option value="0">Cuidados Básicos de Saúde</option>
              <option value="1">Apoio à Mobilidade</option>
              <option value="2">Higiene e Cuidados Pessoais</option>
              <option value="3">Nutrição e Preparo de Refeições</option>
              <option value="4">Estimulação Cognitiva e Emocional</option>          
              <option value="5">Acompanhamento e Transporte</option>
              <option value="6">Gestão de Rotinas e Medicamentos</option>
              <option value="7">Cuidados com o Ambiente Doméstico</option>
              <option value="8">Suporte em Cuidados Paliativos</option>
              <option value="9">Formação em Demência e Alzheimer</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor="unavailable_days">Dias fixos indisponíveis:</label>
            <input type="text" id="unavailable_days" name="unavailable_days" value={formData.fixed_unavailable_days} onChange={handleChange} />
          </div>
          <div className='field'>
            <label htmlFor="unavailable_hours">Horários fixos indisponíveis:</label>
            <input type="text" id="unavailable_hours" name="unavailable_hours" value={formData.fixed_unavailable_hours} onChange={handleChange} />
          </div>
          <div class="flex-container">
            <div>
              <label htmlFor="daily_price">Valor diária:</label>
              <input type="text" id="daily_price" name="day_price" value={formData.day_price} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="hourly_price">Valor hora:</label>
              <input type="text" id="hourly_price" name="hour_price" value={formData.hour_price} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="work_years">Anos na área:</label>
              <input type="text" id="work_years" name="work_years" value={formData.work_years} onChange={handleChange} />
            </div>
          </div>
          <div className='field'>
            <label htmlFor="address">Localização:</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className='field'>
            <label htmlFor="additional_info">Informações adicionais:</label>
            <input type="text" id="additional_info" name="additional_info" value={formData.additional_info} onChange={handleChange} />
          </div>
        </div> */}
        <button type="submit">Salvar</button>
      </div>
    </form >
  );
}

export default CaregiverForm;
