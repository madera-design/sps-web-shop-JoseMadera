import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/productsSlice';
import { getProducts, getFilterProducts } from '../services/Products';
    
    const FilterProducts = () => {
      const [minPrice, setMinPrice] = useState('');
      const [maxPrice, setMaxPrice] = useState('');
      const [showClearButton, setShowClearButton] = useState(false);
      const dispatch = useDispatch();
    
      const handleFilter = async (e) => {
        e.preventDefault();
        const response = await getFilterProducts('',minPrice,maxPrice)
          dispatch(setProducts(response));
          setShowClearButton(true);
      };
      const handleClear = async () => {
        const response = await getProducts(5,0)
            setMinPrice('');
            setMaxPrice('');
            dispatch(setProducts(response));
            setShowClearButton(false);
      };
      return (
        <div className="filter-by-price">
            <h2>Filtros</h2>
          <form onSubmit={handleFilter} className="filter-form">
            <div>
              <label>Precio Mínimo:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
            <div>
              <label>Precio Máximo:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
            <div className='butonGroup-filter'>
              {!showClearButton && (
                    <button type="submit" className="primary-button" disabled={!minPrice || !maxPrice}>
                    Filtrar
                    </button>
              )}
               
              {showClearButton && (
                  <button type="button" className="secondary-button" onClick={handleClear}>
                      Limpiar filtro
                  </button>
              )}
                
            </div>
          </form>
        </div>
      );
    };
    
    export default FilterProducts;
    