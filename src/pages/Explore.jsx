import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { recipes, categories } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function Explore({ isFavorite, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [difficulty, setDifficulty] = useState('all');
  const [maxTime, setMaxTime] = useState(searchParams.get('quick') === 'true' ? 20 : 999);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    const quick = searchParams.get('quick');
    if (q) setQuery(q);
    if (cat) setActiveCategory(cat);
    if (quick === 'true') setMaxTime(20);
  }, []);

  const filtered = useMemo(() => {
    let result = [...recipes];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter(r => r.category === activeCategory);
    }

    if (difficulty !== 'all') {
      result = result.filter(r => r.difficulty === difficulty);
    }

    result = result.filter(r => r.time <= maxTime);

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return a.time - b.time;
      if (sortBy === 'calories') return a.calories - b.calories;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

    return result;
  }, [query, activeCategory, difficulty, maxTime, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('all');
    setDifficulty('all');
    setMaxTime(999);
    setSortBy('rating');
  };

  const hasActiveFilters = query || activeCategory !== 'all' || difficulty !== 'all' || maxTime !== 999;

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '32px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700,
            marginBottom: 8, animation: 'fadeIn 0.4s ease',
          }}>Explore Recipes</h1>
          <p style={{ color: 'var(--text2)', fontSize: 15, marginBottom: 24, animation: 'fadeIn 0.4s 0.1s ease both' }}>
            {filtered.length} recipes found
            {hasActiveFilters && ' · '}
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
                Clear all filters
              </button>
            )}
          </p>

          {/* Search bar */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            animation: 'fadeIn 0.4s 0.15s ease both',
          }}>
            <div style={{
              flex: 1, minWidth: 240, display: 'flex', alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '0 16px', gap: 10,
            }}>
              <Search size={16} color="var(--text3)" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, ingredient, tag..."
                style={{
                  background: 'none', border: 'none', color: 'var(--text)',
                  fontSize: 14, padding: '14px 0', width: '100%',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ color: 'var(--text3)' }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  color: 'var(--text)', borderRadius: 12, padding: '0 36px 0 16px',
                  height: 50, fontSize: 14, appearance: 'none', cursor: 'pointer',
                  minWidth: 150,
                }}>
                <option value="rating">Top Rated</option>
                <option value="time">Quickest</option>
                <option value="reviews">Most Reviewed</option>
                <option value="calories">Lowest Calories</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', pointerEvents: 'none' }} />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: showFilters ? 'rgba(232,160,69,0.15)' : 'var(--card)',
                border: showFilters ? '1px solid var(--accent)' : '1px solid var(--border)',
                color: showFilters ? 'var(--accent)' : 'var(--text2)',
                borderRadius: 12, padding: '0 18px', height: 50, fontSize: 14, fontWeight: 500,
                transition: 'var(--transition)',
              }}>
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div style={{
              marginTop: 16, padding: 20, background: 'var(--card)',
              border: '1px solid var(--border)', borderRadius: 12,
              display: 'flex', gap: 32, flexWrap: 'wrap',
              animation: 'fadeIn 0.2s ease',
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', marginBottom: 10, letterSpacing: '1px' }}>DIFFICULTY</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['all', 'Easy', 'Medium', 'Hard'].map(d => (
                    <button key={d} onClick={() => setDifficulty(d)} style={{
                      padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: difficulty === d ? 'var(--accent)' : 'var(--bg3)',
                      color: difficulty === d ? '#000' : 'var(--text2)',
                      border: 'none', transition: 'var(--transition)',
                    }}>
                      {d === 'all' ? 'Any' : d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', marginBottom: 10, letterSpacing: '1px' }}>
                  MAX TIME: {maxTime === 999 ? 'Any' : `${maxTime} min`}
                </div>
                <input type="range" min={10} max={120} step={10}
                  value={maxTime === 999 ? 120 : maxTime}
                  onChange={e => setMaxTime(Number(e.target.value) === 120 ? 999 : Number(e.target.value))}
                  style={{ width: 180, accentColor: 'var(--accent)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                  <span>10m</span><span>Any</span>
                </div>
              </div>
            </div>
          )}

          {/* Category pills */}
          <div style={{
            display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto',
            paddingBottom: 4, scrollbarWidth: 'none',
          }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 30, fontSize: 13, fontWeight: 500,
                whiteSpace: 'nowrap', flexShrink: 0,
                background: activeCategory === cat.id ? 'var(--accent)' : 'var(--card)',
                color: activeCategory === cat.id ? '#000' : 'var(--text2)',
                border: activeCategory === cat.id ? 'none' : '1px solid var(--border)',
                transition: 'var(--transition)',
              }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>No recipes found</h3>
            <p style={{ color: 'var(--text3)', marginBottom: 20 }}>Try adjusting your search or filters</p>
            <button onClick={clearFilters} style={{
              background: 'var(--accent)', color: '#000', fontWeight: 600,
              padding: '10px 24px', borderRadius: 10, fontSize: 14,
            }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {filtered.map((recipe, i) => (
              <RecipeCard
                key={recipe.id} recipe={recipe} index={i}
                isFavorite={isFavorite(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
