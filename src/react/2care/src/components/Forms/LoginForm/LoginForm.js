import React, { useState } from "react";
import { signIn } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData);
      console.log("Usuário autenticado com sucesso!");
      // Redirecionar o usuário para a página principal ou para a próxima rota após o login
      navigate("/home"); 
      setIsLogged(true);
    } catch (error) {
      console.error("Erro ao autenticar o usuário:", error.message);
      // Exibir uma mensagem de erro para o usuário, se necessário
    }
  };

  return (
    <form style={{ width: "90%" }} onSubmit={handleSubmit}>
      <div style={{ width: "100%", textAlign: "center", padding: "1.5em" }}>
        <h2>Entre agora mesmo!</h2>
        <input type="text" id="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
        <input type="password" id="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        <div>
          <button type="submit">Entrar</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
