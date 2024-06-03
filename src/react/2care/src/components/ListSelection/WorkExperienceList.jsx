import { Grid, Typography  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { addWorkExperience, getWorkExperienceList, removeWorkExperience } from '../../services/caregiverService';


function WorkExperienceList(props) {
  const [workExperience, setWorkExperience] = useState([]);
  const [currentPlace, setCurrentPlace] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState('');
  const [currentEndDate, setCurrentEndDate] = useState('');

  useEffect(() => {
    if(props?.caregiverData?.work_exp){
      setWorkExperience(props.caregiverData.work_exp || [])
    }else{
      getWorkExperienceList().then((result) => {
        const workExperience = result ? result["work_experience"] : []
        setWorkExperience(workExperience)
      })
    }
  }, []);

  const handleAddClick = () => {
    sendWorkExperience();
  };

  const handleDeleteClick = (workExperience) => {
    removeWorkExperience(workExperience).then((result) => {
      if(result){
        setWorkExperience(prev => prev.filter(item => item.id !== result["work_experience"]))
      }
    });
  };

  async function sendWorkExperience() {
    const workExperience = {"place": currentPlace, "description": currentDescription, "start_date": currentStartDate, "end_date": currentEndDate}

    await addWorkExperience(workExperience).then((result) => {
      if (result) {
        setWorkExperience(prev => [...prev, result]);
      } else {
        //retornar um erro massa
      }
    })
  }

  return (
    <div>
      <h1>Lista de Experiência de trabalho</h1>
      <div className="select-add-container">
        {props.isSelf &&
          <div className="select-container">
            <Grid container justifyContent="center">
              <Grid item xs={6}>
              <label htmlFor="place">Local</label>
                <input
                  type="text"
                  value={currentPlace}
                  id="place"
                  name="place"
                  onChange={e => setCurrentPlace(e.target.value)}
                  placeholder="Digite uma qualificação"
                />
              </Grid>
              <Grid item xs={3}>
                <div className="field">
                  <label htmlFor="start_date ">Data de inicio:</label>
                  <input
                    value={currentStartDate}
                    onChange={e => setCurrentStartDate(e.target.value)}
                    type="date"
                    id="start_date "
                    name="start_date "
                  ></input>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="field">
                  <label htmlFor="end_date ">Data de termino:</label>
                  <input
                    value={currentEndDate}
                    onChange={e => setCurrentEndDate(e.target.value)}
                    type="date"
                    id="end_date "
                    name="end_date "
                  ></input>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="field" style={{"marginTop": "1em"}}>
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
          </div>
        }
      </div>
      <ul className="qualification-list">
        {workExperience.map((work, index) => (
          <li key={index} className="list-item">
            {/* Tá feio p kct, mas meu tempo é curto. */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Local de trabalho:
                </Typography>
                <Typography variant="body1">
                  {work.place}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">
                  Data de inicio:
                </Typography>
                <Typography variant="body1">
                  {work.start_date}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">
                  Data de termino:
                </Typography>
                <Typography variant="body1">
                  {work.end_date}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Descrição do trabalho:
                </Typography>
                <Typography variant="body1">
                  {work.description}
                </Typography>
              </Grid>
            </Grid>
            {props.isSelf &&
              <button onClick={() => handleDeleteClick(work.id)} className="delete-button">
                Excluir
              </button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkExperienceList;