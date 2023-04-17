import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { FaHeart } from 'react-icons/fa';
import 'react-image-gallery/styles/css/image-gallery.css';


import { getProduct, likeProduct, unLikeProduct } from '../../services/ProductService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getProduct(id).then((product) => {
      setProduct(product);
      setLiked(product.likesCount); // Set initial state of like
    });
  }, [id]);

  const handleLike = useCallback(() => {
    if (liked) {
      unLikeProduct(id).then(() => {
        setLiked(false);
        setProduct({ ...product, likesCount: product.likesCount - 1 });
      });
    } else {
      likeProduct(id).then(() => {
        setLiked(true);
        setProduct({ ...product, likesCount: product.likesCount + 1 });
      });
    }
  }, [id, liked, product]);

  const images = [];

  product?.image?.forEach((image) => {
    images.push({
      original: image,
      thumbnail: image,
    });
  });

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ImageGallery items={images} showPlayButton={false} />
      <div onClick={handleLike}>
        {liked ? (
          <FaHeart style={{ color: 'red' }} />
        ) : (
          <FaHeart style={{ color: 'gray' }} />
        )}
        {product.likesCount}
      </div>
      <button>Comprar por {product.price}€</button>
    </div>
  );
};

export default ProductDetail;
