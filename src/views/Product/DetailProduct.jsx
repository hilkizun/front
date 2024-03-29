import React, { useState, useEffect, useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct, unLikeProduct, fetchUserLikes } from '../../services/ProductService';
import AuthContext from '../../contexts/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createProductPurchase } from '../../services/ProductPurchaseService';
import { useNavigate } from 'react-router-dom';
import './DetailAuction.css'

const DetailProduct = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchData = async () => {
    const response = await getProduct(id);
    setItemData(response);
    setLikesCount(response.likesCount);

    if (currentUser) {
      const userLikes = await fetchUserLikes();
      if (userLikes) {
        const likedItem = userLikes.find(like => like.product && like.product._id === id);
        setLiked(Boolean(likedItem));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, currentUser]);

  const handleLikeClick = async () => {
    if (!currentUser) {
      alert('Necesitas estar logeado para hacer click. Por favor, inicia sesión.');
      return;
    }

    if (!liked) {
      await likeProduct(id, 'product');
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      const result = window.confirm('¿Estás seguro de que ya no te gusta?');
      if (result) {
        await unLikeProduct(id, 'product');
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    }
  };

  if (!itemData) {
    return <p>Cargando...</p>;
  }

  const images = itemData.image.map(img => ({ original: img, thumbnail: img }));

  const handleProductPurchase = async () => {
    if (!currentUser) {
      alert('Necesitas estar logueado para comprar. Por favor, inicia sesión.');
      return;
    }

    const result = window.confirm(`Vas a comprar ${itemData.name} por ${itemData.price} €. Solo tienes que introducir tu dirección para completar el pedido.`);
    if (result) {
      try {
        const purchaseData = {
          productId: id,
          userId: currentUser.id,
        };

        const productPurchase = await createProductPurchase(purchaseData);
        navigate(`/purchase-address/${productPurchase._id}`);

      } catch (error) {
        alert('Ocurrió un error al realizar la compra. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="detail-auction">
      <div className="detail-auction__image">
        <ImageGallery items={images} />
      </div>
      <div className="detail-auction__content">
        <h1 className="detail-auction__title">{itemData.name}</h1>
        <p>{itemData.description}</p>
        {itemData.sellOut ? (
          <div className="info-box">
          <p><strong>Vendido por {itemData.price} €</strong></p></div>
        ) : (
          <div className="bid-container">
            <button className="bid-button" onClick={handleProductPurchase}>¡Cómpralo ya! - {itemData.price} €</button>
          </div>
        )}
        {currentUser ? (
          <div className="like-container">
            <span onClick={handleLikeClick} className={`like-button ${liked ? 'liked' : ''}`}>
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{likesCount} Likes</span>
            </span>
          </div>
        ) : (
          <div>
            <FaRegHeart />
            <span>{likesCount} Likes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduct