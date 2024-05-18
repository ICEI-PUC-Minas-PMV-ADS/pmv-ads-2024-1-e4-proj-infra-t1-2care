
import React from 'react';
import { Link, useLocation, useSearchParams  } from 'react-router-dom';
import './NavBar.css';
import { isLoggedIn } from "../../services/authService";
import { Box, Button, Modal, Typography, TextField, MenuItem, Slider, FormControl, InputLabel, Select, Grid } from '@mui/material/';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useTheme } from '@mui/material/styles';
import { border } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: 'none'
};

const NavBar = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [distance, setDistance] = React.useState(0);
    const [specializationList, setSpecializationList] = React.useState([]);
    const [specialization, setSpecialization] = React.useState('');
    const [qualificationList, setQualificationList] = React.useState([]);
    const [qualification, setQualification] = React.useState('');
    const [experience, setExperience] = React.useState(0);
    const [rating, setRating] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>  setOpen(false)
    const location = useLocation();
    const theme = useTheme();

    const clearFilters = () => {
        setDistance(0)
        setSpecialization('')
        setQualification('')
        setExperience(0)
        setRating(null)
        setSearchParams({});
        setOpen(false);
    }
    
    const filter = () => {
        const params = {
            distance: distance.toString(),
            specialization,
            qualification,
            experience: experience.toString(),
            rating: rating !== null ? rating.toString() : ''
        };

        Object.keys(params).forEach(key => {
            if (!params[key]) {
                delete params[key];
            }
        });

        setSearchParams(params);
        setOpen(false)
    }
    
    React.useEffect(() => {
        if(location.pathname === "/home"){
            let specializations = props.caregiverList.flatMap(obj => obj.specializations);
            let qualifications = props.caregiverList.flatMap(obj => obj.qualifications);
            if(specializations.length > 0){
                setSpecializationList(specializations)
            }
            if(qualifications.length > 0){
                setQualificationList(qualifications)
            }
        }
    }, [props]);
    
    return (
        <div className='navBar'>
            {location.pathname !== "/home" ? (
                <span>
                    <a className='navBarLink' href="/home">Navegue pelo 2Care</a>
                </span>
            ) : (
                <span>
                    <a onClick={handleOpen} className='navBarLink'>Filtros</a>
                    {isLoggedIn() && (
                        <a className='navBarLink' href="/requests">Proposta</a>
                    )}
                </span>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >

                <Box sx={style} component="form">
                    <Typography id="modal-title" variant="h6" component="h2">
                        Filtros
                    </Typography>
                    
                    <Slider
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}  
                        aria-labelledby="distance-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={300}
                    />
                    <Typography gutterBottom>Distância: {distance} km</Typography>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="specialization-label">Especialização</InputLabel>
                        <Select
                            labelId="specialization-label"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            label="Specialization"
                        >
                            <MenuItem value=""><em>---</em></MenuItem>
                            {specializationList.map((e) =><MenuItem key={e} value={e}>{e}</MenuItem> )}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="qualification-label">Qualificação</InputLabel>
                        <Select
                            labelId="qualification-label"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            label="Qualification"
                        >
                            <MenuItem value=""><em>---</em></MenuItem>
                            {qualificationList.map((e) =><MenuItem key={e.name} value={e.name}>{e.name}</MenuItem> )}
                        </Select>
                    </FormControl>

                    <Typography gutterBottom sx={{ mt: 2 }}>Anos de experiência</Typography>
                    <Slider
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        aria-labelledby="experience-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={50}
                    />
                    <Box display="flex" style={{width:"100%"}} justifyContent='center'> 
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div key={`evaluation_${star}`} style={{marginTop:5}}>
                                <label>
                                    <input type="radio" style={{ display: 'none' }} value={star} checked={rating === star} readOnly onClick={() =>  setRating(star == rating ? null : star)} />
                                    {rating === star ? <AiFillStar style={{ color: '#FFBC0B', verticalAlign: 'middle', fontSize:"2em"}}/> : <AiOutlineStar style={{ verticalAlign: 'middle', fontSize:"2em"  }} />}
                                    <Typography component="span" style={{ verticalAlign: 'middle', marginLeft: '0.2em', color: theme.palette.primary.main, fontSize: '1.2rem' }}>
                                        {star}
                                    </Typography>
                                </label>
                            </div>
                        ))}
                    </Box>
                    <Box display="flex" style={{width:"100%"}} justifyContent='center'> 
                        <Button display="block" variant="outlined" onClick={clearFilters} sx={{ mt: 5, mx: 2 }}>
                            Limpar filtros
                        </Button>
                        <Button display="block" variant="contained" onClick={filter} sx={{ mt: 5, mx: 2 }}>
                            Aplicar filtros
                        </Button>
                    </Box>
                </Box>

            </Modal>
        </div>
    )
}

export default NavBar;