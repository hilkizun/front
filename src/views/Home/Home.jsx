import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';

const Home = () => {
  const productImages1 = [
    'https://res.cloudinary.com/dwks54qjm/image/upload/v1682271330/dupidu/products/jknw3zs9xqw1qlqqqxya.png',
    'https://res.cloudinary.com/dwks54qjm/image/upload/v1682271931/dupidu/products/cyx7clgdjfe6z6y4fs8s.png',
  ];

  const productImages2 = [
    'https://res.cloudinary.com/dwks54qjm/image/upload/v1682270320/dupidu/products/w7z7cwgym9cosv1dkzam.png',
    'https://res.cloudinary.com/dwks54qjm/image/upload/v1682271078/dupidu/products/jz1vn49dkeviyqr9stbs.png',
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a <span style="font-size: 120%; color: #a642af;">dupidú</span></h1>
          <p>Compra y vende artículos hechos a mano en nuestra increíble tienda.</p>
          <Link to="/products" className="hero-btn">
            Descubre productos
          </Link>
        </div>
      </section>

      <section className="products">
        <div className="gallery-container">
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={3000}>
            {productImages1.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Producto ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="gallery-container">
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={3000}>
            {productImages2.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Producto ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="signup">
        <div className="signup-content">
          <h2>¡Vende tus productos de forma sencilla!</h2>
          <p>Únete a nuestra comunidad y consigue ingresos a través de tus productos handmade.</p>
          <Link to="/signup" className="signup-btn">
            Únete ahora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
