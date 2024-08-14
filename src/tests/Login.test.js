import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { setToken } from '../redux/authSlice';
import Login from '../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Crea un store con el reducer simplificado
const store = createStore(setToken);

test('should render the login form correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  // Verifica que el encabezado se renderiza correctamente
  expect(screen.getByRole('heading', { name: /Iniciar sesión/i })).toBeInTheDocument();
  
  // Verifica que los botones y campos de entrada se renderizan correctamente
  expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Crear Cuenta/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email@mail.com/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^\*\*\*\*\*\*\*\*$/i)).toBeInTheDocument();
});

test('should toggle password visibility on button click', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  // Encuentra el botón para mostrar/ocultar la contraseña
  const togglePasswordButton = screen.getByRole('button', { name: /Toggle password visibility/i }) || screen.getByRole('button', { name: /Toggle password visibility/i });

  // Verifica que la contraseña está oculta inicialmente
  expect(screen.getByPlaceholderText(/^\*\*\*\*\*\*\*\*$/i)).toHaveAttribute('type', 'password');

  // Haz clic en el botón para mostrar la contraseña
  fireEvent.click(togglePasswordButton);

  // Verifica que la contraseña está visible
  expect(screen.getByPlaceholderText(/^\*\*\*\*\*\*\*\*$/i)).toHaveAttribute('type', 'text');
});
