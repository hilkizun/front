import React, { useState, useEffect, useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { getProduct, getAuction, likeProduct, unLikeProduct, fetchUserLikes } from '../../services/ProductService';
import AuthContext from '../../contexts/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Detail = ({ type }) => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    let response;
    if (type === 'product') {
      response = await getProduct(id);
    } else {
      response = await getAuction(id);
    }
    setItemData(response);
    setLikesCount(response.likesCount);

    if (currentUser) {
      const userLikes = await fetchUserLikes();
      if (userLikes) {
        const likedItem = userLikes.find(like => {
          if (type === 'product') {
            return like.product && like.product._id === id;
          } else {
            return like.auction && like.auction._id === id;
          }
        });
        setLiked(Boolean(likedItem));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, type, currentUser]);
  

  useEffect(() => {
    if (type === 'auction' && itemData && itemData.endDate) {
      const updateTimeLeft = () => {
        const currentTime = new Date();
        const endTime = new Date(itemData.endDate);
        const diff = endTime - currentTime;
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000);

      return () => clearInterval(interval);
    }
  }, [itemData, type]);

  const handleLikeClick = async () => {
    if (!currentUser) {
      alert('Necesitas estar logeado para hacer click. Por favor, inicia sesión.');
      return;
    }

    if (!liked) {
      await likeProduct(id, type);
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      await unLikeProduct(id, type);
      setLiked(false);
      setLikesCount(likesCount - 1);
      alert('Ya no te gusta');
    }
  };

  if (!itemData) {
    return <p>Cargando...</p>;
  }

  const images = itemData.image.map(img => ({ original: img, thumbnail: img }));

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
      {type === 'product' ? (
        <button>Buy now (${itemData.price})</button>
      ) : (
        <>
          <p>Time left: {timeLeft}</p>
          <button>Bid now (${itemData.currentPrice})</button>
        </>
      )}
    </div>
  );
};

export default Detail;
