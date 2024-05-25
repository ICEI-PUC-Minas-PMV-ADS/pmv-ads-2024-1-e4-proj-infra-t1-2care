import React, { useState, useEffect } from 'react';
import { addSpecialization, removeSpecialization, getSpecializationList } from '../../services/caregiverService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { toast } from 'react-toastify';

const specializations = [
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

function SpecializationList(props) {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({ "value": "" });

  useEffect(() => {

    if (props?.caregiverData?.specializations) {

      setSelectedSpecializations(props.caregiverData.specializations || [])
    } else {
      
      getSpecializationList().then((result) => {
        const specializations = result ? result["specializations"] : []
        setSelectedSpecializations(specializations)
      })
    }
  }, []);

  const handleAddClick = () => {
    if (currentSelection.value && !selectedSpecializations.includes(currentSelection.options[currentSelection.selectedIndex].textContent)) {
      setCurrentSelection({ "value": "" });
      enviarEspecializacao()
    } else {
      toast.warn('Está especialização já existe');
      setCurrentSelection({ "value": "" });
    }
  };

  const handleDeleteClick = async (specialization) => {
    await removeSpecialization(specialization).then((result) => {
      if (result) {
        setSelectedSpecializations(prev => prev.filter(item => item !== specialization));
      } else {
        //retornar um erro massa
      }
    })
  };

  async function enviarEspecializacao() {
    const especializacao = currentSelection.value

    if (!Number.isInteger(parseInt(especializacao, 10))) {
      //retornar um erro massa
      return false
    }

    await addSpecialization(especializacao).then((result) => {
      if (result) {
        setSelectedSpecializations(prev => {
          if (!prev.includes(result["specialization"])) {
            return [...prev, result["specialization"]];
          } else {
            return prev;
          }
        })
      } else {
        //retornar um erro massa
      }
    })

  }

  return (
    <div>
      <Card sx={{ borderRadius: '1.5em', boxShadow: "0px 4px 4px 0px #00000040;" }}>
        <CardContent>
          <h1>Lista das Especializações</h1>
          <div className="select-add-container">
            {props.isSelf &&
              <div className="select-container">
                <select
                  value={currentSelection.value}
                  onChange={e => setCurrentSelection(e.target)}
                  className="input-style-spec"
                >
                  <option key="-" value="Selecione uma especialização">Selecione uma especialização</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={index}>{spec}</option>
                  ))}
                </select>
                <button onClick={handleAddClick} className="add-button">
                  Adicionar
                </button>
              </div>
            }
          </div>
          <ul className="specialization-list">
            {selectedSpecializations.map((spec, index) => (
              <li key={index} className="list-item">
                <span className="item-text">{spec}</span>
                {props.isSelf &&
                  <button onClick={() => handleDeleteClick(spec)} className="delete-button">
                    Excluir
                  </button>
                }
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


export default SpecializationList;