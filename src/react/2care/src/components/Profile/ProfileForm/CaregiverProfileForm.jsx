import React, { useState } from 'react';

const CaregiverProfileForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      gender: '',
      birth_date: '',
      address: '',
      post_code: '',
      qualifications: '',
      experience: '',
      specializations: '',
      rate: ''
    });

    const [errors, setErrors] = useState({
      name: false,
      phone: false,
      address: false,
      post_code: false,
      gender: false
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      let updatedValue = value;
  
      if (name === 'birth_date' || name === 'phone' || name === 'emergency_contact') {
        const numericValue = value.replace(/\D/g, '');
  
        if (name === 'birth_date') {
          updatedValue = numericValue.slice(0, 8);
  
          if (updatedValue.length === 8) {
            updatedValue = `${updatedValue.substring(0, 2)}/${updatedValue.substring(2, 4)}/${updatedValue.substring(4, 8)}`;
          }
        } else if (name === 'phone' || name === 'emergency_contact') {
          updatedValue = numericValue.slice(0, 11);
  
          if (updatedValue.length >= 10) {
            updatedValue = `(${updatedValue.substring(0, 2)}) ${updatedValue.substring(2, 7)}-${updatedValue.substring(7)}`;
          }
        }
      } else if (name === 'post_code') {
        const numericValue = value.replace(/\D/g, '');
  
        updatedValue = numericValue.slice(0, 8);
  
        if (updatedValue.length === 8) {
          updatedValue = `${updatedValue.substring(0, 5)}-${updatedValue.substring(5)}`;
        }
      }
  
      setFormData({ ...formData, [name]: updatedValue });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const requiredFields = ['name', 'phone', 'address', 'post_code', 'gender'];
      const newErrors = {};
      let hasError = false;
  
      requiredFields.forEach((field) => {
        if (!formData[field].trim()) {
          newErrors[field] = true;
          hasError = true;
        }
      });
  
      if (hasError) {
        setErrors(newErrors);
        console.log('Por favor, preencha todos os campos obrigatórios.');
      } else {
        console.log('Dados atualizados:', formData);
      }
    };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <div id="columnForm">
          <div className="columnLeft50">
            <h1>Editar Perfil</h1>
            <div className="field">
              <label htmlFor="name">Nome Completo:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="birth_date">Data de Nascimento:</label>
              <input
                type="text"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>
    
            <div className="field">
            <label htmlFor="gender">Gênero:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecione o Gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Não especificado">Não especificado</option>
            </select>
          </div>

            <div className="field">
            <label htmlFor="phone">Telefone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="field">
            <label htmlFor="post_code">CEP:</label>
              <input
                type="text"
                id="post_code"
                name="post_code"
                value={formData.post_code}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="qualifications">Qualificações:</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="experience">Experiência Profissional:</label>
              <input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="specializations">Especializações:</label>
              <input
                type="text"
                id="specializations"
                name="specializations"
                value={formData.specializations}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="rate">Tarifa:</label>
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
              />
            </div>
  
            <button type="submit">Salvar Alterações</button>
          </div>
        </div>
      </form>
    );
  };
  
  export default CaregiverProfileForm;