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
import ShopCart from './screens/ShopCart';
import CheckoutPage from './screens/CheckoutPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShopCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
