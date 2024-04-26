import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const CarereceiverForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    phone: "",
    user_type: 2,
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

    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Por favor, insira um e-mail válido.";
    }

    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (formData.password !== formData.confirm_password) {
      validationErrors.confirm_password = "As senhas não coincidem.";
    }
    
    if (!formData.name) {
      validationErrors.name = "Por favor, preencha seu nome completo.";
    }

    if (!formData.birth_date) {
      validationErrors.birth_date = "Por favor, insira sua data de nascimento.";
    }

    if (!formData.phone) {
      validationErrors.phone = "Por favor, insira seu número de telefone ou celular.";
    }
  
    if (!formData.gender) {
      validationErrors.gender = "Por favor, selecione seu gênero.";
    }
  
    if (!formData.address) {
      validationErrors.address = "Por favor, insira seu endereço.";
    }
  
    if (!formData.post_code || !validateCEP(formData.post_code)) {
      validationErrors.post_code = "Por favor, insira um CEP válido, no formato: 00000-000.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      console.log("Usuário registrado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar os dados:", error.message);
    }
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
            <label htmlFor="password">password:</label>
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
          {/*<div className="field">
          <label htmlFor="language">Idioma:</label>
          <select id="language" name="language" value={formData.language} onChange={handleChange}>
            <option value="portugues">Português</option>
            <option value="ingles">Inglês</option>
            <option value="espanhol">Espanhol</option>
          </select>
        </div>*/}
          <div className="field">
            <label htmlFor="contact_number">Telefone/Celular:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              onBlur={handleBlur}
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
              required
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
              type="text"
              id="post_code"
              name="post_code"
              value={formData.post_code}
              onChange={handleChange}
              required
              onBlur={handleBlur}
              ></input>
              {errors.post_code && <span style={{ color: "red" }}>{errors.post_code}</span>}
            </div>
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
};

export default CarereceiverForm;
