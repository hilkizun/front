import { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { getLikedItems, getUserProducts, getUserAuctions } from '../../services/ProductService';
import Card from '../../components/Card/Card';

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const [likedItems, setLikedItems] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userAuctions, setUserAuctions] = useState([]);

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

  return (
    <div>
      <h1>
        Hola, {currentUser.firstName}
      </h1>
      <h2>Has dado like</h2>
      <div className="liked-items">
        {likedItems.map((like) => {
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
      <h2>Estos son tus artículos</h2>
      <div className="user-items">
        {userProducts.map((product) => (
          <Card
            key={`product-${product._id}`}
            item={product}
            type="product"
          />
        ))}
        {userAuctions.map((auction) => (
          <Card
            key={`auction-${auction._id}`}
            item={auction}
            type="auction"
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;