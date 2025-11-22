// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const usersRaw = localStorage.getItem('mock_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(u => u.email === email);
      if (!found) {
        setError('No account found for this email. Please sign up.');
        return;
      }
      if (found.password !== password) {
        setError('Incorrect password.');
        return;
      }

      const userObj = { email: found.email, role: found.role, name: found.name };
      login(userObj);
      navigate(`/${found.role}`);
    } catch {
      login({ email, role: 'sales' });
      navigate('/sales');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
     
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Login to Your Account</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Sign In to join the Legal Dashboard</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <PasswordField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            show={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
          />

          {/* Forgot password */}
          <div className="mb-6 text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Error message */}
          {error && <p className="text-center text-sm text-red-500 mb-4">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>

      <style>{`
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes blob {
          0% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
          100% { transform: translate(0px,0px) scale(1); }
        }
        .blur-3xl { filter: blur(60px); }
      `}</style>
    </div>
  );
};

export default LoginPage;

// Reusable PasswordField matching SignupPage design
function PasswordField({ label, name, value, onChange, show, toggleShow }) {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 font-medium focus:outline-none"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}
