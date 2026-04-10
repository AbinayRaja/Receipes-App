import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function Favorites({ favorites, isFavorite, onToggleFavorite }) {
  const favRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, animation: 'fadeIn 0.4s ease' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(224,82,82,0.15)',
              border: '1px solid rgba(224,82,82,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={20} color="var(--red)" fill="var(--red)" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700 }}>
                Saved Recipes
              </h1>
              <p style={{ color: 'var(--text3)', fontSize: 14 }}>
                {favRecipes.length} recipe{favRecipes.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {favRecipes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{ fontSize: 72, marginBottom: 20, animation: 'pulse 2s infinite' }}>💔</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>
              No saved recipes yet
            </h2>
            <p style={{ color: 'var(--text3)', fontSize: 16, maxWidth: 400, margin: '0 auto 28px' }}>
              Tap the heart icon on any recipe to save it here for easy access later.
            </p>
            <Link to="/explore" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#000', fontWeight: 700, fontSize: 15,
              padding: '14px 28px', borderRadius: 12,
            }}>
              Explore Recipes <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28,
              animation: 'fadeIn 0.4s 0.1s ease both',
            }}>
              {[
                { label: 'Total saved', value: favRecipes.length },
                { label: 'Avg rating', value: (favRecipes.reduce((s, r) => s + r.rating, 0) / favRecipes.length).toFixed(1) + '★' },
                { label: 'Avg time', value: Math.round(favRecipes.reduce((s, r) => s + r.time, 0) / favRecipes.length) + ' min' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '14px 20px',
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}>
              {favRecipes.map((recipe, i) => (
                <RecipeCard
                  key={recipe.id} recipe={recipe} index={i}
                  isFavorite={isFavorite(recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
