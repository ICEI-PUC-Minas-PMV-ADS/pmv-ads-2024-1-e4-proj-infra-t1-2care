import React, { useState } from 'react';

function ProfessionalInfoForm() {
  const [qualifications, setQualifications] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [unavailableDays, setUnavailableDays] = useState('');
  const [unavailableHours, setUnavailableHours] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [yearsInField, setYearsInField] = useState('');
  const [distance, setDistance] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Dados salvos:', {
      qualifications,
      workExperience,
      specializations,
      unavailableDays,
      unavailableHours,
      dailyRate,
      hourlyRate,
      yearsInField,
      distance,
      additionalInfo
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="qualifications">Qualificações:</label>
      <input 
        type="text" 
        id="qualifications" 
        name="qualifications"
        value={qualifications}
        onChange={(e) => setQualifications(e.target.value)}
      /><br />

      <label htmlFor="work_experience">Experiência de trabalho:</label>
      <input 
        type="text" 
        id="work_experience" 
        name="work_experience"
        value={workExperience}
        onChange={(e) => setWorkExperience(e.target.value)}
      /><br />

      <label htmlFor="specializations">Especializações:</label>
      <input 
        type="text" 
        id="specializations" 
        name="specializations"
        value={specializations}
        onChange={(e) => setSpecializations(e.target.value)}
      /><br />

      <label htmlFor="unavailable_days">Dias fixos indisponíveis:</label>
      <input 
        type="text" 
        id="unavailable_days" 
        name="unavailable_days"
        value={unavailableDays}
        onChange={(e) => setUnavailableDays(e.target.value)}
      /><br />

      <label htmlFor="unavailable_hours">Horários fixos indisponíveis:</label>
      <input 
        type="text" 
        id="unavailable_hours" 
        name="unavailable_hours"
        value={unavailableHours}
        onChange={(e) => setUnavailableHours(e.target.value)}
      /><br />

      <label htmlFor="daily_rate">Valor diária:</label>
      <input 
        type="text" 
        id="daily_rate" 
        name="daily_rate"
        value={dailyRate}
        onChange={(e) => setDailyRate(e.target.value)}
      /><br />

      <label htmlFor="hourly_rate">Valor hora:</label>
      <input 
        type="text" 
        id="hourly_rate" 
        name="hourly_rate"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
      /><br />

      <label htmlFor="years_in_field">Anos na área:</label>
      <input 
        type="text" 
        id="years_in_field" 
        name="years_in_field"
        value={yearsInField}
        onChange={(e) => setYearsInField(e.target.value)}
      /><br />

      <label htmlFor="distance">Distância:</label>
      <input 
        type="text" 
        id="distance" 
        name="distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      /><br />

      <label htmlFor="additional_info">Informações adicionais:</label>
      <input 
        type="text" 
        id="additional_info" 
        name="additional_info"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      /><br />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default ProfessionalInfoForm;
