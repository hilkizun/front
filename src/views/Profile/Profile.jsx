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
  const [filterWonProducts, setFilterWonProducts] = useState(false);
const [filterLikedItems, setFilterLikedItems] = useState(false);
const [filterUserItems, setFilterUserItems] = useState(false);
const [filterPurchaseProducts, setFilterPurchaseProducts] = useState(false);



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
  
  const handleFilterWonProducts = () => {
    setFilterWonProducts((prev) => !prev);
  };
  
  const handleFilterLikedItems = () => {
    setFilterLikedItems((prev) => !prev);
  };
  
  const handleFilterUserItems = () => {
    setFilterUserItems((prev) => !prev);
  };
  
  const handleFilterPurchaseProducts = () => {
    setFilterPurchaseProducts((prev) => !prev);
  };
  

  const applyFilters = (items, filterName) => {
    return items
      .filter((item) => !filterCategory || item.category === filterCategory)
      .filter((item) => {
        if (filterName === 'wonProducts') return filterWonProducts || !filterLikedItems && !filterUserItems && !filterPurchaseProducts;
        if (filterName === 'likedItems') return filterLikedItems || !filterWonProducts && !filterUserItems && !filterPurchaseProducts;
        if (filterName === 'userItems') return filterUserItems || !filterWonProducts && !filterLikedItems && !filterPurchaseProducts;
        if (filterName === 'purchaseProducts') return filterPurchaseProducts || !filterWonProducts && !filterLikedItems && !filterUserItems;
        return true;
      })
      .filter((item) => {
        if (showSoldItems) {
          return item.boughtBy || (item.isProductGenerated && item.isProductGenerated === true);
        } else {
          return !item.boughtBy && (!item.isProductGenerated || item.isProductGenerated === false);
        }
      });
  };
  

  const filteredWonProducts = applyFilters(wonProducts, 'wonProducts');
  const filteredLikedItems = applyFilters(likedItems, 'likedItems');
  const filteredUserProducts = applyFilters(userProducts, 'userItems');
  const filteredUserAuctions = applyFilters(userAuctions, 'userItems');
  const filteredPurchaseProducts = applyFilters(purchaseProducts, 'purchaseProducts');
  


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
      <div className="content">
      {filteredWonProducts.length > 0 && (
        <>
          <h2>¡Enhorabuena has ganado esta Subasta!</h2>
  <button
    onClick={handleFilterWonProducts}
    className={`category-type ${filterWonProducts ? 'selected' : ''}`}
  >
    Filtrar
  </button>
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
  <button
    onClick={handleFilterLikedItems}
    className={`category-type ${filterLikedItems ? 'selected' : ''}`}
  >
    Filtrar
  </button>
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
  <button
    onClick={handleFilterUserItems}
    className={`category-button ${filterUserItems ? 'selected' : ''}`}
  >
    Filtrar
  </button>
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
  <button
    onClick={handleFilterPurchaseProducts}
    className={`category-button ${filterPurchaseProducts ? 'selected' : ''}`}
  >
    Filtrar
  </button>
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