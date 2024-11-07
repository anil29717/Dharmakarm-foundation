import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to the login route
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
      if (response.status === 200) {
        onLogin();
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border rounded w-full p-2"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded w-full p-2"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
