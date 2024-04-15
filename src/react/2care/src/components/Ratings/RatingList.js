import { useState, useEffect } from "react";
import RatingCard from "./RatingCard";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingList = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(props.data);
    }, [props.data]);

    const handleRadioChange = (value) => {
        setSelectedValue(value == selectedValue ? null : value);
        const newData = value != selectedValue ? props.data.filter(ev => ev.note === value) : props.data;
        setFilteredData(newData);
    };

    return (
        <div className="ratingList">
            <div className="filter" style={{ display: 'flex', fontSize: '1.5em' }}>
                <p>Filtros: </p>
                {[1, 2, 3, 4, 5].map((star) => (
                    <div key={`evaluation_${star}`}>
                        <label >
                            <span style={{ verticalAlign: 'middle', marginRight: '5px' }}>{star}</span>
                            <input type="radio" style={{ display: 'none' }} value={star} checked={selectedValue === star} readOnly onClick={() => handleRadioChange(star)} />
                            {selectedValue === star ? <AiFillStar style={{ color: '#FFBC0B', verticalAlign: 'middle' }}/> : <AiOutlineStar style={{ verticalAlign: 'middle' }} />}
                        </label>
                    </div>
                ))}
            </div>
            {filteredData.map((ev) => (
                <RatingCard key={`Evaluation_${ev.name}`} evaluation={ev}></RatingCard>
            ))}
        </div>

    )
}

export default RatingList;