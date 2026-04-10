import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import { useFavorites } from './hooks/useFavorites';

function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const sharedProps = { isFavorite, onToggleFavorite: toggleFavorite };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/explore" element={<Explore {...sharedProps} />} />
        <Route path="/recipe/:id" element={<RecipeDetail {...sharedProps} />} />
        <Route path="/favorites" element={
          <Favorites favorites={favorites} {...sharedProps} />
        } />
        <Route path="*" element={
          <div style={{ paddingTop: 120, textAlign: 'center', padding: '200px 24px' }}>
            <div style={{ fontSize: 72 }}>🍽️</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: '20px 0 10px' }}>Page not found</h2>
            <a href="/" style={{ color: 'var(--accent)', fontSize: 16 }}>← Back to Home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
