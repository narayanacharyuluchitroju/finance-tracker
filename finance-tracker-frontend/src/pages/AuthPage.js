import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import PersonalFinance from '../SVG'; // Uncomment and adjust if you need to import an SVG as a React component

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('user', JSON.stringify(res.data));
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Illustration */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
        <img
        src="/SVG/finance-character.svg"
        alt="illustration"
        className="max-w-md w-full"
        />

      </div>

      {/* Right Side: Login/Register Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-10">
        <div className="max-w-sm w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome {isRegister ? '🎉' : '👋'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isRegister
              ? 'Create your account to get started'
              : 'Please sign in to your account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-semibold"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-600">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <span
                  className="text-purple-600 cursor-pointer hover:underline"
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                New here?{' '}
                <span
                  className="text-purple-600 cursor-pointer hover:underline"
                  onClick={() => setIsRegister(true)}
                >
                  Create an account
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
