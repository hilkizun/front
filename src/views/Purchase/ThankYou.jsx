import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductPurchaseById } from '../../services/ProductPurchaseService';

const ThankYou = () => {
  const { purchaseId } = useParams();
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

  return (
    <div>
      <h1>Gracias por tu compra</h1>
      <p>Producto: {purchaseData.product.name}</p>
      <p>Comprador: {purchaseData.buyer.username}</p>
      <p>Dirección: {purchaseData.location.address}</p>
      <p>Ciudad: {purchaseData.location.city}</p>
      <p>Código postal: {purchaseData.location.postalCode}</p>
      <p>Teléfono: {purchaseData.phone}</p>
    </div>
  );
};

export default ThankYou;
