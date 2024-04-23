import React, { useState } from 'react';

const CaregiverProfileForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      age: '',
      location: '',
      qualifications: '',
      experience: '',
      specializations: '',
      availability: '',
      rate: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Dados atualizados:', formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div id="columnForm">
          <div className="columnLeft50">
            <h1>Editar Perfil do Cuidador</h1>
            <div className="field">
              <label htmlFor="name">Nome Completo:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="age">Idade:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="location">Localização Aproximada:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="qualifications">Qualificações:</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="experience">Experiência Profissional:</label>
              <input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="specializations">Especializações:</label>
              <input
                type="text"
                id="specializations"
                name="specializations"
                value={formData.specializations}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="availability">Disponibilidade:</label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              />
            </div>
  
            <div className="field">
              <label htmlFor="rate">Tarifa:</label>
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
              />
            </div>
  
            <button type="submit">Salvar Alterações</button>
          </div>
        </div>
      </form>
    );
  };
  
  export default CaregiverProfileForm;