import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Category } from '../../../interfaces/CategoriesInterface'; 

interface Props {
  editingCategory: Category | null;
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  fetchCategories: () => void;
}

const CategoryForm: React.FC<Props> = ({ editingCategory, setEditingCategory, fetchCategories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true, // Default status active
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        status: editingCategory.status,
      });
    }
  }, [editingCategory]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        // Update existing category
        await axios.put(`http://localhost:8080/categories/${editingCategory.id}`, formData);
      } else {
        // Create new category
        await axios.post('http://localhost:8080/categories', formData);
      }
      fetchCategories(); // Reload categories after update or create
      setEditingCategory(null); // Clear editing state
      setFormData({
        name: '',
        description: '',
        status: true,
      });
    } catch (error) {
      console.error('Error saving category:', error);
      // Handle error saving category
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h4>{editingCategory ? 'Edit Category' : 'Add Category'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status" name="status" value={formData.status.toString()} onChange={handleChange} required>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary me-2">{editingCategory ? 'Save Changes' : 'Add Category'}</button>
          {editingCategory && (
            <button type="button" className="btn btn-secondary" onClick={() => setEditingCategory(null)}>Cancel</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;