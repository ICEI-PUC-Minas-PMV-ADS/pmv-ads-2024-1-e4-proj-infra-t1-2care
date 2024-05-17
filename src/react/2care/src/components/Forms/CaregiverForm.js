import React, { useState, useRef, useEffect } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Inputmask from "inputmask";
import { toast } from 'react-toastify';

const CaregiverForm = () => {
  const navigate = useNavigate();
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
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validateCEP = (cep) => {
    const re = /^\d{5}-\d{3}$/;
    return re.test(cep);
  };

  const validatePhone = (phone) => {
    const re = /^\(\d{2}\)\s?\d?\d{4}-\d{4}$/;
    return re.test(phone);
  };

  const phoneInputRef = useRef(null);
  useEffect(() => {
    Inputmask({ 
      mask: ["(99) 9999-9999", "(99) 99999-9999"],
      placeholder: "(**) ****-****" 
    }).mask(phoneInputRef.current);
  }, []);
  
  const codePostInputRef = useRef(null);
  useEffect(() => {
    Inputmask({ 
      mask: "99999-999",
      placeholder: "*****-***" 
    }).mask(codePostInputRef.current);
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setErrors({ ...errors, [name]: "Por favor, insira um e-mail válido." });
    } else 
    if (name === 'post_code' && !validateCEP(value)) {
      setErrors({ ...errors, [name]: "Por favor, insira um CEP válido." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Por favor, esse campo é obrigatório!";
    }

    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Por favor, insira um e-mail válido.";
    }

    if (!formData.password) {
      validationErrors.password = "Por favor, esse campo é obrigatório!";
    } else if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (!formData.confirm_password) {
      validationErrors.confirm_password = "Por favor, esse campo é obrigatório!";
    } else if (formData.password !== formData.confirm_password) {
      validationErrors.confirm_password = "As senhas não coincidem.";
    }

    if (!formData.birth_date) {
      validationErrors.birth_date = "Por favor, insira sua data de nascimento.";
    }

    if (!formData.name) {
      validationErrors.name = "Por favor, preencha seu nome completo.";
    }
    
    if (!formData.phone) {
      validationErrors.phone = "Por favor, insira um número de telefone ou celular.";
    } else if (!validatePhone(formData.phone)) {
      validationErrors.phone = "Por favor, insira um número de telefone válido.";
    } else if (formData.phone.replace(/\D/g,'').length < 10) {
      validationErrors.phone = "O número de telefone deve ter pelo menos 8 dígitos.";
    }

    if (!formData.gender) {
      validationErrors.gender = "Por favor, selecione seu gênero.";
    }

    if (!formData.address) {
      validationErrors.address = "Por favor, insira seu endereço.";
    }

    if (!formData.post_code) {
      validationErrors.post_code = "Por favor, esse campo é obrigatório!";
    } else if (!formData.post_code || !validateCEP(formData.post_code)) {
      validationErrors.post_code = "Por favor, insira um CEP válido.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await registerUser(formData).then(i => i ? toast.success('Conta criada com sucesso',{onClose: () => {navigate("/");}, autoClose:1000}) : "");
 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="columnForm">
        <div className="columnLeft50">
          <div className="field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              onBlur={handleBlur}
            ></input>
              {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required              
            ></input>
             {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
          </div>
          <div className="field">
            <label htmlFor="confirm_password">Confirmar senha:</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            ></input>
            {errors.confirm_password && <span style={{ color: "red" }}>{errors.confirm_password}</span>}
          </div>
          <div className="field">
            <label htmlFor="name">Nome completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="field">
            <label htmlFor="birth_date">Data de Nascimento:</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="field">
            <label htmlFor="phone">Telefone/Celular:</label>
            <input
              ref={phoneInputRef}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            ></input>
            {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
          </div>
        </div>
        <div className="columnRight50">
          <div className="field">
            <label htmlFor="gender">Gênero:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Selecione</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="0">Não especificado</option>
            </select>
            {errors.gender && <span style={{ color: "red" }}>{errors.gender}</span>}
          </div>
          <div className="field">
            <label htmlFor="address">Endereço:</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="post_code">CEP:</label>
            <input
              ref={codePostInputRef}
              type="text"
              id="post_code"
              name="post_code"
              value={formData.post_code}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.post_code && <span style={{ color: "red" }}>{errors.post_code}</span>}
          </div>
                  
          <div id="buttonReg">
            <button type="submit">Salvar conta</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CaregiverForm;
