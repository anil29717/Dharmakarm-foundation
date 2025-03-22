import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      <form className="bg-white p-8 rounded-lg shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        
        <div className="mb-4">
          <div className="flex items-center border rounded p-2">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full outline-none"
              value={credentials.username}
              onChange={e => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center border rounded p-2">
            <Lock size={18} className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none"
              value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;