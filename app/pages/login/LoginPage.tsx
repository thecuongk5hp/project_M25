import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../interfaces/UserInterface';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrorMessages(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessages({ ...errorMessages, general: 'Please fill in all required fields.' });
      return;
    }

    try {
      const response = await axios.get<User[]>(`http://localhost:8080/users?email=${formData.email}&password=${formData.password}`);
      if (response.data.length === 0) {
        setErrorMessages({ ...errorMessages, general: 'Invalid email or password. Please try again.' });
        return;
      }

      const user = response.data[0];

      if (user.role === 'admin' && user.status === 'active') {
        navigate('/admin');
      } else if (user.role === 'user' && user.status === 'active') {
        navigate('/');
      } else {
        setErrorMessages({ ...errorMessages, general: 'Your account is inactive. Please contact support.' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to log in. Please check your credentials.' });
    }
  };

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <p>Sign in with:</p>
          <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <p className="text-center mt-3">or:</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
        </div>

        {errorMessages.general && <div className="text-danger mb-3">{errorMessages.general}</div>}

        <button type="submit" className="btn btn-primary mb-4 w-100">Sign in</button>
        <p className="text-center">Not a member? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;