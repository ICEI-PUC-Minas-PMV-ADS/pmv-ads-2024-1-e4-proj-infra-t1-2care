import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QualificationList from '../ListSelection/QualificationList';

const QualificationForm = () => {
  const [qualifications, setQualifications] = useState([]);
  const navigate = useNavigate();

  const handleAddQualification = (qualification) => {
    if (!qualifications.includes(qualification)) {
      setQualifications(prevQualifications => [...prevQualifications, qualification]);
    }
  };

  const handleRemoveQualification = (qualification) => {
    setQualifications(prevQualifications => prevQualifications.filter(q => q !== qualification));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //backend api
      console.log("Qualificações registradas com sucesso:", qualifications);
      // redi p a pag ProfileCaregiver dps salvar
      navigate('/ProfileCaregiver');
    } catch (error) {
      console.error("Erro ao cadastrar as qualificações:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id='columnForm'> 
        <div className='column100qual'>
          <QualificationList
            onAdd={handleAddQualification}
            onRemove={handleRemoveQualification}
            selectedQualifications={qualifications}
          />
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
};

export default QualificationForm;