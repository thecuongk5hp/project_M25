"use client"; // chỉ định rằng đây là component client

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { User } from '../../../interfaces/UserInterface'; // Kiểm tra đường dẫn

const HeaderUser: React.FC = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="p-3 text-center bg-white border-bottom">
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-2 col-sm-4 col-4">
            <Link href="/" className="float-start">
              <p className="h-35px">DO AN VAT</p>
            </Link>
          </div>
          <div className="order-lg-last col-lg-5 col-sm-8 col-8">
            <div className="d-flex float-end">
              {user ? (
                <div className="dropdown me-1">
                  <button
                    className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar || '/default-avatar.png'} // Placeholder for user avatar
                      alt={user.username}
                      className="rounded-circle"
                      style={{ width: '30px', height: '30px' }}
                    />
                    <p className="d-none d-md-block mb-0 ms-2">{user.username}</p>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {user.role === 'admin' && (
                      <li>
                        <Link href="/admin" className="dropdown-item">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/login" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                  <i className="fas fa-user-alt m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Sign in</p>
                </Link>
              )}
              <a href="#" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                <i className="fas fa-heart m-1 me-md-2"></i>
                <p className="d-none d-md-block mb-0">Wishlist</p>
              </a>
              <Link href="/cart" className="border rounded py-1 px-3 nav-link d-flex align-items-center">
                <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                <p className="d-none d-md-block mb-0">My cart</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-12">
            <div className="input-group">
              <input type="search" id="form1" className="form-control" placeholder="Search" />
              <button type="button" className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;