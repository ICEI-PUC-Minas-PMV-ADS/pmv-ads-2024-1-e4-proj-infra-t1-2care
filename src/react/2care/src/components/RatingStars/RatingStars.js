import './RatingStars.css'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const RatingStars = (props) => {
  const [rating, setRating] = useState(0)


  return (
    <div className='ratingStars'>
      <Rating initialValue={props.stars} allowFraction readonly />
    </div>
  )
}

export default RatingStars;