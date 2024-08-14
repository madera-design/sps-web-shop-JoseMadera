import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../pages/SignUp'; // Ajusta la ruta según tu estructura
import { createStore } from 'redux';
import { setToken } from '../redux/authSlice';
const store = createStore(setToken);

describe('Signup Component', () => {
  test('should render the signup form correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Crea Una Cuenta/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@mail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Cuenta/i })).toBeInTheDocument();
  });

  test('should validate the form fields', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Correo es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  test('should make an API call when the form is submitted', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Juan Perez'), {
        target: { value: 'Juan Perez' },
      });
      fireEvent.change(screen.getByPlaceholderText('email@mail.com'), {
        target: { value: 'juanperez@mail.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'password123' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users', expect.any(Object));
    });

    global.fetch.mockRestore();
  });
});
