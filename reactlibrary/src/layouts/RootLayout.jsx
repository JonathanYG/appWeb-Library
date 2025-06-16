import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { Toaster } from 'react-hot-toast';

export default function RootLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="content-container">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
