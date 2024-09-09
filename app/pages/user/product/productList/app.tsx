'use client'; // Chỉ định đây là một component client

import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Product } from '../../../../interfaces/ProductsInterface';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './ProductList.module.css'; // Import custom CSS as module

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Set categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    setCategories(uniqueCategories);
  }, [products]);

  const filterProductsByCategory = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <div className="container my-4">
      {/* Filter products by category */}
      <div className="mb-4">
        <h5>Filter by Category:</h5>
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => filterProductsByCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`btn btn-outline-primary ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => filterProductsByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.unit_price}</Card.Text>
                <Link href={`/products/${product.id}`} passHref>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hàm server-side để lấy dữ liệu sản phẩm
export const getServerSideProps = async () => {
  try {
    const response = await axios.get<Product[]>('http://localhost:8080/products');
    const products = response.data;

    return {
      props: {
        products
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
};

export default ProductList;