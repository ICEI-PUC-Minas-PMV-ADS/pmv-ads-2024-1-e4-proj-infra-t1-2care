import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { addSpecialCare, removeSpecialCare, getSpecialCareList } from '../../services/careReceiverService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const special_care = [
  "Cuidados com a Saúde",
  "Apoio Emocional",
  "Fisioterapia",
  "Acompanhamento Médico",
  "Apoio à Mobilidade",
  "Cuidados Pessoais",
  "Apoio Doméstico",
  "Nutrição",
  "Atividades Recreativas",
  "Gestão de Demência/Alzheimer",
  "Suporte Noturno",
  "Gestão da Dor",
  "Cuidados Paliativos",
]

function SpecialCareList(props) {
  const [selectedSpecialiCare, setSelectedSpecialiCare] = useState([]);
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentSelection, setCurrentSelection] = useState({ "value": "" });

  useEffect(() => {
    //alterar com props aqui ringu
    getSpecialCareList().then((result) => {
      const specialCare = result ? result["specialCare"] : []
      setSelectedSpecialiCare(specialCare)
    })
  }, []);

  const handleAddClick = () => {
    if (currentSelection.value && currentDescription) {
      enviarCuidadoEspecial()
    } else {
      //retornar um erro massa
    }
  };

  const handleDeleteClick = async (specialCare) => {
    await removeSpecialCare(specialCare).then((result) => {
      if (result) {
        setSelectedSpecialiCare(prev => prev.filter(item => item.id !== specialCare));
      } else {
        //retornar um erro massa
      }
    })
  };

  async function enviarCuidadoEspecial() {
    const specialCare = {"care_type": currentSelection.value, "description": currentDescription}

    if (!Number.isInteger(parseInt(specialCare["care_type"], 10))) {
      //retornar um erro massa
      return false
    }

    await addSpecialCare(specialCare).then((result) => {
      if (result) {
        setCurrentSelection({ "value": "" });
        setSelectedSpecialiCare(prev =>  [...prev, result])
      } else {
        //retornar um erro massa
      }
    })

  }

  return (
    <div>
      <Card sx={{ borderRadius: '1.5em', boxShadow: "0px 4px 4px 0px #00000040;" }}>
        <CardContent>
          <h1>Lista de Cuidados especiais</h1>

          <Grid container justifyContent="center" style={{ marginTop: "2em" }}>
            <Grid item xs={12}>
              <select
                value={currentSelection.value}
                onChange={e => setCurrentSelection(e.target)}
              >
                <option key="-" value="Selecione um cuidado especial">Selecione um cuidado especial</option>
                {special_care.map((spec, index) => (
                  <option key={index} value={index}>{spec}</option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12}>
              <div className="field" style={{ "marginTop": "1em" }}>
                <label htmlFor="description">Descrição do trabalho:</label>
                <textarea
                  value={currentDescription}
                  onChange={e => setCurrentDescription(e.target.value)}
                  type="text"
                  id="additional_info"
                  name="description"
                />
              </div>
            </Grid>
            <button onClick={handleAddClick} className="add-button">
              Adicionar
            </button>
          </Grid>
        </CardContent>
      </Card>
      {selectedSpecialiCare.map((spec, index) => (
        <Card sx={{ borderRadius: '1.5em', boxShadow: "0px 4px 4px 0px #00000040;", marginTop: "2em" }} >
          <CardContent>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12}>
                <Typography variant="body1">
                  {spec.care_type_display.name_display}
                </Typography>
                <hr />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="body1">
                  {spec.description}
                </Typography>
              </Grid>
            </Grid>
            <button onClick={() => handleDeleteClick(spec.id)} className="delete-button">
              Excluir
            </button>
          </CardContent>
        </Card>))}

    </div>
  );
}


export default SpecialCareList;