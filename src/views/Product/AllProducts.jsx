import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext'
import Card from '../../components/Card/Card';
import { getAllProducts, getAllAuctions } from '../../services/ProductService';
import './AllProducts.css';

const categoryEnum = [
  'amigurumis',
  'complementos',
  'jerseys',
  'camisetas',
  'gorros',
  'calcetines',
  'manoplas',
  'chales',
  'bastidores',
];

const categoryNames = {
  amigurumis: 'Amigurumis',
  complementos: 'Complementos',
  jerseys: 'Jerseys',
  camisetas: 'Camisetas',
  gorros: 'Gorros',
  calcetines: 'Calcetines',
  manoplas: 'Manoplas',
  chales: 'Chales',
  bastidores: 'Bastidores',
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showSoldItems, setShowSoldItems] = useState(false);
  const { currentUser } = useContext(AuthContext);

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

  const handleCategoryChange = (category) => {
    setFilterCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleTypeChange = (type) => {
    setFilterType((prevType) => (prevType === type ? 'all' : type));
  };

  const handleHideSoldItems = () => {
    setShowSoldItems(!showSoldItems);
  };
  
  const filteredItems = [...products, ...auctions]
    .filter((item) => !filterCategory || item.category === filterCategory)
    .filter((item) => {
      if (filterType === 'all') return true;
      if (filterType === 'product') return !item.endDate;
      if (filterType === 'auction') return !!item.endDate;
      return true;
    })
    .filter((item) => {
      if (showSoldItems) {
        return item.boughtBy || (item.isProductGenerated && item.isProductGenerated === true);
      } else {
        return !item.boughtBy && (!item.isProductGenerated || item.isProductGenerated === false);
      }
    })
    .sort(() => Math.random() - 0.5);
  
  return (
    <div className="all-products">
      <div className="filters">
        <h1>
          {currentUser
            ? `Hola, ${currentUser.firstName} ¿Qué es lo que buscas hoy?`
            : '¿Qué es lo que buscas?'}
        </h1>
        <div className="filter-type">
          <button
            onClick={() => handleTypeChange('product')}
            className={`type-button ${filterType === 'product' ? 'selected' : ''}`}
          >
            ¡Cómpralo ya!
          </button>
          <button
            onClick={() => handleTypeChange('auction')}
            className={`type-button ${filterType === 'auction' ? 'selected' : ''}`}
          >
            Subastas
          </button>
          <button
            onClick={handleHideSoldItems}
            className={`type-button ${showSoldItems ? 'selected' : ''}`}
          >
            {showSoldItems ? 'Mostrar productos en venta' : 'Mostrar vendidos'}
          </button>
        </div>
        <div className="filter-category">
          {categoryEnum.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-button ${filterCategory === category ? 'selected' : ''}`}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>
      </div>
      {filteredItems.map((item) => (
        <Card
          key={`${item.endDate ? 'auction' : 'product'}-${item._id}`}
          item={item}
          type={item.endDate ? 'auction' : 'product'}
        />
      ))}
    </div>
  );
};

export default AllProducts;