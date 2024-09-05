import React from 'react';

const HeaderAdmin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100" style={{ position: 'fixed', top: 0, zIndex: 1000 }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp" height="30" alt="" loading="lazy" />
        </a>

        <div className="collapse navbar-collapse">
          <div className="navbar-nav d-flex align-items-center">
            <input className="form-control" type="text" placeholder="Search (ctrl + '/' to focus)" />
            <i className="fa fa-search mx-2"></i>
          </div>
        </div>

        <ul className="navbar-nav ml-auto d-flex flex-row align-items-center">
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#">
              <i className="fa fa-bell"></i>
              <span className="badge bg-danger rounded-pill">1</span>
            </a>
          </li>
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#">
              <i className="fa fa-fill-drip"></i>
            </a>
          </li>
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#">
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li className="nav-item dropdown me-3 me-lg-0">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" className="rounded-circle" height="22" alt="" loading="lazy" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">My profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderAdmin;