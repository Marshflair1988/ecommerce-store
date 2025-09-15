import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ContactPage from './pages/ContactPage';
import './App.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Layout>
            <ToastContainer />
          </div>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
};

export default App;
