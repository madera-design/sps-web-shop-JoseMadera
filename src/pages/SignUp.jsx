import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Esquema de validación de Formik utilizando Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'El nombre solo debe contener letras')
      .required('Nombre es requerido'),
    
    email: Yup.string()
      .email('Correo inválido')
      .required('Correo es requerido'),
    
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es requerida'),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    setError(null);
    setIsloading(true)
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error('Errror al crear el usuario');
        throw new Error('Invalid credentials');
      }
      // const data = await response.json();
      toast.success('Usuario creado correctamente');
      setTimeout(()=>{
        navigate('/login');
      },1000)
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setIsloading(false)
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{ 
          name: '', 
          email: '', 
          password: '', 
          avatar:"https://api.lorem.space/image/face?w=640&h=480&r=867",
          role: "customer" 
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="login-box">
            <h3>Crea Una Cuenta</h3>
            <div className="input-group">
              <label>Nombre:</label>
              <Field type="text" name="name" placeholder="Juan Perez" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label>Correo:</label>
              <Field type="email" name="email" placeholder="email@mail.com" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label>Contraseña:</label>
              <div className="password-container">
                <Field type={showPassword ? 'text' : 'password'} name="password" placeholder="********" />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button 
              type="submit" 
              className="w-full mb-3 primary-button" 
              disabled={Isloading || isSubmitting || !isValid}
            >
              {
                Isloading ? 'Cargando...' : 'Crear Cuenta'
              }
            </button>
            <p><b>¿Tienes cuenta?</b></p>
            <button
              type="button"
              className="w-full secondary-button"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
