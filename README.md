# 🍴 Abi — Food Recipe App

A beautifully designed, full-featured food recipe application built with React.

## ✨ Features

- **Home Page** — Hero section, category browser, trending recipes, quick meals
- **Explore Page** — Search, filter by category/difficulty/time, sort recipes
- **Recipe Detail** — Full ingredients (with servings adjuster), step-by-step cooking mode, nutrition info, related recipes
- **Favorites** — Save/unsave recipes, persisted to localStorage
- **Responsive** — Works on mobile, tablet, and desktop
- **Dark Theme** — Elegant dark UI with warm amber accents

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate to the project folder
cd food-recipe-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000** 🎉

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
food-recipe-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation with mobile support
│   │   └── RecipeCard.jsx   # Recipe card with hover effects
│   ├── data/
│   │   └── recipes.js       # All recipe data (12 recipes, 7 categories)
│   ├── hooks/
│   │   └── useFavorites.js  # Favorites state + localStorage persistence
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with hero, categories, trending
│   │   ├── Explore.jsx      # Search + filter + sort page
│   │   ├── RecipeDetail.jsx # Full recipe view with cooking mode
│   │   └── Favorites.jsx    # Saved recipes page
│   ├── App.js               # Router setup
│   ├── index.js             # Entry point
│   └── index.css            # Global styles + CSS variables
└── package.json
```

## 🎨 Design System

- **Font**: Playfair Display (headings) + DM Sans (body)
- **Colors**: Dark bg (#0c0c0c) + Amber accent (#e8a045) + Green (#4caf7d)
- **Animations**: CSS keyframes for fade, slide, scale, shimmer

## 📦 Dependencies

- `react` + `react-dom` — UI framework
- `react-router-dom` — Client-side routing
- `lucide-react` — Icons

## 🧑‍🍳 Recipes Included

12 hand-crafted recipes across 7 categories:
- Breakfast: Avocado Toast, Shakshuka, Banana Protein Smoothie
- Lunch: Mediterranean Quinoa Bowl, French Onion Soup
- Dinner: Thai Green Curry, Crispy Parmesan Chicken, Miso Ramen
- Dessert: Chocolate Lava Cake, Tiramisu
- Drinks: Mango Lassi
- Snacks: Spicy Tuna Nachos

---

Built with ❤️ using React
