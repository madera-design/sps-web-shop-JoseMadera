# Carrito de Compra en React

## Introducción

Este proyecto es una aplicación web de carrito de compras desarrollada en React. La aplicación permite a los usuarios autenticarse, registrarse, navegar por una lista de productos, ver detalles de productos individuales y gestionar su carrito de compras. Utiliza la API de Platzi Fake Store para obtener los productos y la API de EscuelaJS para manejar la autenticación de usuarios.

## Vistas del Proyecto

### Login

- **Descripción**: Vista para que los usuarios se autentiquen en la aplicación.
- **Funcionalidades**:
  - **Autenticación**: Se realiza mediante una solicitud POST a la API de EscuelaJS.
  - **Campos**:
    - **email**: Correo electrónico del usuario.
    - **password**: Contraseña del usuario.
  - **Manejo de Errores**: Mensajes de error en caso de credenciales incorrectas.

### Signup

- **Descripción**: Vista para que los nuevos usuarios se registren en la aplicación.
- **Funcionalidades**:
  - **Creación de Usuario**: Se realiza mediante una solicitud POST a la API de EscuelaJS.
  - **Campos**:
    - **name**: Nombre del usuario.
    - **lastName**: Apellido del usuario.
    - **email**: Correo electrónico del usuario.
    - **password**: Contraseña del usuario.
  - **Validaciones**: Verifica que todos los campos estén completos y que la contraseña cumpla con los requisitos mínimos.
  - **Manejo de Errores**: Mensajes de error en caso de campos faltantes o problemas con la creación del usuario.

### Dashboard

- **Descripción**: Vista principal después de que el usuario se autentique.
- **Componentes**:
  - **Navbar**: Barra de navegación con enlaces a diferentes secciones de la aplicación y opciones de usuario como el cierre de sesión.
  - **Lista de Productos**: Muestra todos los productos disponibles.
    - **Consumo de Servicio**: La lista de productos se obtiene a través de la API de Platzi Fake Store.
  - **Detalle del Producto**: Permite ver información detallada sobre un producto seleccionado.
  - **Ver Carrito**: Muestra el contenido del carrito de compras del usuario.

## Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **Redux**: Gestión del estado global de la aplicación, incluyendo el carrito de compras y el estado de autenticación.
- **React Router**: Manejo de la navegación entre diferentes vistas de la aplicación.
- **Formik y Yup**: Para la gestión de formularios y validaciones.
- **Axios**: Para realizar solicitudes HTTP a las APIs.

## API Endpoints

### API de EscuelaJS

- **Login**
  - **Descripción**: Autentica al usuario.
  - **Requiere**: email, password.

- **Signup**
  - **Descripción**: Crea un nuevo usuario.
  - **Requiere**: name, lastName, email, password.

### API de Platzi Fake Store

- **Productos**
  - **Descripción**: Obtiene una lista de productos disponibles.
  - **Respuesta**: Array de objetos producto con detalles como nombre, precio, descripción y URL de la imagen.

## Estructura del Proyecto

- **src/**
  - **components/**: Componentes reutilizables como Navbar, ProductCard, etc.
  - **pages/**: Vistas principales como Login, Signup, Dashboard.
  - **redux/**: Configuración de Redux y acciones/reductores para el estado de autenticación y carrito de compras.
  - **services/**: Servicios para la interacción con APIs.
  - **styles/**: Archivos de estilo globales y específicos de componentes.
  - **App.js**: Archivo principal de configuración de rutas y componentes.

## Configuración

1. **Instalación de Dependencias**:
   npm install

2. **Ejecución del proyecto**:
   npm run dev


## Actualmente, están disponibles dos plugins oficiales:
Este template proporciona una configuración mínima para hacer funcionar React en Vite con HMR (Hot Module Replacement) y algunas reglas de ESLint.

- @vitejs/plugin-react: Utiliza Babel para Fast Refresh.
- @vitejs/plugin-react-swc: Utiliza SWC para Fast Refresh.
