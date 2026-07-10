// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeView from './views/HomeView';
import './styles/globals.css';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <nav className="glass-panel" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0, border: 'none', background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Link to="/">
                    <img 
                        src="/logo.png" 
                        alt="LONGYOUNG" 
                        style={{ 
                            height: '36px', 
                            objectFit: 'contain', 
                            display: 'block',
                            filter: 'brightness(0) invert(1)'
                        }} 
                    />
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>HOME</Link>
                    <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <span style={{ cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 500 }}>EN</span>
                        <span>|</span>
                        <span style={{ cursor: 'pointer', transition: 'color 0.3s' }}>繁體</span>
                        <span>|</span>
                        <span style={{ cursor: 'pointer', transition: 'color 0.3s' }}>简体</span>
                    </div>
                </div>
            </nav>
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 60px)' }}>
                {children}
            </main>
            <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
                © 2025 Longyoung Electronics. Inspire Technology and Life.
            </footer>
        </div>
    );
};

function App() {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/global" element={<div style={{padding: '5rem', textAlign: 'center'}}>Global Footprint View (Coming Soon)</div>} />
                <Route path="/products" element={<div style={{padding: '5rem', textAlign: 'center'}}>Products View (Coming Soon)</div>} />
            </Routes>
        </Layout>
    </Router>
  );
}

export default App;
