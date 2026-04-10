import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Heart, Clock, Users, Star, Flame,
  ChefHat, CheckCircle, Circle, Share2, BookOpen
} from 'lucide-react';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetail({ isFavorite, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === Number(id));
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [copied, setCopied] = useState(false);

  if (!recipe) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center', padding: '200px 24px' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🍽️</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Recipe not found</h2>
        <Link to="/" style={{
          background: 'var(--accent)', color: '#000', fontWeight: 600,
          padding: '12px 24px', borderRadius: 10, display: 'inline-block', marginTop: 8,
        }}>Go Home</Link>
      </div>
    );
  }

  const related = recipes.filter(r => r.category === recipe.category && r.id !== recipe.id).slice(0, 3);
  const multiplier = servings / recipe.servings;
  const fav = isFavorite(recipe.id);

  const toggleStep = (i) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const diffColor = { Easy: 'var(--green)', Medium: 'var(--accent)', Hard: 'var(--red)' };

  const scaleAmount = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * multiplier;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      {/* Hero image */}
      <div style={{
        position: 'relative', height: '60vh', minHeight: 380, overflow: 'hidden',
        background: 'var(--bg3)',
      }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)',
        }} />

        {/* Back btn */}
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: 24, left: 24,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          color: 'white', width: 42, height: 42, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.15)', transition: 'var(--transition)',
        }}>
          <ArrowLeft size={18} />
        </button>

        {/* Actions */}
        <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 10 }}>
          <button onClick={handleShare} style={{
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            color: copied ? 'var(--green)' : 'white',
            width: 42, height: 42, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${copied ? 'var(--green)' : 'rgba(255,255,255,0.15)'}`,
            transition: 'var(--transition)',
          }}>
            <Share2 size={16} />
          </button>
          <button onClick={() => onToggleFavorite(recipe.id)} style={{
            background: fav ? 'rgba(224,82,82,0.8)' : 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            color: 'white', width: 42, height: 42, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.15)', transition: 'var(--transition)',
          }}>
            <Heart size={16} fill={fav ? 'white' : 'none'} />
          </button>
        </div>

        {/* Title overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px 32px',
        }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              color: diffColor[recipe.difficulty], fontSize: 11, fontWeight: 600,
              padding: '4px 12px', borderRadius: 20,
            }}>{recipe.difficulty}</span>
            {recipe.tags.map(tag => (
              <span key={tag} style={{
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                color: 'rgba(255,255,255,0.7)', fontSize: 11,
                padding: '4px 10px', borderRadius: 20,
              }}>#{tag}</span>
            ))}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700, color: 'white', lineHeight: 1.2, maxWidth: 700,
          }}>{recipe.title}</h1>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }} className="recipe-grid">

          {/* Left */}
          <div>
            {/* Stats bar */}
            <div style={{
              display: 'flex', gap: 0, background: 'var(--card)',
              border: '1px solid var(--border)', borderRadius: 14,
              overflow: 'hidden', marginBottom: 28,
              animation: 'fadeIn 0.4s ease',
            }}>
              {[
                { icon: Clock, label: 'Time', value: `${recipe.time} min` },
                { icon: Users, label: 'Servings', value: `${recipe.servings}` },
                { icon: Star, label: 'Rating', value: recipe.rating, accent: true },
                { icon: Flame, label: 'Calories', value: `${recipe.calories}` },
              ].map(({ icon: Icon, label, value, accent }, i) => (
                <div key={label} style={{
                  flex: 1, padding: '16px 0', textAlign: 'center',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}>
                  <Icon size={15} color={accent ? 'var(--accent)' : 'var(--text3)'}
                    style={{ margin: '0 auto 6px' }} fill={accent ? 'var(--accent)' : 'none'} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: accent ? 'var(--accent)' : 'var(--text)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.5px' }}>
                    {label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <p style={{
              color: 'var(--text2)', fontSize: 16, lineHeight: 1.7,
              marginBottom: 32, animation: 'fadeIn 0.4s 0.1s ease both',
            }}>{recipe.description}</p>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
              {['ingredients', 'steps', 'nutrition'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '10px 20px', fontSize: 14, fontWeight: 600,
                  color: activeTab === tab ? 'var(--accent)' : 'var(--text3)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1, transition: 'var(--transition)',
                  textTransform: 'capitalize',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Ingredients */}
            {activeTab === 'ingredients' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {/* Servings adjuster */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '14px 20px', marginBottom: 24,
                }}>
                  <Users size={16} color="var(--text3)" />
                  <span style={{ fontSize: 14, color: 'var(--text2)', flex: 1 }}>Adjust servings</span>
                  <button onClick={() => setServings(s => Math.max(1, s - 1))} style={{
                    width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)',
                    border: '1px solid var(--border)', color: 'var(--text)', fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>−</button>
                  <span style={{ fontSize: 18, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{servings}</span>
                  <button onClick={() => setServings(s => s + 1)} style={{
                    width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)',
                    border: 'none', color: '#000', fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>+</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', background: 'var(--card)',
                      border: '1px solid var(--border)', borderRadius: 10,
                      animation: `fadeIn 0.3s ${i * 0.04}s ease both`,
                    }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: 'var(--accent)', flexShrink: 0,
                      }} />
                      <span style={{ fontWeight: 600, color: 'var(--accent)', minWidth: 60, fontSize: 14 }}>
                        {scaleAmount(ing.amount)} {ing.unit}
                      </span>
                      <span style={{ color: 'var(--text)', fontSize: 14 }}>{ing.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            {activeTab === 'steps' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{
                  background: 'rgba(232,160,69,0.08)', border: '1px solid rgba(232,160,69,0.2)',
                  borderRadius: 10, padding: '12px 16px', marginBottom: 20,
                  fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <ChefHat size={14} />
                  Click each step to mark it complete as you cook!
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {recipe.steps.map((step, i) => {
                    const done = completedSteps.has(i);
                    return (
                      <div key={i}
                        onClick={() => toggleStep(i)}
                        style={{
                          display: 'flex', gap: 16, padding: '18px 20px',
                          background: done ? 'rgba(76,175,125,0.08)' : 'var(--card)',
                          border: `1px solid ${done ? 'rgba(76,175,125,0.3)' : 'var(--border)'}`,
                          borderRadius: 12, cursor: 'pointer', transition: 'var(--transition)',
                          animation: `fadeIn 0.3s ${i * 0.05}s ease both`,
                        }}>
                        <div style={{ flexShrink: 0, marginTop: 2 }}>
                          {done
                            ? <CheckCircle size={20} color="var(--green)" fill="rgba(76,175,125,0.2)" />
                            : <Circle size={20} color="var(--text3)" />
                          }
                        </div>
                        <div>
                          <span style={{
                            fontSize: 11, fontWeight: 700, color: done ? 'var(--green)' : 'var(--accent)',
                            letterSpacing: '1px', display: 'block', marginBottom: 6,
                          }}>STEP {i + 1}</span>
                          <p style={{
                            fontSize: 15, color: done ? 'var(--text3)' : 'var(--text)',
                            lineHeight: 1.65,
                            textDecoration: done ? 'line-through' : 'none',
                            transition: 'var(--transition)',
                          }}>{step}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {completedSteps.size === recipe.steps.length && recipe.steps.length > 0 && (
                  <div style={{
                    marginTop: 24, padding: '20px', background: 'rgba(76,175,125,0.1)',
                    border: '1px solid rgba(76,175,125,0.3)', borderRadius: 12,
                    textAlign: 'center', animation: 'scaleIn 0.4s ease',
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--green)' }}>
                      Recipe Complete!
                    </h3>
                    <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4 }}>
                      Enjoy your {recipe.title}!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Nutrition */}
            {activeTab === 'nutrition' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>
                  Nutrition per serving (based on {recipe.servings} servings)
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Protein', value: recipe.nutrition.protein, color: 'var(--accent)' },
                    { label: 'Carbs', value: recipe.nutrition.carbs, color: '#5b9bd5' },
                    { label: 'Fat', value: recipe.nutrition.fat, color: '#e05252' },
                    { label: 'Fiber', value: recipe.nutrition.fiber, color: 'var(--green)' },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{
                      padding: '24px 20px', background: 'var(--card)',
                      border: `1px solid var(--border)`, borderRadius: 12,
                      borderTop: `3px solid ${color}`,
                    }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: 'var(--font-display)' }}>
                        {value}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 12, padding: '16px 20px', background: 'var(--card)',
                  border: '1px solid var(--border)', borderRadius: 12,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ color: 'var(--text2)', fontSize: 14 }}>Total Calories</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                    {recipe.calories} kcal
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="recipe-sidebar">
            {/* Author card */}
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 14, padding: 20, marginBottom: 20,
              animation: 'fadeIn 0.4s 0.2s ease both',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>👨‍🍳</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Abi Kitchen</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>Recipe Curator</div>
                </div>
              </div>
              <div style={{
                display: 'flex', gap: 8, background: 'var(--bg2)',
                borderRadius: 10, padding: '10px 14px',
              }}>
                <Star size={13} fill="var(--accent)" color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{recipe.rating}</span>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>· {recipe.reviews} reviews</span>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                background: fav ? 'rgba(224,82,82,0.1)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: fav ? 'var(--red)' : '#000',
                border: fav ? '1px solid rgba(224,82,82,0.3)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 20, transition: 'var(--transition)',
              }}>
              <Heart size={16} fill={fav ? 'var(--red)' : 'none'} />
              {fav ? 'Saved to Favorites' : 'Save Recipe'}
            </button>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ animation: 'fadeIn 0.4s 0.3s ease both' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
                  marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <BookOpen size={15} color="var(--accent)" /> Related Recipes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {related.map(r => (
                    <Link to={`/recipe/${r.id}`} key={r.id} style={{
                      display: 'flex', gap: 12, padding: 10,
                      background: 'var(--card)', border: '1px solid var(--border)',
                      borderRadius: 10, transition: 'var(--transition)',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                        <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 4 }}>
                          {r.title}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', gap: 8 }}>
                          <span><Clock size={9} style={{ display: 'inline' }} /> {r.time}m</span>
                          <span><Star size={9} style={{ display: 'inline' }} color="var(--accent)" fill="var(--accent)" /> {r.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .recipe-grid { grid-template-columns: 1fr !important; }
          .recipe-sidebar { order: -1; }
        }
      `}</style>
    </div>
  );
}
