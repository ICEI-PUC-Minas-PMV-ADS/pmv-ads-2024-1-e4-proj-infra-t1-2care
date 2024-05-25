import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { updateCareReceiver } from '../../../services/careReceiverService';
import { toast } from 'react-toastify';

const CareReceiverProfileForm = (props) => {
  const [formDataUser, setFormDataUser] = useState({
    //user info
    name: '', //required
    phone: '', //required
    gender: '',
    birth_date: '',
    address: '', //required
    post_code: '', //required
    picture: '',
    preferred_contact: ''
  });
  const [formDataCareReceiver, setFormDataCareReceiver] = useState({
    //Care receiver info
    emergency_contact: '', //required
    share_special_care: false,
    additional_info: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    post_code: false,
    gender: false
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
    Object.keys(formDataCareReceiver).forEach(key => {
      defaultData[key] = props.careReceiverData.hasOwnProperty(key) ? props.careReceiverData[key] : ""
      defaultData[key] = defaultData[key] === null ? '' : defaultData[key]
    });

    setFormDataCareReceiver(defaultData)
  }, [props.careReceiverData]);

  const handleChangeCareReceiver = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    const numericValue = value.replace(/\D/g, '');

    if(name === "share_special_care"){
      updatedValue = e.target.checked;
    }
    else if (name === 'emergency_contact'){
      updatedValue = numericValue.slice(0, 11);
      if (updatedValue.length >= 10) {
        updatedValue = `(${updatedValue.substring(0, 2)}) ${updatedValue.substring(2, 7)}-${updatedValue.substring(7)}`;
      }
    }
    setFormDataCareReceiver({ ...formDataCareReceiver, [name]: updatedValue });
  }

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'birth_date' || name === 'phone') {
      const numericValue = value.replace(/\D/g, '');

      if (name === 'phone') {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFieldsUser = ['name', 'phone', 'address', 'post_code', 'gender'];
    const requiredFieldsCareReceiver = ['emergency_contact'];
    const newErrors = {};
    let hasError = false;

    requiredFieldsUser.forEach((field) => {
      if (typeof formDataUser[field] === 'string') {
        if (!formDataUser[field].trim()) {
          newErrors[field] = true;
          hasError = true;
        }
      }else if (!formDataUser[field]) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    requiredFieldsCareReceiver.forEach((field) => {
      if (typeof formDataCareReceiver[field] === 'string') {
        if (!formDataCareReceiver[field].trim()) {
          newErrors[field] = true;
          hasError = true;
        }
      }else if (!formDataCareReceiver[field]) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      toast.error('Por favor, preencha todos os campos obrigatórios.');
    } else {
      updateCareReceiver(formDataUser, formDataCareReceiver)
    }
  };

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
                type="text"
                id="phone"
                name="phone"
                value={formDataUser.phone}
                onChange={handleChangeUser}
              />
            </div>

            <div className="field">
              <label htmlFor="preferred_contact">Contato preferencial:</label>
              <select
                id="preferred_contact"
                disabled={!props.isSelf ? true : false}
                name="preferred_contact"
                value={formDataUser.preferred_contact}
                onChange={handleChangeUser}
              >
                <option value="0">E-mail</option>
                <option value="1">Telefone</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="address">Endereço:</label>
              <input
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
              <label htmlFor="emergency_contact">Telefone de Emergência:</label>
              <input
                type="text"
                id="emergency_contact"
                name="emergency_contact"
                value={formDataCareReceiver.emergency_contact}
                onChange={handleChangeCareReceiver}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  id="share_special_care"
                  name="share_special_care"
                  checked={formDataCareReceiver.share_special_care ? true : false}
                  onChange={handleChangeCareReceiver}
                />
              }
              label="Compartilhar cuidados especiais?"
            />
            <div className="">
              <label htmlFor="additional_info">Informações adicionais:</label>
              <textarea
                type="text" 
                id="additional_info"
                name="additional_info"
                value={formDataCareReceiver.additional_info}
                onChange={handleChangeCareReceiver}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="field">
              <label htmlFor="picture">Foto de perfil (Link):</label>
              <textarea
                type="text"
                id="picture"
                name="picture"
                style={{width:"97%"}}
                value={formDataUser.picture}
                onChange={handleChangeUser}
              />
            </div>
          </Grid>
        <button type="submit">Salvar Alterações</button>
        </Grid>
      </div>
    </form>
  );
};
export default CareReceiverProfileForm;