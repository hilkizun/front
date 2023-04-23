import { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { getLikedItems, getUserProducts, getUserAuctions, getWinningProducts, getUserPurchases } from '../../services/ProductService';
import Card from '../../components/Card/Card';
import '../Product/AllProducts.css';

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

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const [likedItems, setLikedItems] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userAuctions, setUserAuctions] = useState([]);
  const [wonProducts, setWonProducts] = useState([]);
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showSoldItems, setShowSoldItems] = useState(false);

  useEffect(() => {
    const fetchLikedItems = async () => {
      const fetchedLikedItems = await getLikedItems();
      setLikedItems(fetchedLikedItems);
    };

    fetchLikedItems();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserItems = async () => {
      const products = await getUserProducts();
      const auctions = await getUserAuctions();
      setUserProducts(products);
      setUserAuctions(auctions);
    };

    fetchUserItems();
  }, [currentUser]);

  useEffect(() => {
    const fetchWonProducts = async () => {
      const fetchedWonProducts = await getWinningProducts();
      setWonProducts(fetchedWonProducts);
    };

    fetchWonProducts();
  }, [currentUser]);

  useEffect(() => {
    const fetchPurchaseProducts = async () => {
      const fetchedPurchaseProducts = await getUserPurchases();
      setPurchaseProducts(fetchedPurchaseProducts);
    };

    fetchPurchaseProducts();
  }, [currentUser]);

  const handleCategoryChange = (category) => {
    setFilterCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleTypeChange = (type) => {
    setFilterType((prevType) => (prevType === type ? 'all' : type));
  };

  const handleHideSoldItems = () => {
    setShowSoldItems(!showSoldItems);
  };

  const applyFilters = (items) => {
    return items
      .filter((item) => !filterCategory || item.category === filterCategory)
      .filter((item) => {
        if (filterType === 'all') return true;
        if (filterType === 'product') return !item.endDate;
        if (filterType === 'auction') return !!item.endDate;
        if (filterType === 'liked') return filteredLikedItems.some(liked => liked._id === item._id);
        if (filterType === 'user') return filteredUserProducts.some(userProduct => userProduct._id === item._id);
        if (filterType === 'purchased') return filteredPurchaseProducts.some(purchasedProduct => purchasedProduct._id === item._id);
        return true;
      });
  };


  const filteredWonProducts = applyFilters(wonProducts);
  const filteredLikedItems = applyFilters(likedItems);
  const filteredUserProducts = applyFilters(userProducts);
  const filteredUserAuctions = applyFilters(userAuctions);
  const filteredPurchaseProducts = applyFilters(purchaseProducts);


  return (
    <div>
      <h1>
        Hola, {currentUser.firstName}
      </h1>

      <div className="filters">
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
            onClick={() => handleTypeChange('liked')}
            className={`type-button ${filterType === 'liked' ? 'selected' : ''}`}
          >
            <button
              onClick={handleHideSoldItems}
              className={`type-button ${showSoldItems ? 'selected' : ''}`}
            ></button>
            Me gusta
          </button>
          <button
            onClick={() => handleTypeChange('user')}
            className={`type-button ${filterType === 'user' ? 'selected' : ''}`}
          >
            Mis artículos
          </button>
          <button
            onClick={() => handleTypeChange('purchased')}
            className={`type-button ${filterType === 'purchased' ? 'selected' : ''}`}
          >
            Comprados
          </button>
        </div>
      </div>
      <div className="content">
        {filteredWonProducts.length > 0 && (
          <>
            <h2>¡Enhorabuena has ganado esta Subasta!</h2>
            <div className="won-items">
              {filteredWonProducts.map((product) => (
                <Card
                  key={`product-${product._id}`}
                  item={product}
                  type="product"
                />
              ))}
            </div>
          </>
        )}

        {filteredLikedItems.length > 0 && (
          <>
            <h2>Has dado like</h2>
            <div className="liked-items">
              {filteredLikedItems.map((like) => {
                const item = like.auction || like.product;
                return (
                  <Card
                    key={`${item.endDate ? 'auction' : 'product'}-${item._id}`}
                    item={item}
                    type={item.endDate ? 'auction' : 'product'}
                  />
                );
              })}
            </div>
          </>
        )}

        {(filteredUserProducts.length > 0 || filteredUserAuctions.length > 0) && (
          <>
            <h2>Estos son tus artículos</h2>
            <div className="user-items">
              {filteredUserProducts.map((product) => (
                <Card
                  key={`product-${product._id}`}
                  item={product}
                  type="product"
                />
              ))}
              {filteredUserAuctions.map((auction) => (
                <Card
                  key={`auction-${auction._id}`}
                  item={auction}
                  type="auction"
                />
              ))}
            </div>
          </>
        )}

        {filteredPurchaseProducts.length > 0 && (
          <>
            <h2>Productos comprados</h2>
            <div className="purchase-items">
              {filteredPurchaseProducts.map((product) => (
                <Card
                  key={`product-${product._id}`}
                  item={product}
                  type="product"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;