import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'legal',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters long.");

    setLoading(true);

    try {
      const usersRaw = localStorage.getItem('mock_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists. Please login.');
        setLoading(false);
        return;
      }

      const newUser = { ...formData };
      users.push(newUser);
      localStorage.setItem('mock_users', JSON.stringify(users));

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 1200);

    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Sign up to join the Legal Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <PasswordField name="password" value={formData.password} onChange={handleChange} label="Password" />
          <PasswordField name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} label="Confirm Password" />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

// ====================
// Reusable InputField
function InputField({ label, name, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        required
      />
    </div>
  );
}

// ====================
// Reusable PasswordField
function PasswordField({ name, value, onChange, label }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-16 border rounded-xl shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 text-gray-500 hover:text-gray-700 font-medium"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

