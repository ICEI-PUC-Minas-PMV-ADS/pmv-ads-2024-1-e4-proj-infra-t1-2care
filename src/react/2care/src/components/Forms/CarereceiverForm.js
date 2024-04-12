import React, { useState } from "react";
import { authService } from '../../services/authService';

const CarereceiverForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    birth_date: "",
    language: "",
    contact_number: "",
    gender: "",
    address: "",
    special_care: "",
    share_special_care: false,
    emergency_contact: "",
    additional_info: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      console.log("Usuário registrado com sucesso");
      
    } catch (error) {
      console.error("Erro ao cadastrar os dados:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="columnLeft50">
        <div className="field">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required></input>
        </div>
        <div className="field">
          <label for="password">password:</label>
          <input type="password" id="password" name="password" required></input>
        </div>
        <div className="field">
          <label for="confirm_password">Confirmar senha:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
          ></input>
        </div>
        <div className="field">
          <label for="name">Nome completo:</label>
          <input type="text" id="name" name="name" required></input>
        </div>
        <div className="field">
          <label for="birth_date">Data de Nascimento:</label>
          <input type="date" id="birth_date" name="birth_date"></input>
        </div>
        <div className="field">
          <label for="language">Idioma:</label>
          <select id="language" name="language">
            <option value="portugues">Português</option>
            <option value="ingles">Inglês</option>
            <option value="espanhol">Espanhol</option>
          </select>
        </div>
        <div className="field">
          <label for="contact_number">Telefone/Celular:</label>
          <input type="tel" id="contact_number" name="contact_number"></input>
        </div>
        <div className="field">
          <label for="gender">Gênero:</label>
          <select id="gender" name="gender">
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
      <div className="columnRight50">
        <div className="field">
          <label for="address">Localização:</label>
          <input type="text" id="address" name="address"></input>
        </div>
        <div className="field">
          <label for="special_care">Cuidados Especiais:</label>
          <input type="text" id="special_care" name="special_care"></input>
        </div>
        <div>
          <input
            type="checkbox"
            className="checkbox"
            id="share_special_Care"
            name="share_special_Care"
          ></input>
          <label for="share_special_Care">
            Aceito compartilhar cuidados especiais
          </label>
        </div>
        <div className="field">
          <label for="emergency_contact">Contatos de Emergência:</label>
          <input
            type="text"
            id="emergency_contact"
            name="emergency_contact"
          ></input>
        </div>
        <div className="field">
          <label for="additional_info">Informações Adicionais:</label>
          <textarea id="additional_info" name="additional_info"></textarea>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default CarereceiverForm;
