import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ListProduct from '../components/ListProduct';
import SearchProduct from '../components/SearchProduct';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/productsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getProducts, getCategories } from '../services/Products';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [count, setCount] = useState(0);


    const nextProduct = async (item) => {
      let newCount;
        if(item === 'next') {
          newCount = count + 5;
        } else {
          newCount = count - 5;
        }
        setCount(newCount);
        const response = await getProducts(5, newCount);
        dispatch(setProducts(response));
    };

    const fetchProducts = async () => {
      const response = await getProducts(5, 0)
        dispatch(setProducts(response));
    };
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response)
    };
    
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar categories={categories}/>
      <SearchProduct />
      <div className="group-btnP">
        {
          count > 0 && (
            <button className="secondary-btn-text" onClick={() => nextProduct('previous')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Anterior
            </button>
          )
        }
         {
          count < 30 && (
            <button className="primary-btn-text" onClick={() => nextProduct('next')}>
              Siguiente
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )
        }
      </div>
      <ListProduct/>
      <div className="group-btnP">
        {
          count > 0 && (
            <button className="secondary-btn-text" onClick={() => nextProduct('previous')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Anterior
            </button>
          )
        }
         {
          count < 30 && (
            <button className="primary-btn-text" onClick={() => nextProduct('next')}>
              Siguiente
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
