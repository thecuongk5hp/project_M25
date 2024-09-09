// components/UserLayout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Our Website</h1>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link href="/">Trang chủ</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link href="/products">Sản phẩm</Link>
            </li>
            {/* Thêm nhiều liên kết nếu cần */}
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserLayout;