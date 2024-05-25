import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { editSelfCalendar, getSelfCalendar } from '../../services/caregiverService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Calendar from "react-multi-date-picker";
import { toast } from 'react-toastify';

function AvailabilityList(props) {
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [customDays, setCustomDays] =  useState([]);

  const weekDays = {0:"Domingo", 1:"Segunda", 2:"Terça", 3:"Quarta", 4:"Quinta", 5:"Sexta", 6:"Sábado"};

  const hours = [...Array(24).keys()].map((hour) => ({
    value: hour,
    label: hour.toString().padStart(2, '0') + ":00",
  }));

  useEffect(() => {
    //alterar com props aqui ringu
    getSelfCalendar().then((result) => {
      if(result){
        setCustomDays(result["custom_unavailable_days"].map((day) => day.day))
        setSelectedDays(result["fixed_unavailable_days"].map((day) => String(day.day)))
        setSelectedHours(result["fixed_unavailable_hours"].map((hour) => hour.hour))
      }
    })
  }, []);
  
    async function enviarAgenda() {
      const calendar = {"fixed_unavailable_hours": selectedHours, "fixed_unavailable_days": selectedDays, "custom_unavailable_days": customDays}
      
      await editSelfCalendar(calendar).then((result) => {
        result ? toast.success("Agenda atualizada com sucesso!") : toast.error("Um erro ocorreu ao atualizar agenda, por favor tente novamente")
      })
  
    }

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
                  onChange={(e) => setSelectedDays(e.target.value) }
                >
                  {Object.keys(weekDays).map((key) => (
                    <MenuItem key={key} value={key} style={selectedDays.includes(key) ? { backgroundColor: "#D2DAC3" } : {}}>
                      {weekDays[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} style={{marginTop: "2em", marginBottom: "2em"}}>
              <InputLabel>Selecione os dias que não deseja trabalhar.</InputLabel>
                <Calendar 
                style={{display: "hidden"}}
                  value={customDays}
                  onChange={(e) => setCustomDays(e.map(dt => `${dt.year}-${dt.monthIndex+1}-${dt.day}`))}
                  multiple
                ></Calendar>
            </Grid>
            <button onClick={enviarAgenda} className="add-button">
              Salvar
            </button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default AvailabilityList;