import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { getAllProducts, getAllAuctions } from '../../services/ProductService';
import './AllProducts.css'

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts.sort(() => Math.random() - 0.5));
    };

    const fetchAuctions = async () => {
      const fetchedAuctions = await getAllAuctions();
      setAuctions(fetchedAuctions.sort(() => Math.random() - 0.5));
    };

    fetchProducts();
    fetchAuctions();
  }, []);

  return (
    <div className="all-products">
      {products.map((product) => (
        <Card key={`product-${product._id}`} item={product} type="product" />
      ))}
      {auctions.map((auction) => (
        <Card key={`auction-${auction._id}`} item={auction} type="auction" />
      ))}
    </div>
  );
};

export default AllProducts;
