/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux';
import ImageSlider from './ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { addItemToCart } from '../redux/addShoppingCar';
import { toast } from 'react-toastify';


const ModalProduct = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const AddToShoppingCar = (product) => {
    dispatch(addItemToCart(product));
    onClose()
    toast.success('Producto agregado correctamente');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
        </button>
        <ImageSlider images={product.images} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3><b>${product.price}.00</b></h3>
        <button className="btn-add-cart"  onClick={() => AddToShoppingCar(product)}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ModalProduct;