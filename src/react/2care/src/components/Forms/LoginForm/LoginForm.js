import React, { useState } from "react";
import { signIn } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import getUserByEmail from "../../../services/userService";

const LoginForm = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setErrors({ ...errors, [name]: "Por favor, insira um e-mail válido." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Por favor, insira o e-mail cadastrado.";
    }

    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "Senha inválida!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signIn(formData);
      console.log("Usuário autenticado com sucesso!");
      navigate("/home");      
      const userData = await getUserByEmail(formData.email);
      setIsLogged(true);
      console.log("Informações do usuário:", userData);
    } catch (error) {
      console.error("Erro ao autenticar o usuário:", error.message);
    }
  };

  return (
    <form style={{ width: "90%" }} onSubmit={handleSubmit}>
      <div style={{ width: "100%", textAlign: "center", padding: "1.5em" }}>
        <h2>Entre agora mesmo!</h2>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="E-mail" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ borderColor: errors.email ? 'red' : 'initial' }}
          />
          {errors.email && <span style={{ color: "red", position: 'relative', top: '100%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', padding: '0.5em', borderRadius: '5px' }}>{errors.email}</span>}
        </div>
        <div style={{ position: 'relative' }}>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Senha" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ borderColor: errors.password ? 'red' : 'initial' }} 
          />
          {errors.password && <span style={{ color: "red", position: 'relative', top: '100%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', padding: '0.5em', borderRadius: '5px' }}>{errors.password}</span>}
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;


