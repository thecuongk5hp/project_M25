import { useState, useEffect, ChangeEvent } from 'react';
import { Product } from '../../interfaces/ProductsInterface';
import { Button, Form, Table, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { storage, ref, uploadBytes, getDownloadURL } from '../../config/firebase';

const Products = ({ initialProducts, initialCategories }: { initialProducts: Product[], initialCategories: { name: string, description: string, status: string, id: number }[] }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 0,
    product_name: '',
    description: '',
    unit_price: 0,
    stock_quantity: 0,
    image: '',
    category: '',
    created_at: '',
    updated_at: ''
  });
  const [categories, setCategories] = useState(initialCategories);

  // Không cần dùng useEffect cho fetchProducts và fetchCategories vì Next.js đã xử lý phía server

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setCurrentProduct({ ...currentProduct, image: url });
        });
      });
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
    setCurrentProduct({
      id: 0,
      product_name: '',
      description: '',
      unit_price: 0,
      stock_quantity: 0,
      image: '',
      category: '',
      created_at: '',
      updated_at: ''
    });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await axios.post<Product>('http://localhost:8080/products', currentProduct);
      setProducts([...products, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditClick = (product: Product) => {
    setShowForm(true);
    setCurrentProduct(product);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put<Product>(`http://localhost:8080/products/${currentProduct.id}`, currentProduct);
      const updatedProducts = products.map((prod) =>
        prod.id === response.data.id ? response.data : prod
      );
      setProducts(updatedProducts);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      const updatedProducts = products.filter((prod) => prod.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Quản lý sản phẩm</h1>
      <Button onClick={handleAddClick} variant="primary" className="mb-4">
        Thêm sản phẩm
      </Button>

      {showForm && (
        <Card className="mb-4">
          <Card.Header>{currentProduct.id === 0 ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="product_name"
                  value={currentProduct.product_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name="unit_price"
                  value={currentProduct.unit_price}
                  onChange={handleInputChange}
                  placeholder="Nhập giá"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="stock_quantity"
                  value={currentProduct.stock_quantity}
                  onChange={handleInputChange}
                  placeholder="Nhập số lượng"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
                {currentProduct.image && (
                  <img src={currentProduct.image} alt="Product" className="img-thumbnail mt-2" style={{ maxWidth: '200px' }} />
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="success" onClick={currentProduct.id === 0 ? handleSaveProduct : handleUpdateProduct}>
                {currentProduct.id === 0 ? 'Lưu sản phẩm' : 'Cập nhật sản phẩm'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? 'bg-light' : ''}>
              <td>{product.id}</td>
              <td>{product.product_name}</td>
              <td>{product.description}</td>
              <td>{product.unit_price}</td>
              <td>{product.stock_quantity}</td>
              <td>
                {product.image && (
                  <img src={product.image} alt="Product" className="img-thumbnail" style={{ maxWidth: '100px' }} />
                )}
              </td>
              <td>{product.category}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEditClick(product)}>
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

// Sử dụng getServerSideProps để lấy dữ liệu từ phía server
export async function getServerSideProps() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      axios.get<Product[]>('http://localhost:8080/products'),
      axios.get<{ name: string, description: string, status: string, id: number }[]>('http://localhost:8080/categories')
    ]);
    return {
      props: {
        initialProducts: productsResponse.data,
        initialCategories: categoriesResponse.data
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialProducts: [],
        initialCategories: []
      }
    };
  }
}

export default Products;
