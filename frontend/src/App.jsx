import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Faqat shu qoldirilsin
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RegisterStep2 from './components/registerStep2/RegisterStep2';
import RegisterStep3 from './components/registerStep3/RegisterStep3';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/dashboard' || location.pathname === '/profile';

  return (
    <div className={isAuthPage ? 'dashboard-root' : 'app-container'}>
      {isAuthPage && <Sidebar />}
      {!isAuthPage && <Header />}

      <main className={isAuthPage ? 'auth-main-content' : 'site-main'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerStep2" element={<RegisterStep2 />} />
          <Route path="/registerStep3" element={<RegisterStep3 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <Features />
  </>
);

function App() {
  return <AppContent />; // ❌ Router olib tashlandi
}

export default App;
