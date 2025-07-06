import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Layout
import RootLayout from './layouts/RootLayout.jsx';

// Pages
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Readers } from './pages/Readers.jsx';
import { Returns } from './pages/Returns.jsx';
import { Books } from './pages/Books.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// Componente para rutas protegidas
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Rutas públicas
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      // Rutas privadas
      {
        path: '/readers',
        element: <PrivateRoute element={<Readers />} allowedRoles={['ROLE_ADMIN']} />
      },
      {
        path: '/returns',
        element: <PrivateRoute element={<Returns />} allowedRoles={['ROLE_ADMIN']} />
      },
      {
        path: '/books',
        element: <PrivateRoute element={<Books />} allowedRoles={['ROLE_ADMIN']} />
      },
    ]
  }
]);

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Bounce}
        style={{ top: '80px', right: '20px' }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
