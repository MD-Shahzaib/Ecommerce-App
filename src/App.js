import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Components.
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
