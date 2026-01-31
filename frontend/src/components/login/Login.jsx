import React, { useState } from 'react';
import './Login.css';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Axiosni import qildik
import { toast, ToastContainer } from 'react-toastify'; // Toast xabarlar uchun

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // 2. Yangilangan handleLogin funksiyasi
  const handleLogin = async (e) => {
    e.preventDefault();
    // ... (validatsiya qismi)

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      );

      // 1. Ma'lumot kelganini tekshiramiz
      if (response.data && response.data.user) {
        localStorage.setItem('token', response.data.token);
        // Obyektni saqlashdan oldin tekshiramiz
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Xush kelibsiz!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error("Ma'lumotlar formatida xatolik!");
      }
    } catch (err) {
      // ... (catch qismi)
    }
  };

  return (
    <div className="login-page">
      <ToastContainer /> {/* Xabarlar chiqishi uchun */}
      <h1 className="login-title">Login</h1>
      <div className="login-card">
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-group">
            <label>Email</label>
            <div
              className={`input-wrapper ${
                error && !email ? 'error-border' : ''
              }`}
            >
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Forexaplae@mail.ru"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <div
              className={`input-wrapper ${
                error && !password ? 'error-border' : ''
              }`}
            >
              <FiLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
              />
              <div
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          {error && <p className="error-text">Incorrect email or password</p>}

          <button
            type="submit"
            className="btn-signin-large"
            disabled={!email || !password}
          >
            Sign in
          </button>
        </form>

        <p className="register-text">
          Have no account yet? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
