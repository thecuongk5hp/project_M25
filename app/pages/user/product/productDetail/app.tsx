"use client";

import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Product } from '../../../../interfaces/ProductsInterface';
import { CartItem } from '../../../../interfaces/CartItem';
import { useAuth } from '../../../../context/app';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

interface ProductDetailProps {
  product: Product | null;
  cart: CartItem[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, cart }) => {
  const { user } = useAuth();
  const [updatedCart, setUpdatedCart] = useState<CartItem[]>(cart);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const addToCart = async () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    if (product) {
      try {
        const updatedCartItems = [...updatedCart];
        const existingItem = updatedCartItems.find(item => item.product_id === product.id);

        if (existingItem) {
          if (existingItem.order_quantity < product.stock_quantity) { // Kiểm tra hàng tồn kho
            existingItem.order_quantity += 1;
            await axios.put(`/api/cart/${existingItem.id}`, existingItem);
          } else {
            alert('Không thể thêm sản phẩm, đã hết hàng!');
            return;
          }
        } else {
          const newCartItem: CartItem = {
            id: Math.floor(Math.random() * 1000),
            product_id: product.id,
            name: product.product_name,
            unit_price: product.unit_price,
            order_quantity: 1,
          };
          updatedCartItems.push(newCartItem);
          await axios.post('/api/cart', newCartItem);
        }

        setUpdatedCart(updatedCartItems);
        setShowSuccessAlert(true);
      } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
      }
    }
  };

  if (!product) {
    return <div>Đang tải...</div>; // Có thể thay thế bằng một spinner
  }

  return (
    <div className="container my-4">
      {showLoginAlert && (
        <Alert variant="danger" onClose={() => setShowLoginAlert(false)} dismissible>
          Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. <Link href="/login">Đăng nhập</Link>
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Sản phẩm đã được thêm vào giỏ hàng thành công!
        </Alert>
      )}
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.product_name} className="product-image" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h3>{product.product_name}</h3>
            <p className="product-description">{product.description}</p>
            <p>Giá: ${product.unit_price}</p>
            <p>Kho: {product.stock_quantity}</p>
          </div>
          <Button variant="primary" onClick={addToCart}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

// Hàm để lấy dữ liệu sản phẩm và giỏ hàng từ server
export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;

  try {
    const [productResponse, cartResponse] = await Promise.all([
      axios.get<Product>(`http://localhost:8080/products/${id}`),
      axios.get<CartItem[]>('http://localhost:8080/cart')
    ]);

    return {
      props: {
        product: productResponse.data,
        cart: cartResponse.data
      }
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return {
      props: {
        product: null,
        cart: []
      }
    };
  }
}

export default ProductDetail;