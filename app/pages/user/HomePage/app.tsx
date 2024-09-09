import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 790.50,
      image: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp',
    },
    {
      id: 2,
      name: 'Canon camera 20x zoom, Black color EOS 2000',
      price: 320.00,
      image: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp',
    },
    {
      id: 3,
      name: 'Xiaomi Redmi 8 Original Global Version 4GB',
      price: 120.00,
      image: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp',
    },
    {
      id: 4,
      name: 'Apple iPhone X 128GB, Black',
      price: 890.00,
      image: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp',
    },
  ];

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h3>New products</h3>
      </header>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 d-flex">
            <div className="card w-100 my-2 shadow-2-strong">
              <img 
                src={product.image} 
                className="card-img-top" 
                style={{ aspectRatio: "1 / 1" }} 
                alt={product.name} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                  <Link href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</Link>
                  <Link href="#!" className="btn btn-light border px-2 pt-2 icon-hover">
                    <i className="fas fa-heart fa-lg text-secondary px-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;