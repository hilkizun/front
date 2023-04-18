import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../stores/AccessTokenStore';

const Navbar = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Dupidu</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">  
            {isAuthLoaded && !currentUser && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link ${!isActive ? 'active': ''}`}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link ${!isActive ? 'active': ''}`}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {isAuthLoaded && currentUser && (
              <>
              <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${!isActive ? 'active': ''}`}
                to="/create"
              >
                Create
              </NavLink>
            </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>Logout</button>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
