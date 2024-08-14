import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/authSlice';
import { setProducts } from '../redux/productsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SlideMenu from './SlideMenu';
import { getFilterCategorieProducts, getAllProducts } from '../services/Products';


const Navbar = ({ categories }) => {
  const [showSlideMenu, setShowSlideMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setToken(null));
    navigate('/login');
  };

  const filterProducts = async (id) => {
    const response = await getFilterCategorieProducts(id)
    dispatch(setProducts(response));
  };

  const allProducts = async () => {
    const response = await getAllProducts();
      dispatch(setProducts(response));
  };

  const showSlider = () => {
    setShowSlideMenu(!showSlideMenu);
  };

  return (
    <nav className="navbar">
      <img src="/img/logoeagle.png" alt="Logo" className="navbar-logo" />
      <button className="navbar-toggler" type="button" onClick={() => document.getElementById('navbar-list').classList.toggle('active')}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className="navbar-list" id="navbar-list">
        <li 
          className="navbar-item"
          onClick={() => allProducts()}
        >
          Todos
        </li>
        {categories.map((categorie) => (
          (categorie.id === 2 || categorie.id === 3 || categorie.id === 4 || categorie.id === 5) && (
            <li 
              key={categorie.id} className="navbar-item"
              onClick={() => filterProducts(categorie.id)}
            >
              {categorie.name}
            </li>
          )
        ))}
      </ul>
      <div className='navbar-list-btn'>
        <button data-testid="Salir"  aria-label="Salir" onClick={handleLogout} className="logout-button">
          Salir
        </button>
        <button  data-testid="cart-button"  aria-label="cart-button" className="primary-button-icons" onClick={showSlider}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span  className='bagde-cart'>{totalItems}</span>
        </button>
      </div>
      <SlideMenu show={showSlideMenu} onClose={showSlider} />
    </nav>
  );
};

export default Navbar;
