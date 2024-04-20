import React, { useState } from 'react';

const specializations = [
  "Selecione uma especialização",
  "Cuidados Básicos de Saúde",
  "Apoio à Mobilidade",
  "Higiene e Cuidados Pessoais",
  "Nutrição e Preparo de Refeições",
  "Estimulação Cognitiva e Emocional",
  "Acompanhamento e Transporte",
  "Gestão de Rotinas e Medicamentos",
  "Cuidados com o Ambiente Doméstico",
  "Suporte em Cuidados Paliativos",
  "Formação em Demência e Alzheimer",
];

function SpecializationList() {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('');

  const handleAddClick = () => {
    if (currentSelection && !selectedSpecializations.includes(currentSelection)) {
      setSelectedSpecializations(prev => [...prev, currentSelection]);
      setCurrentSelection('');
    }
  };

  const handleDeleteClick = (specialization) => {
    setSelectedSpecializations(prev => prev.filter(item => item !== specialization));
  };

  return (
    <div>
      <h2>Lista das especializações</h2>
      <div className="select-add-container">
        <div className="select-container">
          <select 
            value={currentSelection} 
            onChange={e => setCurrentSelection(e.target.value)}
            className="input-style-spec"
          >
            {specializations.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
            <button onClick={handleAddClick} className="add-button">
          Adicionar
            </button>
        </div>
      </div>
      <ul className="specialization-list">
        {selectedSpecializations.map((spec, index) => (
          <li key={index} className="list-item">
            <span className="item-text">{spec}</span>
            <button onClick={() => handleDeleteClick(spec)} className="delete-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default SpecializationList;