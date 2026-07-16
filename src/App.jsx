// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeView from './views/HomeView';
import { Sun, Moon } from 'lucide-react';
import './styles/globals.css';

const Layout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        const saved = localStorage.getItem('theme_isDarkMode');
        return saved !== null ? JSON.parse(saved) : true;
    });

    React.useEffect(() => {
        localStorage.setItem('theme_isDarkMode', JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [isDarkMode]);
    return (
        <div className="app-container">
            <nav className="glass-panel" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0, border: 'none', background: 'var(--bg-glass-heavy)', borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.4s ease, border-color 0.4s ease' }}>
                <Link to="/" onClick={() => {
                    window.dispatchEvent(new Event('reset-home-view'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                    <img 
                        src="/longyoung-profile/logo.png" 
                        alt="LONGYOUNG" 
                        style={{ 
                            height: '36px', 
                            objectFit: 'contain', 
                            display: 'block',
                            filter: isDarkMode ? 'brightness(0) invert(1)' : 'none',
                            transition: 'filter 0.4s ease'
                        }} 
                    />
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--brand-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '5px' }}
                        title="Toggle Light/Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
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

        </div>
    );
};

function App() {
  return (
    <Router basename="/longyoung-profile">
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
