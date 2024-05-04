import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { updateCaregiver } from '../../../services/caregiverService';
import { useNavigate } from "react-router-dom";


const CaregiverProfileForm = (props) => {
  const [formDataUser, setFormDataUser] = useState({
    //user info
    name: '', //required
    phone: '', //required
    gender: '',
    birth_date: '',
    address: '', //required
    post_code: '', //required
  });
  const [formDataCaregiver, setFormDataCaregiver] = useState({
    //caregiver info
    hour_price: '', //required
    day_price: '',
    max_request_km: '', //required
    career_time: '',
    additional_info: ''
  });

  useEffect(() => {
    let defaultData = {}
    Object.keys(formDataUser).forEach(key => {
      defaultData[key] = props.userData.hasOwnProperty(key) ? props.userData[key] : ""
      defaultData[key] = defaultData[key] === null ? '' : defaultData[key]
    });
    setFormDataUser(defaultData)
  }, [props.userData]);

  useEffect(() => {
    let defaultData = {}
    Object.keys(formDataCaregiver).forEach(key => {
      defaultData[key] = props.caregiverData.hasOwnProperty(key) ? props.caregiverData[key] : ""
      defaultData[key] = defaultData[key] === null ? '' : defaultData[key]
    });

    setFormDataCaregiver(defaultData)
  }, [props.caregiverData]);


  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    post_code: false,
    gender: false,
    hour_price: false,
  });
  const handleChangeCaregiver = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    setFormDataCaregiver({ ...formDataCaregiver, [name]: updatedValue });
  }
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'birth_date' || name === 'phone' || name === 'emergency_contact') {
      const numericValue = value.replace(/\D/g, '');

      if (name === 'phone' || name === 'emergency_contact') {
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

    setFormDataUser({ ...formDataUser, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFieldsUser = ['name', 'phone', 'address', 'post_code', 'gender'];
    const requiredFieldsCaregiver = ['hour_price', 'max_request_km'];
    const newErrors = {};
    let hasError = false;

    requiredFieldsUser.forEach((field) => {
      if (!String(formDataUser[field]).trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });
    requiredFieldsCaregiver.forEach((field) => {
      if (!String(formDataCaregiver[field]).trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });


    if (hasError) {
      setErrors(newErrors);
      console.log('Por favor, preencha todos os campos obrigatórios.');
    } else {
      await updateCaregiver(formDataUser, formDataCaregiver).then((reponse) =>{//da pra jogar um if dps e descer uma badge pra dar os resultados
        reponse ? window.location.reload() : alert("Erro ao atualizar dados.")
      })
    }
  };

  const navigate = useNavigate() 

  return (
    <form onSubmit={handleSubmit}>
      <div id="columnForm">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <h1>Editar Perfil</h1>
          </Grid>
          <Grid item xs={6}>

            <div className="field">
              <label htmlFor="name">Nome Completo:</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formDataUser.name}
                onChange={handleChangeUser}
              />
            </div>

            <div className="field">
              <label htmlFor="birth_date">Data de Nascimento:</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formDataUser.birth_date}
                onChange={handleChangeUser}
              ></input>
            </div>

            <div className="field">
              <label htmlFor="gender">Gênero:</label>
              <select
                id="gender"
                name="gender"
                value={formDataUser.gender}
                onChange={handleChangeUser}
              >
                <option value="">Selecione o Gênero</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
                <option value="0">Não especificado</option>
              </select>
            </div>


            <div className="field">
              <label htmlFor="phone">Telefone:</label>
              <input
                required
                type="text"
                id="phone"
                name="phone"
                value={formDataUser.phone}
                onChange={handleChangeUser}
              />
            </div>

            <div className="field">
              <label htmlFor="address">Endereço:</label>
              <input
                required
                type="text"
                id="address"
                name="address"
                value={formDataUser.address}
                onChange={handleChangeUser}
              />
            </div>

            <div className="field">
              <label htmlFor="post_code">CEP:</label>
              <input
                required
                type="text"
                id="post_code"
                name="post_code"
                value={formDataUser.post_code}
                onChange={handleChangeUser}
              />
            </div>

          </Grid>
          <Grid item xs={6}>
            <div className="field">
              <label htmlFor="hour_price">Preço da hora:</label>
              <input
                required
                type="number" 
                step="0.01"
                id="hour_price"
                name="hour_price"
                value={formDataCaregiver.hour_price}
                onChange={handleChangeCaregiver}
              />
            </div>
            <div className="field">
              <label htmlFor="day_price">Preço da diaria:</label>
              <input
                type="number" 
                step="0.01"
                id="day_price"
                name="day_price"
                value={formDataCaregiver.day_price}
                onChange={handleChangeCaregiver}
              />
            </div>
            <div className="field">
              <label htmlFor="max_request_km">Distancia maxima de atendimento:</label>
              <input
                required
                type="number" 
                id="max_request_km"
                name="max_request_km"
                value={formDataCaregiver.max_request_km}
                onChange={handleChangeCaregiver}
              />
            </div>
            <div className="field">
              <label htmlFor="career_time">Tempo de carreira:</label>
              <input
                type="number" 
                id="career_time"
                name="career_time"
                value={formDataCaregiver.career_time}
                onChange={handleChangeCaregiver}
              />
            </div>
            <div className="field">
              <label htmlFor="additional_info">Informações adicionais:</label>
              <textarea
                type="text" 
                id="additional_info"
                name="additional_info"
                value={formDataCaregiver.additional_info}
                onChange={handleChangeCaregiver}
              />
            </div>
          </Grid>
          <button type="submit">Salvar Alterações</button>
        </Grid>
      </div>
    </form >
    );
  };

export default CaregiverProfileForm;