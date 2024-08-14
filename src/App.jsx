
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from './redux/authSlice';

import './assets/styles/App.css';
import './assets/styles/FilterProducts.css';
import './assets/styles/ImageSlider.css';
import './assets/styles/ModalProduct.css';
import './assets/styles/Navbar.css';
import './assets/styles/ProductList.css';
import './assets/styles/SearchProduct.css';
import './assets/styles/SlideMenu.css';
import './assets/styles/login.css';

const App = () => {
  const dispatch = useDispatch();
  let token = useSelector((state) => state.auth.token);

  // Si el token es null, revisa el localStorage
  if (token === null) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Actualiza el estado global con el token almacenado
      dispatch(setToken(storedToken));
      token = storedToken; // Actualiza la variable token localmente
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;