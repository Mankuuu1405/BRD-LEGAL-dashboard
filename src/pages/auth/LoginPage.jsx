// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
// This path is correct
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from 'react-router-dom'; // Make sure to import Link

const Eye = ({ closed }) => (
  <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="34" height="24" rx="4" fill="transparent" />
    {closed ? (
      // closed eye (simple line)
      <g stroke="#374151" strokeWidth="2" strokeLinecap="round">
        <path d="M4 12h26" />
      </g>
    ) : (
      // open eye
      <g>
        <path d="M2 12C6 5 12 2 17 2s11 3 15 10c-4 7-10 10-15 10S6 19 2 12z" stroke="#374151" strokeWidth="1.5" fill="none" />
        <circle cx="17" cy="12" r="3" fill="#374151" />
      </g>
    )}
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Check localStorage mock users for role and password (mock auth)
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

      // Successful mock login: use stored role to redirect
      const userObj = { email: found.email, role: found.role, name: found.name };
      login(userObj);
      navigate(`/${found.role}`);
    } catch {
      // fallback: default to sales if something goes wrong
      console.warn('Login lookup failed, falling back to default role.');
      login({ email, role: 'sales' });
      navigate('/sales');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* animated background blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-40 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-20 w-72 h-72 bg-gradient-to-tr from-pink-500 to-yellow-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">BRD Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-3 py-2 border rounded-md shadow-sm pr-12 focus:ring-teal-500 focus:border-teal-500"
              />

              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded focus:outline-none"
              >
                <div className={`w-9 h-7 flex items-center justify-center transition-transform ${isFocused || password.length>0 ? 'scale-90' : ''}`}>
                  <Eye closed={isFocused || password.length>0 && !showPassword} />
                </div>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Tip: Use a strong password with letters, numbers & symbols.</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
              {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* component-scoped styles for background and blob animation */}
      <style>{`
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .blur-3xl { filter: blur(60px); }
      `}</style>
    </div>
  );
};

export default LoginPage;