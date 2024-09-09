// app/admin/HomeAdmin.tsx
"use client";

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import HeaderAdmin from '../Header/app'; // Đảm bảo đường dẫn chính xác
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faChartArea, faLock, faUsers, faList, faQuestionCircle, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface HomeAdminProps {
  children: ReactNode; // Type for children
}

const HomeAdmin: React.FC<HomeAdminProps> = ({ children }) => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem('userToken');
    router.push('/');
  };

  return (
    <>
      <HeaderAdmin />
      <div className="d-flex" style={{ marginTop: '60px' }}>
        <nav className="d-lg-block bg-white sidebar" style={{ width: '250px', height: 'calc(100vh - 60px)', position: 'fixed', zIndex: 1000 }}>
          <ul className="list-group list-group-flush mx-3 mt-4">
            <li className="list-group-item border-0 border-bottom rounded">
              <a href="/admin" className="nav-link">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-3" />
                Dashboard
              </a>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <a href="/admin/products" className="nav-link">
                <FontAwesomeIcon icon={faChartArea} className="me-3" />
                Products
              </a>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <a href="/admin/orders" className="nav-link">
                <FontAwesomeIcon icon={faLock} className="me-3" />
                Orders
              </a>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <a href="/admin/customers" className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="me-3" />
                Customers
              </a>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <a href="/admin/categories" className="nav-link">
                <FontAwesomeIcon icon={faList} className="me-3" />
                Categories
              </a>
            </li>
          </ul>
          <ul className="list-group list-group-flush mx-3 mt-4" style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
            <li className="list-group-item border-0 rounded">
              <a href="/admin/help" className="nav-link">
                <FontAwesomeIcon icon={faQuestionCircle} className="me-3" />
                Help
              </a>
            </li>
            <li className="list-group-item border-0 rounded">
              <a href="/admin/contact-us" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                Contact Us
              </a>
            </li>
            <li className="list-group-item border-0 rounded" onClick={onLogout}>
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <div className="content p-4" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
          {children} {/* Render child routes here */}
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;