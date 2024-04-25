import React, { useState } from 'react';
import { registerCaregiver } from "../../services/authService";
import SpecializationList from '../ListSelection/SpecializationListSelection';
import { useNavigate } from 'react-router-dom';

const SpecializationForm = () => {

  const [specializations, setSpecializations] = useState([]);
  const navigate = useNavigate();

  const handleAddSpecialization = (specialization) => {
    if (!specializations.includes(specialization)) {
      setSpecializations(prevSpecializations => [...prevSpecializations, specialization]);
    }
  };

  const handleRemoveSpecialization = (specialization) => {
    setSpecializations(prevSpecializations => prevSpecializations.filter(spec => spec !== specialization));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await registerCaregiver({ specializations });
        console.log("Usuário registrado com sucesso");
        // Salve as especializações conforme necessário aqui
        // Redireciona para a página ProfileCaregiver
        navigate('/ProfileCaregiver');
      } catch (error) {
        console.error("Erro ao cadastrar os dados:", error.message);
      }
    };
  
  return (
    <form onSubmit={handleSubmit}>
        <div id='columnForm'> 
            <div className='columnLeft50'>
                <SpecializationList 
                    onAdd={handleAddSpecialization}
                    onRemove={handleRemoveSpecialization}
                    selectedSpecializations={specializations}
                />
                <button type="submit">Salvar</button>
            </div>
        </div>
    </form>
  );
}

export default SpecializationForm;