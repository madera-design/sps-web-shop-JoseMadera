import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { setProducts } from '../redux/productsSlice';
import { toast } from 'react-toastify';
import { getProducts, getFilterProducts } from '../services/Products';


const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
      const response = await getFilterProducts(searchTerm, 0, 0)
      if(response.length === 0){
        toast.error('Producto no encontrado');
        return
      }
      dispatch(setProducts(response));
      setShowClearButton(true);
  };

  const handleClear = async () => {
    const response = await getProducts(5,0)
    setSearchTerm('');
    dispatch(setProducts(response));
    setShowClearButton(false);
    
  };

  return (
    <div className="search-product">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {!showClearButton && (
          <button type="submit" className="primary-button" disabled={!searchTerm}>
            Buscar
          </button>
        )}
        
        {showClearButton && (
          <button type="button" className="secondary-button ml-3" onClick={handleClear}>
            Limpiar
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchProduct;
