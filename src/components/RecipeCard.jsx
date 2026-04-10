import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, Star, Flame } from 'lucide-react';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const difficultyColor = { Easy: 'var(--green)', Medium: 'var(--accent)', Hard: 'var(--red)' };

  return (
    <div style={{
      background: 'var(--card)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      transition: 'var(--transition)',
      animation: `fadeIn 0.4s ease ${index * 0.06}s both`,
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = 'var(--border2)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      {/* Image */}
      <Link to={`/recipe/${recipe.id}`}>
        <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: 'var(--bg3)' }}>
          {!imgLoaded && !imgError && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, var(--bg3) 25%, var(--bg2) 50%, var(--bg3) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }} />
          )}
          {!imgError && (
            <img
              src={recipe.image}
              alt={recipe.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            />
          )}
          {imgError && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48,
            }}>🍽️</div>
          )}

          {/* Overlays */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '4px 10px',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px',
            color: difficultyColor[recipe.difficulty],
            border: `1px solid ${difficultyColor[recipe.difficulty]}33`,
          }}>{recipe.difficulty}</div>

          <div style={{
            position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6,
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              borderRadius: 20, padding: '4px 10px',
              fontSize: 11, fontWeight: 600, color: 'var(--accent)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Flame size={10} /> {recipe.calories} cal
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          }} />
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              background: 'var(--bg3)', color: 'var(--text3)',
              fontSize: 10, fontWeight: 500, padding: '3px 8px',
              borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>#{tag}</span>
          ))}
        </div>

        <Link to={`/recipe/${recipe.id}`}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
            color: 'var(--text)', lineHeight: 1.35, marginBottom: 8,
          }}>{recipe.title}</h3>
        </Link>

        <p style={{
          fontSize: 13, color: 'var(--text3)', lineHeight: 1.5,
          marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{recipe.description}</p>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}>
              <Clock size={12} color="var(--accent)" /> {recipe.time}m
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}>
              <Users size={12} color="var(--accent)" /> {recipe.servings}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--accent)' }}>
              <Star size={12} fill="var(--accent)" /> {recipe.rating}
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); onToggleFavorite(recipe.id); }}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: isFavorite ? 'rgba(232,80,80,0.15)' : 'var(--bg3)',
              border: isFavorite ? '1px solid rgba(232,80,80,0.3)' : '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isFavorite ? 'var(--red)' : 'var(--text3)',
              transition: 'var(--transition)',
              transform: 'scale(1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={15} fill={isFavorite ? 'var(--red)' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
