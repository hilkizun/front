import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-secondary text-center">
      <a href="https://www.instagram.com/dupidu_handmade/" target="_blank" rel="noopener noreferrer">
        <img src="/footer.png" alt="Dupidu Instagram" className="footer-logo" />
      </a>
    </footer>
  );
};

export default Footer;
