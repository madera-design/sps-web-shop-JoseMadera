import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../redux/addShoppingCar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';


const SlideMenu = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={`slide-menu ${show ? 'show' : ''}`}>
      <div className='slide-menu-title'>
        <h3>Carrito de Compras</h3>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <ul>
        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.images[0]} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <div className='flex'>
                  <p>{item.price} USD</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))
        ) : (
          <p>Tu carrito está vacío.</p>
        )}
      </ul>
      <div className="cart-total">
        <h3>Total: {calculateTotal()} USD</h3>
      </div>
    </div>
  );
};

export default SlideMenu;
