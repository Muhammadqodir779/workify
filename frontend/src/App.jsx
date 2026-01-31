import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
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
import Sidebar from './components/sidebar/Sidebar'; // Sidebar'ni import qiling
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Dashboard yoki Profile sahifasida ekanligini aniqlash
  const isAuthPage =
    location.pathname === '/dashboard' || location.pathname === '/profile';

  return (
    <div className={isAuthPage ? 'dashboard-root' : 'app-container'}>
      {/* Sidebar faqat Dashboard va Profile sahifalarida chiqadi */}
      {isAuthPage && <Sidebar />}

      {/* Header faqat oddiy sayt sahifalarida chiqadi */}
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

      {/* Footer faqat oddiy sayt sahifalarida chiqadi */}
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
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
