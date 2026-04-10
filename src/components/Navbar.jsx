import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, BookOpen, Home, X, Menu } from 'lucide-react';

export default function Navbar({ favCount }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const nav = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Search },
    { to: '/favorites', label: 'Saved', icon: Heart, badge: favCount },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(12,12,12,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'var(--transition)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>🍴</div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 22, color: 'var(--text)',
              letterSpacing: '-0.5px',
            }}>Abi</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {nav.map(({ to, label, icon: Icon, badge }) => {
              const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
              return (
                <Link key={to} to={to} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 10,
                  background: active ? 'rgba(232,160,69,0.12)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text2)',
                  fontWeight: active ? 600 : 400,
                  fontSize: 14, transition: 'var(--transition)',
                  position: 'relative',
                }}>
                  <Icon size={16} />
                  {label}
                  {badge > 0 && (
                    <span style={{
                      position: 'absolute', top: 4, right: 8,
                      background: 'var(--accent)', color: '#000',
                      fontSize: 10, fontWeight: 700,
                      width: 16, height: 16, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{badge}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn"
            style={{ color: 'var(--text)', padding: 8, borderRadius: 8 }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, bottom: 0,
          background: 'rgba(12,12,12,0.98)', backdropFilter: 'blur(20px)',
          zIndex: 99, display: 'flex', flexDirection: 'column',
          padding: 24, gap: 8, animation: 'fadeIn 0.2s ease',
        }}>
          {nav.map(({ to, label, icon: Icon, badge }) => (
            <Link key={to} to={to} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px', borderRadius: 12,
              background: 'var(--bg2)', color: 'var(--text)',
              fontSize: 16, fontWeight: 500, position: 'relative',
            }}>
              <Icon size={20} color="var(--accent)" />
              {label}
              {badge > 0 && (
                <span style={{
                  marginLeft: 'auto', background: 'var(--accent)', color: '#000',
                  fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                }}>{badge}</span>
              )}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) { .desktop-nav { display: none !important; } }
        @media (min-width: 641px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </>
  );
}
