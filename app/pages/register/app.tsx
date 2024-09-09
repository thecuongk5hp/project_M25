"use client"; // chỉ định rằng đây là component client

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link'; // Nhập khẩu từ next/link
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '../../interfaces/UserInterface';
import { RegisterFormData } from '../../interfaces/RegisterFormData';

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    fullname: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    general: '',
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: '' });

    // Kiểm tra tên người dùng đã tồn tại
    if (name === 'username') {
      try {
        const existingUser = await axios.get(`http://localhost:8080/users?username=${value}`);
        if (existingUser.data.length > 0) {
          setErrorMessages((prev) => ({ ...prev, username: 'Username already exists. Please choose another one.' }));
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.fullname || !formData.password) {
      setErrorMessages({ ...errorMessages, general: 'Please fill in all required fields.' });
      return;
    }

    try {
      const newUser: Omit<User, 'id'> = {
        ...formData,
        status: 'active',
        role: 'user',
        avatar: '',
        phone: '',
        address: '',
        created_at: new Date().toLocaleDateString('vi-VN'),
        updated_at: new Date().toLocaleDateString('vi-VN'),
      };

      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log('User registered successfully:', response.data);
      
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to register. Please try again later.' });
    }
  };

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <p>Sign up with:</p>
          <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
            {/* Các nút đăng nhập bằng mạng xã hội */}
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
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
          {errorMessages.username && <div className="text-danger">{errorMessages.username}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="fullname" className="form-label">Fullname</label>
          <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
          {errorMessages.fullname && <div className="text-danger">{errorMessages.fullname}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
        </div>

        {errorMessages.general && <div className="text-danger mb-3">{errorMessages.general}</div>}

        <button type="submit" className="btn btn-primary mb-4 w-100">Sign up</button>
        <p className="text-center">Already a member? <Link href="/login">Sign in</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;