import React, { useState } from 'react';


function QualificationList() {
  const [qualifications, setQualifications] = useState([]);
  const [currentQualification, setCurrentQualification] = useState('');

  const handleAddClick = () => {
    if (currentQualification && !qualifications.includes(currentQualification)) {
      setQualifications(prev => [...prev, currentQualification]);
      setCurrentQualification('');
    }
    enviarQualificacao(currentQualification);
  };

  const handleDeleteClick = (qualification) => {
    setQualifications(prev => prev.filter(item => item !== qualification));
  };

  function enviarQualificacao(qualification) {
    fetch('/add/qualification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ qualification })
    })
    .then(response => response.json())
    .then(data => console.log('Sucesso:', data))
    .catch((error) => console.error('Erro:', error));
  }

  return (
    <div>
      <h1>Lista de Qualificações</h1>
      <div className="select-add-container">
        <div className="select-container">
        <input
          type="text"
          value={currentQualification}
          onChange={e => setCurrentQualification(e.target.value)}
          className="input-style-qual"
          placeholder="Digite uma qualificação"
        />
        <button onClick={handleAddClick} className="add-button">
          Adicionar
        </button>
        </div>
      </div>
      <ul className="qualification-list">
        {qualifications.map((qual, index) => (
          <li key={index} className="list-item">
            <span className="item-text">{qual}</span>
            <button onClick={() => handleDeleteClick(qual)} className="delete-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QualificationList;