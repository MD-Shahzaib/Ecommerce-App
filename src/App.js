import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
// Components.
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Confirmation from './components/Confirmation';
import Page404 from './components/Page404';
// Screens.
import ProductListing from './screens/ProductListing';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Orders from './screens/Orders';
import OrderDetail from './screens/OrderDetail';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

// Protected-Route.
function ProtectedRoute({ user, route, navigateTo }) {
  return user ? route : <Navigate to={navigateTo} replace={true} />
};

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute user={user} route={<ProductListing />} navigateTo='/login' />
        } />
        <Route path="/:id" element={
          <ProtectedRoute user={user} route={<ProductDetails />} navigateTo='/login' />
        } />
        <Route path="/cart" element={
          <ProtectedRoute user={user} route={<Cart />} navigateTo='/login' />
        } />
        <Route path="/checkout" element={
          <ProtectedRoute user={user} route={<Checkout />} navigateTo='/login' />
        } />
        <Route path="/confirmation" element={
          <ProtectedRoute user={user} route={<Confirmation />} navigateTo='/login' />
        } />
        <Route path="/orders" element={
          <ProtectedRoute user={user} route={<Orders />} navigateTo='/login' />
        } />
        <Route path="/order/:id" element={
          <ProtectedRoute user={user} route={<OrderDetail />} navigateTo='/login' />
        } />
        <Route path="/profile" element={
          <ProtectedRoute user={user} route={<Profile />} navigateTo='/login' />
        } />
        <Route path="/login" element={
          <ProtectedRoute user={!user} route={<Login />} navigateTo='/' />
        } />
        <Route path="/register" element={
          <ProtectedRoute user={!user} route={<Register />} navigateTo='/' />
        } />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;