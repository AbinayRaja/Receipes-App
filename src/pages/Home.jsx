import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { recipes, categories } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function Home({ isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const featured = recipes.slice(0, 3);
  const trending = recipes.filter(r => r.rating >= 4.8).slice(0, 6);
  const quick = recipes.filter(r => r.time <= 20).slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div style={{ paddingTop: 68 }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(232,160,69,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 30% 80%, rgba(76,175,125,0.05) 0%, transparent 60%),
            var(--bg)
          `,
        }} />

        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1280, margin: '0 auto', width: '100%',
          padding: '80px 24px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(232,160,69,0.1)', border: '1px solid rgba(232,160,69,0.2)',
              borderRadius: 30, padding: '6px 16px', marginBottom: 28,
              animation: 'fadeIn 0.6s ease',
            }}>
              <TrendingUp size={13} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.5px' }}>
                DISCOVER · COOK · ENJOY
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 5vw, 72px)',
              fontWeight: 700, lineHeight: 1.1,
              color: 'var(--text)', marginBottom: 24,
              animation: 'fadeIn 0.6s 0.1s ease both',
            }}>
              Cook with <br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Passion.</em>
              <br />Eat with Joy.
            </h1>

            <p style={{
              fontSize: 17, color: 'var(--text2)', lineHeight: 1.7,
              maxWidth: 440, marginBottom: 36,
              animation: 'fadeIn 0.6s 0.2s ease both',
            }}>
              Explore hundreds of handcrafted recipes from world cuisines. From weeknight dinners to weekend feasts — your next favourite dish is waiting.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} style={{
              display: 'flex', gap: 0, marginBottom: 24, maxWidth: 480,
              animation: 'fadeIn 0.6s 0.3s ease both',
            }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '12px 0 0 12px', padding: '0 16px',
              }}>
                <Search size={16} color="var(--text3)" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pasta, ramen, curry..."
                  style={{
                    background: 'none', border: 'none', color: 'var(--text)',
                    fontSize: 14, padding: '14px 12px', width: '100%',
                  }}
                />
              </div>
              <button type="submit" style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#000', fontWeight: 700, fontSize: 14,
                padding: '0 24px', borderRadius: '0 12px 12px 0',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'var(--transition)',
              }}>
                Search <ArrowRight size={16} />
              </button>
            </form>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: 32,
              animation: 'fadeIn 0.6s 0.4s ease both',
            }}>
              {[['12+', 'Recipes'], ['7', 'Categories'], ['4.8★', 'Avg Rating']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured cards stack */}
          <div style={{ position: 'relative', height: 500 }} className="hero-cards">
            {featured.map((recipe, i) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <div style={{
                  position: 'absolute',
                  width: 220, height: 280,
                  left: [60, 140, 20][i],
                  top: [30, 120, 210][i],
                  borderRadius: 20, overflow: 'hidden',
                  border: '2px solid var(--border)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  transform: [`rotate(-6deg)`, `rotate(2deg)`, `rotate(-3deg)`][i],
                  animation: `scaleIn 0.5s ${i * 0.15}s ease both`,
                  transition: 'var(--transition)',
                  zIndex: [1, 3, 2][i],
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = [`rotate(-6deg)`, `rotate(2deg)`, `rotate(-3deg)`][i]}
                >
                  <img src={recipe.image} alt={recipe.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    padding: '40px 14px 14px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, fontFamily: 'var(--font-display)' }}>
                      {recipe.title}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={9} fill="var(--accent)" /> {recipe.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700 }}>
            Browse Categories
          </h2>
          <Link to="/explore" style={{ fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{
          display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
          scrollbarWidth: 'none',
        }}>
          {categories.filter(c => c.id !== 'all').map((cat, i) => {
            const count = recipes.filter(r => r.category === cat.id).length;
            return (
              <Link to={`/explore?cat=${cat.id}`} key={cat.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, padding: '20px 24px',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, minWidth: 110, flexShrink: 0,
                transition: 'var(--transition)',
                animation: `fadeIn 0.4s ${i * 0.08}s ease both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'rgba(232,160,69,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--card)';
              }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{count} recipes</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRENDING */}
      <section style={{ padding: '40px 24px 60px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <TrendingUp size={16} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px' }}>HIGHEST RATED</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700 }}>Trending Now</h2>
          </div>
          <Link to="/explore" style={{ fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {trending.map((recipe, i) => (
            <RecipeCard
              key={recipe.id} recipe={recipe} index={i}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* QUICK MEALS BANNER */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(232,160,69,0.1) 0%, rgba(76,175,125,0.05) 100%)',
          border: '1px solid rgba(232,160,69,0.2)',
          borderRadius: 24, padding: '40px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Clock size={16} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px' }}>UNDER 20 MINUTES</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              Quick & Easy Meals
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 400 }}>
              Busy day? These recipes go from kitchen to table in 20 minutes or less.
            </p>
          </div>
          <Link to="/explore?quick=true" style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: '#000', fontWeight: 700, fontSize: 14,
            padding: '14px 28px', borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 8,
            flexShrink: 0, whiteSpace: 'nowrap',
          }}>
            Browse Quick Recipes <ArrowRight size={16} />
          </Link>
        </div>

        {/* Quick meals grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16, marginTop: 24,
        }}>
          {quick.map((recipe, i) => (
            <RecipeCard
              key={recipe.id} recipe={recipe} index={i}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-cards { display: none !important; }
        }
      `}</style>
    </div>
  );
}
