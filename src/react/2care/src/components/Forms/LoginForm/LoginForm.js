import React, { useState } from "react";
import { signIn } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


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

    await signIn(formData).then((i) => i ?  toast.success('Login efetuado com sucesso',{onClose: () => {navigate("/home");}, autoClose:2000}) : "")
    
  };

  return (
    <form style={{ width: "90%" }} onSubmit={handleSubmit}>
      <div style={{ width: "100%", textAlign: "center", padding: "1.5em" }}>
        <h2>Entre agora mesmo!</h2>
        <div>
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
          {errors.email && <span style={{ color: "red", display: 'block' }}>{errors.email}</span>}
        </div>
        <div>
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
          {errors.password && <span style={{ color: "red", display: 'block' }}>{errors.password}</span>}
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;


