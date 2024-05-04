import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Rating } from 'react-simple-star-rating'
import { createEvaluation } from '../../services/caregiverService';
import { useNavigate } from "react-router-dom";


const EvaluationModal = ({caregiverId, open, handleClose }) => {
  const theme = useTheme();
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(5);
  const navigate = useNavigate();

  const handleRateChange = (event, newValue) => {
    setRate(newValue+1);
  };

  const handleSave = async () => {
    const evaluation = {
      "rating": rate,
      "description": comment,
      "caregiverId":caregiverId,
    }
    await createEvaluation(evaluation).then(() => {
      navigate("/home"); 
    })
    handleClose();
    
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="evaluation-modal-title"
      aria-describedby="evaluation-modal-description"
      style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}
    >
      <div style={{
        backgroundColor: theme.palette.background.main,
        boxShadow: theme.shadows[5],
        borderRadius: "2em",
        padding: theme.spacing(2, 4, 3),
        width: '75vw', // Adjust the width as needed
        maxWidth: '90vw', // Adjust the maximum width as needed
      }}>
        <Typography variant="h6" id="evaluation-modal-title">
          Avaliar
        </Typography>
        <TextField
          id="evaluation-comment"
          label="Comentario"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginTop: '16px'}}
        />
        <Typography id="evaluation-modal-description" gutterBottom style={{marginTop: "1em"}}>
          Nota: {rate}
        </Typography>
        <Rating
          name="star-slider"
          initialValue={rate}
          onClick={(event, newValue) => {
            handleRateChange(event, newValue);
          }}
        />
        <br/>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EvaluationModal;