"use client"; // chỉ định rằng đây là component client

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, ListGroup } from 'react-bootstrap';
import { CartItem } from '../../../interfaces/CartItem';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get<CartItem[]>('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };

  const handleQuantityChange = async (item: CartItem, quantity: number) => {
    try {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, order_quantity: quantity } : cartItem
      );
      setCart(updatedCart);
      await axios.put(`http://localhost:8080/cart/${item.id}`, { ...item, order_quantity: quantity });
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
      await axios.delete(`http://localhost:8080/cart/${item.id}`);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.order_quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.unit_price * item.order_quantity), 0);
  };

  return (
    <div className="container mt-4">
      <h2>Giỏ hàng</h2>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between">
            <div>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>Đơn giá: ${item.unit_price}</Card.Text>
              <Form.Group className="mb-3">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.order_quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                />
              </Form.Group>
            </div>
            <div>
              <Button variant="danger" onClick={() => handleRemoveItem(item)}>Xóa</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-4 d-flex justify-content-between align-items-center">
        <div>
          <p>Số loại sản phẩm: {cart.length}</p>
          <p>Tổng tiền: ${getTotalPrice()}</p>
        </div>
        <Button variant="primary" onClick={() => alert('Chức năng mua hàng chưa được triển khai.')}>Mua hàng</Button>
      </div>
    </div>
  );
};

export default CartPage;