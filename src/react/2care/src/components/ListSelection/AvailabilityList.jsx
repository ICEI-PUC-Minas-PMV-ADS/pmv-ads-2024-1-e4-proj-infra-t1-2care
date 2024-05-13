import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';
import { addSpecialCare, removeSpecialCare, getSpecialCareList } from '../../services/careReceiverService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import startOfDay from "date-fns/startOfDay";
import Calendar from "react-multi-date-picker";

function AvailabilityList(props) {
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [customDays, setCustomDays] =  useState([]);

  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  const hours = [...Array(24).keys()].map((hour) => ({
    value: hour,
    label: hour.toString().padStart(2, '0') + ":00",
  }));

  useEffect(() => {
    //alterar com props aqui ringu
    /* getSpecialCareList().then((result) => {
      const specialCare = result ? result["specialCare"] : []
      setSelectedSpecialiCare(specialCare)
    }) */
  }, []);
  const handleAddClick = () => { }

  /*   const handleDeleteClick = async (specialCare) => {
      await removeSpecialCare(specialCare).then((result) => {
        if (result) {
          setSelectedSpecialiCare(prev => prev.filter(item => item.id !== specialCare));
        } else {
          //retornar um erro massa
        }
      })
    };
  
    async function enviarAgenda() {
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
  
    } */

  return (
    <div>
      <Card sx={{ borderRadius: '1.5em', boxShadow: "0px 4px 4px 0px #00000040;" }}>

        <CardContent>
          <h1>Agenda</h1>
          <Grid container justifyContent="center" style={{ marginTop: "2em" }}>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Selecione as horas que não deseja trabalhar.</InputLabel>
                <Select
                  multiple
                  value={selectedHours}
                  onChange={(e) => setSelectedHours(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {hours.map((hour) => (
                    <MenuItem key={hour.value} value={hour.value} style={selectedHours.includes(hour.value) ? { backgroundColor: "#D2DAC3" } : {}}>
                      {hour.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <hr />

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Selecione os dias da semana que não deseja trabalhar.</InputLabel>
                <Select
                  multiple
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {weekDays.map((day) => (
                    <MenuItem key={day} value={day} style={selectedDays.includes(day) ? { backgroundColor: "#D2DAC3" } : {}}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} style={{marginTop: "2em", marginBottom: "2em"}}>
              <InputLabel>Selecione os dias que não deseja trabalhar.</InputLabel>
              <Calendar 
                value={customDays}
                onChange={setCustomDays}
                multiple
              />
            </Grid>
            <button onClick={handleAddClick} className="add-button">
              Salvar
            </button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}


export default AvailabilityList;