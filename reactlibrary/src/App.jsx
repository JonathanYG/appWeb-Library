// src/App.jsx
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/readers', element: <Readers /> },
      { path: '/returns', element: <Returns /> },
      { path: '/books', element: <Books /> },
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
