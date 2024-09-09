"use client"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/app';
import RegisterPage from './pages/register/app';
import Home from './pages/user/Home/app';
import HomePage from './pages/user/HomePage/app';
import HomeAdmin from './pages/admin/Home/app';
import Customer from './pages/admin/customer/app';
import CategoriesPage from './pages/admin/categories/app';
import Products from './pages/admin/product/app';
import ProductList from './pages/user/product/productList/app';
import ProductDetail from './pages/user/product/productDetail/app';
import Cart from './pages/user/cart/app';
import { AuthProvider, useAuth } from './context/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<HomeAdmin />}>
          <Route path="/admin/customers" element={<Customer />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/products" element={<Products />} />
        </Route>
      </Routes>

    </AuthProvider>
  );
}

export default App;