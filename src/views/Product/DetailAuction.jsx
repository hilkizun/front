import React, { useState, useEffect, useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { getAuction, likeProduct, unLikeProduct, fetchUserLikes, placeBid, getHighestBid } from '../../services/ProductService';
import AuthContext from '../../contexts/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import 'react-image-gallery/styles/css/image-gallery.css';
import { daysRemaining, formattedEndDate, timeRemaining } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

const DetailAuction = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [itemData, setItemData] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [winning, setWinning] = useState(false);
  const [outbid, setOutbid] = useState(false);

  const fetchData = async () => {
    const response = await getAuction(id);
    setItemData(response);
    setLikesCount(response.likesCount);

    if (currentUser) {
      const userLikes = await fetchUserLikes();
      if (userLikes) {
        const likedItem = userLikes.find(like => like.auction && like.auction._id === id);
        setLiked(Boolean(likedItem));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, currentUser]);
  
  useEffect(() => {
    if (itemData && itemData.endDate) {
      const intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = timeRemaining(itemData.endDate);
        if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
          clearInterval(intervalId);
          setRemainingTime(null);
        } else {
          setRemainingTime({ days, hours, minutes, seconds });
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [itemData]);
  
  useEffect(() => {
    fetchHighestBid();
  }, [id, currentUser]);
  
  const fetchHighestBid = async () => {
    const response = await getHighestBid(id);
    setHighestBid(response);
    if (itemData && currentUser && response.bidder && currentUser.id === response.bidder) {
      setWinning(true);
      setOutbid(false);
    } else if (itemData && currentUser && itemData.bids.some(bid => bid.bidder === currentUser.id)) {
      setWinning(false);
      setOutbid(true);
    } else {
      setWinning(false);
      setOutbid(false);
    }
  };
  const handleLikeClick = async () => {
    if (!currentUser) {
      alert('Necesitas estar logeado para hacer click. Por favor, inicia sesión.');
      return;
    }

    if (!liked) {
      await likeProduct(id, 'auction');
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      const result = window.confirm('¿Estás seguro de que ya no te gusta?');
      if (result) {
        await unLikeProduct(id, 'auction');
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    }    
  };

  if (!itemData) {
    return <p>Cargando...</p>;
  }

  const images = itemData.image.map(img => ({ original: img, thumbnail: img }));

  const handlePlaceBidClick = async () => {
    const bidAmount = parseFloat(prompt('Introduce el importe de tu puja:'));
    if (bidAmount && bidAmount > itemData.currentPrice) {
      try {
        await placeBid(id, bidAmount);
        fetchData();
        fetchHighestBid();
      } catch (error) {
        alert('Error al realizar la puja. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('La puja debe ser mayor que el precio actual.');
    }
  };

  return (
    <div>
      <h1>{itemData.name}</h1>
      <p>{itemData.description}</p>
      <ImageGallery items={images} />
      {
        currentUser ? (
          <button onClick={handleLikeClick} className={`like-button ${liked ? 'liked' : ''}`}>
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
        ) : (
          <div>
            <FaRegHeart />
            <span>{likesCount}</span>
          </div>
        )
      }
      {remainingTime ? (
        <>
          <p>Quedan: {remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s</p>
          <p>Finaliza: {formattedEndDate(itemData.endDate)}</p>
          <button onClick={handlePlaceBidClick}>Puja actual (${itemData.currentPrice})</button>
          {winning && <p>Estás ganando</p>}
          {outbid && <p>Te han superado la puja</p>}
        </>
      ) : (
        <p>Subasta finalizada - Precio Final: {itemData.currentPrice}€</p>
      )}
    </div>
  );
};

export default DetailAuction;
