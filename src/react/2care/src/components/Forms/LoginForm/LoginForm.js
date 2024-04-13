import React, { useState } from "react";
import { signIn } from "../../../services/authService";

const LoginForm = () => {
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
    } catch (error) {
      console.error("Erro ao autenticar o usuário:", error.message);
      // Exibir uma mensagem de erro para o usuário, se necessário
    }
  };

  return (
    <form style={{ width: "90%" }}>
      <div style={{ width: "100%", textAlign: "center", padding: "1.5em" }}>
        <h2>Entre agora mesmo!</h2>
        <input type="text" id="email" placeholder="E-mail" required />
        <input type="password" id="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </div>
    </form>
  );
};

export default LoginForm;
