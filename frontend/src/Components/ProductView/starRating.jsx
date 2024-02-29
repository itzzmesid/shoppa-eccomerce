import { useState } from "react";
import './StarRating.css'
import {StarFilled} from '@ant-design/icons'
const StarRating = () => { //rating star creation
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(4);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => { //  rating star setup
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= ((rating && hover) || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onDoubleClick={() => {setHover(0);setRating(0);}}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star"><StarFilled /></span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating