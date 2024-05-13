import { Grid, Typography  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { addQualification, getQualificationList, removeQualification } from '../../services/caregiverService';
import { toast } from 'react-toastify';


function QualificationList() {
  const [qualifications, setQualifications] = useState([]);
  const [currentQualification, setCurrentQualification] = useState('');
  const [currentConclusionDate, setCurrentConclusionDate] = useState('');
  const [currentFileText, setCurrentFileText] = useState('');

  useEffect(() => {
    //alterar com props aqui ringu
    getQualificationList().then((result) => {
      const qualifications = result ? result["qualifications"] : []
      setQualifications(qualifications)
    })
  }, []);

  const handleAddClick = () => {
    const urlRegex = /^(?:http|ftp)s?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,6}\.?\/?(?:\/[^\/\s]*)*$/i;
    if(!currentFileText || urlRegex.test(currentFileText)){
      enviarQualificacao();
    }else{
      toast.error("Por favor, utilize um URL valida")
      //retornar um erro massa
    }
  };

  const handleDeleteClick = (qualification) => {
    removeQualification(qualification).then((result) => {
      if(result){
        setQualifications(prev => prev.filter(item => item.id !== result["qualification"]))
      }
    });
  };

  async function enviarQualificacao() {
    const qualification = {"name": currentQualification, "conclusion_date": currentConclusionDate, "file": currentFileText}

    await addQualification(qualification).then((result) => {
      if (result) {
        setQualifications(prev => [...prev, result]);
      } else {
        //retornar um erro massa
      }
    })
  }

  return (
    <div>
      <h1>Lista de Qualificações</h1>
      <div className="select-add-container">
        <div className="select-container">
          <Grid container justifyContent="center">
            <Grid item xs={6}>
            <label htmlFor="qualification">Qualificação</label>
              <input
                type="text"
                value={currentQualification}
                id="qualification"
                name="qualification"
                onChange={e => setCurrentQualification(e.target.value)}
                placeholder="Digite uma qualificação"
              />
            </Grid>
            <Grid item xs={4}>
              <div className="field">
                <label htmlFor="conclusion_date ">Data de conclusão:</label>
                <input
                  value={currentConclusionDate}
                  onChange={e => setCurrentConclusionDate(e.target.value)}
                  type="date"
                  id="conclusion_date "
                  name="conclusion_date "
                ></input>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="field" style={{"marginTop": "1em"}}>
                <label htmlFor="additional_info">Link do comprovante de conclusão:</label>
                <textarea
                  value={currentFileText}
                  onChange={e => setCurrentFileText(e.target.value)}
                  type="text" 
                  id="additional_info"
                  name="additional_info"
                />
              </div>
            </Grid>
          <button onClick={handleAddClick} className="add-button">
            Adicionar
          </button>
          </Grid>
        </div>
      </div>
      <ul className="qualification-list">
        {qualifications.map((qual, index) => (
          <li key={index} className="list-item">
            {/* Tá feio p kct, mas meu tempo é curto. */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" className="qualification-label">
                  Name:
                </Typography>
                <Typography variant="body1" className="qualification-value">
                  {qual.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" className="qualification-label">
                  Conclusion Date:
                </Typography>
                <Typography variant="body1" className="qualification-value">
                  {qual.conclusion_date}
                </Typography>
              </Grid>
              {qual.file ? 
                <Grid item xs={12}>
                  <Typography variant="body1" className="qualification-label">
                    File:
                  </Typography>
                  <Typography variant="body1" className="qualification-value">
                    <a href={qual.file}>File link</a>
                  </Typography>
                </Grid>
              : ""}
              
            </Grid>
            <button onClick={() => handleDeleteClick(qual.id)} className="delete-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QualificationList;