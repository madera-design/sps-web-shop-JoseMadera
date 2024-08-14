
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ModalProduct from './ModalProduct';
import { addItemToCart } from '../redux/addShoppingCar';
import FilterProducts from './FilterProducts';
import { toast } from 'react-toastify';

const ListProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const AddToShoppingCar = (product) => {
    dispatch(addItemToCart(product));
    toast.success('Producto agregado correctamente');
  };

  return (
    <div className='container-product'>
      <div className='filter-container'> <FilterProducts /> </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.images[0]} alt="imagen producto" />
            <h3><b>${product.price}.00 USD</b></h3>
            <p>{product.title} <a onClick={() => handleOpenModal(product)}>Mas información</a></p>
            <button className="primary-button" onClick={() => AddToShoppingCar(product)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <ModalProduct 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ListProduct;
