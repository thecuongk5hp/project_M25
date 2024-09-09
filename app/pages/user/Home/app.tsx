import type { AppProps } from 'next/app';
import HeaderUser from '../headerUser/app'; // Đảm bảo đường dẫn đúng
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <HeaderUser />
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container justify-content-center justify-content-md-between">
          <button 
            className="navbar-toggler border py-2 text-dark" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarLeftAlignExample" 
            aria-controls="navbarLeftAlignExample" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link text-dark" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link text-dark">Products</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 112px)' }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;