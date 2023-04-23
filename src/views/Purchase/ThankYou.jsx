import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { getProductPurchaseById } from '../../services/ProductPurchaseService';
import AuthContext from '../../contexts/AuthContext';
import '../Product/DetailAuction.css';

const ThankYou = () => {
  const { purchaseId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    getProductPurchaseById(purchaseId)
      .then((purchase) => {
        setPurchaseData(purchase);
      })
      .catch((error) => {
        console.error('Error al obtener la información de la compra:', error);
      });
  }, [purchaseId]);

  if (!purchaseData) {
    return <p>Cargando...</p>;
  }

  const images = purchaseData.product.image.map(img => ({ original: img, thumbnail: img }));

  return (
    <div className="detail-auction">
      <div className="detail-auction__image">
        <ImageGallery items={images} />
      </div>
      <div className="detail-auction__content">
        <h1 className="detail-auction__title"> {currentUser.firstName}, gracias por tu compra</h1>
        <p>Has comprado el {purchaseData.product.category} de {purchaseData.product.name}.</p>
        <p>Recibirás el pedido en la siguiente dirección:</p>
        <div className="info-box">
          <p>Nombre: {currentUser.firstName} {currentUser.lastName}</p>
          <p>Dirección: {purchaseData.location.address}, {purchaseData.location.number} {purchaseData.location.floor}</p>
          <p>Ciudad: {purchaseData.location.city}</p>
          <p>Código postal: {purchaseData.location.postalCode}</p>
          <p>Teléfono: {purchaseData.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

