import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

// Validación con Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);

    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
      const data = await response.json();
      dispatch(setToken(data.access_token));
      localStorage.setItem('token', data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-box">
            <h3>Iniciar sesión</h3>
            <div className="input-group">
              <label htmlFor="email">Correo:</label>
              <Field
                type="email"
                name="email"
                placeholder="email@mail.com"
                className="form-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña:</label>
              <div className="password-container">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                  className="form-field"
                />
                <button
                  type="button"
                  className="toggle-password"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="w-full mb-3 primary-button" disabled={isSubmitting}>
              Iniciar sesión
            </button>
            <button
              type="button"
              className="w-full secondary-button"
              onClick={() => navigate('/signup')}
            >
              Crear Cuenta
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
