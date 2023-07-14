import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Components.
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Screens.
import ProductListing from './screens/ProductListing';
import ProductDetails from './screens/ProductDetails';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
