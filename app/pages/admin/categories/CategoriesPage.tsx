import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../../../interfaces/CategoriesInterface'; 
import CategoryForm from './CategoryForm'; 
import { Product } from '../../../interfaces/ProductsInterface'; 
import { Button } from 'react-bootstrap';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State để lưu danh sách sản phẩm của danh mục

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:8080/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:8080/categories/${categoryId}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      // Handle error fetching products
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    // Fetch products when editing category
    fetchProductsByCategory(category.id);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${categoryId}`);
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error deleting category
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Categories</h2>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-info me-2" onClick={() => handleEditCategory(category)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryForm
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        fetchCategories={fetchCategories}
      />

      {/* Hiển thị danh sách sản phẩm của danh mục */}
      {editingCategory && (
        <>
          <h3 className="mt-4 mb-3">Products in Category: {editingCategory.name}</h3>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.product_name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">{product.description}</p>
                    <Button variant="primary">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesPage;