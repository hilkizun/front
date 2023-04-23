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
  }, [item.endDate]);

  return (
    <Link to={`${routeType}/${item._id}`} className="card-link">
      <div className={`card ${type}`}>
        <img src={item.image[0]} alt={item.name} className="card-img" />
        <div className="card-info">
          <h3 className="card-title clickable">{item.name}</h3>
          <p className="card-description">{item.description.substring(0, 80)}...</p>
          <div className="card-price-likes">
          <p className="card-price clickable">
            {type === 'product'
              ? (item.sellOut
                  ? `Vendido por ${item.price}€`
                  : `¡Cómpralo ya! ${item.price}€`)
              : remainingTime
              ? (
                <span>
                  Puja actual: {item.currentPrice}€<br />
                  Pujas realizadas: {item.bids.length}<br />
                  Faltan: {remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
                </span>
                    )
              : `Subasta finalizada - Precio final: ${item.currentPrice}€`}
          </p>
            <div className={`card-likes ${item.likesCount > 0 ? 'liked' : ''}`}>
              {item.likesCount > 0 ? <FaHeart /> : <FaRegHeart />}
              <span>{item.likesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;