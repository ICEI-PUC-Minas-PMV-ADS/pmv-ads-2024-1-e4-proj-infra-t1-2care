import { useState, useEffect } from "react";
import RatingCard from "./RatingCard";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const RatingList = (props) => {
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(props.evaluationdata || {});
    }, [props.evaluationdata]);

    const handleRadioChange = (value) => {
        setSelectedValue(value == selectedValue ? null : value);
        const newData = value != selectedValue ? props.evaluationdata.filter(ev => ev.rating === value) : props.evaluationdata;
        setFilteredData(newData);
    };

    return (
        <div>
            <div className="filter" style={{ display: 'flex', fontSize: '1.5em' }}>
                <Typography variant="h6" style={{ color: theme.palette.primary.main }} >Filtros:</Typography>
                {[1, 2, 3, 4, 5].map((star) => (
                    <div key={`evaluation_${star}`} >
                        <label>
                            <input type="radio" style={{ display: 'none' }} value={star} checked={selectedValue === star} readOnly onClick={() => handleRadioChange(star)} />
                            {selectedValue === star ? <AiFillStar style={{ color: '#FFBC0B', verticalAlign: 'middle' }}/> : <AiOutlineStar style={{ verticalAlign: 'middle' }} />}
                            <Typography component="span" style={{ verticalAlign: 'middle', marginLeft: '0.2em', color: theme.palette.primary.main, fontSize: '1.2rem' }}>
                                {star}
                            </Typography>
                        </label>
                    </div>
                ))}
            </div>
            {filteredData.length > 0 ? filteredData.map((ev) => (
                <RatingCard key={`Evaluation_${ev.id}`} evaluation={ev}></RatingCard>
            )): []}
        </div>

    )
}

export default RatingList;