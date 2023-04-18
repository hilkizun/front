import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Card.css';
import { daysRemaining, formattedEndDate, timeRemaining } from '../../utils/dateUtils';

const Card = ({ item, type }) => {
  const routeType = type === 'product' ? '/products' : '/auction';
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (type === 'auction') {
      const intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = timeRemaining(item.endDate);
        if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
          clearInterval(intervalId);
          setRemainingTime(null);
        } else {
          setRemainingTime({ days, hours, minutes, seconds });
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [item.endDate, type]);

  return (
    <Link to={`${routeType}/${item._id}`} className="card-link">
      <div className={`card ${type}`}>
        <img src={item.image[0]} alt={item.name} className="card-img" />
        <div className="card-info">
          <h3 className="card-title clickable">{item.name}</h3>
          <p className="card-description">{item.description.substring(0, 50)}</p>
          <div className="card-price-likes">
            <p className="card-price clickable">
              {type === 'product'
                ? `¡Cómpralo ya! ${item.price}€`
                : remainingTime
                ? `Puja actual: ${item.currentPrice}€ - ${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`
                : `Subasta finalizada - Puja final: ${item.currentPrice}€`}
            </p>
            <div className={`card-likes ${item.likesCount > 0 ? 'liked' : ''}`}>
              {item.likesCount > 0 ? <FaHeart /> : <FaRegHeart />}
              <span>{item.likesCount}</span>
            </div>
          </div>
          {type === 'auction' && (
            <p className="card-auction-end">
              {`Finaliza: ${formattedEndDate(item.endDate)}`}
            </p>
          )}
        </div>
      </div>
    </Link>

  );
};

export default Card;
