import { useState } from "react";
import RatingCard from "../RatingCard/RatingCard";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingList = () => {

    const [selectedValue, setSelectedValue] = useState(null);

    const handleRadioChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <div className="ratingList">
            <div className="filter" style={{display:'flex'}}>
                <div>
                <label className={`star-radio-button ${selectedValue === '1' ? 'checked' : ''}`} onClick={() => handleRadioChange('1')}>
                    <input type="radio" style={{display:'none'}} value="1" checked={selectedValue === '1'}/>
                    {selectedValue === '1' ? <AiFillStar /> : <AiOutlineStar />} 
                1 </label>
                </div>
                <div>
                <label className={`star-radio-button ${selectedValue === '2' ? 'checked' : ''}`} onClick={() => handleRadioChange('2')}>
                    <input type="radio" style={{display:'none'}} value="2" checked={selectedValue === '2'}/>
                    {selectedValue === '2' ? <AiFillStar /> : <AiOutlineStar />} 
                2 </label>
                </div>
                <div>
                <label className={`star-radio-button ${selectedValue === '3' ? 'checked' : ''}`} onClick={() => handleRadioChange('3')}>
                    <input type="radio" style={{display:'none'}} value="3" checked={selectedValue === '3'}/>
                    {selectedValue === '3' ? <AiFillStar /> : <AiOutlineStar />} 
                3 </label>
                </div>
                <div>
                <label className={`star-radio-button ${selectedValue === '4' ? 'checked' : ''}`} onClick={() => handleRadioChange('4')}>
                    <input type="radio" style={{display:'none'}} value="4" checked={selectedValue === '4'}/>
                    {selectedValue === '4' ? <AiFillStar /> : <AiOutlineStar />} 
                4 </label>
                </div>
                <div>
                <label className={`star-radio-button ${selectedValue === '5' ? 'checked' : ''}`} onClick={() => handleRadioChange('5')}>
                    <input type="radio" style={{display:'none'}} value="5" checked={selectedValue === '5'}/>
                    {selectedValue === '5' ? <AiFillStar /> : <AiOutlineStar />} 
                5 </label>
                </div>
            </div>
            <RatingCard></RatingCard>
            <RatingCard></RatingCard>
            <RatingCard></RatingCard>
        </div>

    )
}

export default RatingList;