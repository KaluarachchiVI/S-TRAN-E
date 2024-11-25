import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '', // New age field added
  });

  const { name, email, password, confirmPassword, age } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    if (age < 1) {
      alert('Please enter a valid age');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5050/user/register', // Correct API URL
        formData
      );
      console.log('Response:', res.data);
      
      alert('Register successful');
      navigate('/login');
       // Navigate to login on success
    } catch (err) {
      console.error('Error registering:', err.response?.data || err.message);
      alert('Error during registration');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await handleRegister();
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="age"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 w-full"
            >
              Register
            </button>
          </div>
          <Link to="/login">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors duration-300 w-full mt-4 border-2 border-indigo-600">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
