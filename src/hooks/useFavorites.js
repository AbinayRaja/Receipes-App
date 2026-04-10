import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('Abi-favorites') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('Abi-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
