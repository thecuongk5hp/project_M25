import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { User } from '../../../interfaces/UserInterface'; // Import User interface

const Customer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to track selected user
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserStatus = async (userId: number, newStatus: 'active' | 'locked') => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      if (!userToUpdate) {
        console.error('User not found with userId:', userId);
        return;
      }

      const updatedUser: Partial<User> = {
        ...userToUpdate,
        status: newStatus,
        updated_at: new Date().toLocaleDateString('en-GB'),
      };

      const response = await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
      const updatedUserData: User = response.data;

      const updatedUsers = users.map(user =>
        user.id === userId ? updatedUserData : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleAddUserToggle = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: '' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.fullname || !formData.password) {
      setErrorMessages({ ...errorMessages, general: 'Please fill in all required fields.' });
      return;
    }

    try {
      const existingUser = await axios.get(`http://localhost:8080/users?username=${formData.username}`);
      if (existingUser.data.length > 0) {
        setErrorMessages({ ...errorMessages, username: 'Username already exists. Please choose another one.' });
        return;
      }

      const newUser: Omit<User, 'id'> = {
        ...formData,
        status: 'active',
        role: 'user',
        avatar: '',
        phone: '',
        address: '',
        created_at: new Date().toLocaleDateString('en-GB'),
        updated_at: new Date().toLocaleDateString('en-GB'),
      };

      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log('User registered successfully:', response.data);

      setUsers([...users, response.data]);
      setShowAddUserForm(false);
      setFormData({
        username: '',
        email: '',
        fullname: '',
        password: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to register. Please try again later.' });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Management</h2>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary mb-3" onClick={handleAddUserToggle}>
            {showAddUserForm ? 'Cancel' : 'Add User'}
          </button>
          {showAddUserForm && (
            <div className="mb-4">
              <h4>Add New User</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errorMessages.username && <div className="text-danger">{errorMessages.username}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  {errorMessages.fullname && <div className="text-danger">{errorMessages.fullname}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
                </div>
                <button type="submit" className="btn btn-success">Add User</button>
                {errorMessages.general && <div className="text-danger mt-3">{errorMessages.general}</div>}
              </form>
            </div>
          )}
          <h4>User List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.updated_at}</td>
                  <td>
                    <button className="btn btn-info me-2" onClick={() => handleViewUser(user)}>
                      View
                    </button>
                    {user.role !== 'admin' ? (
                      user.status === 'active' ? (
                        <button className="btn btn-warning me-2" onClick={() => toggleUserStatus(user.id, 'locked')}>
                          Lock
                        </button>
                      ) : (
                        <button className="btn btn-success me-2" onClick={() => toggleUserStatus(user.id, 'active')}>
                          Unlock
                        </button>
                      )
                    ) : (
                      <button className="btn btn-secondary me-2" disabled>
                        Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;