import React, { useState } from 'react';
import '../Assets/css/diet.css'; 
import highProtein from '../Assets/High-protein-foods.jpg';
import lowCarb from '../Assets/no-carb-diet.webp';
import dairyFree from '../Assets/Dairy-Free.jpg';
import vegetaria from '../Assets/vegetaria.jpeg';
import highProteinRecipes from './HighProtein';
import lowCarbRecipes from './LowCarb';
import dairyFreeRecipes from './DairyFree';
import vegetariaRecipes from './Vegetaria';

const DietPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name');

  const categories = [
    { name: 'High Protein', img: highProtein, recipes: 9 },
    { name: 'Low Carb', img: lowCarb, recipes: 9 },
    { name: 'Dairy Free', img: dairyFree, recipes: 9 },
    { name: 'Vegetarian', img: vegetaria, recipes: 9 },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category.name === 'High Protein') {
      setRecipes(highProteinRecipes);
    }
    if (category.name === 'Low Carb') {
      setRecipes(lowCarbRecipes);
    }
    if (category.name === 'Dairy Free') {
      setRecipes(dairyFreeRecipes);
    }
    if (category.name === 'Vegetarian') {
      setRecipes(vegetariaRecipes);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const sortedRecipes = [...currentRecipes].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === 'time') {
      return a.time - b.time;
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="diet-plan-page" style={{ marginTop: "72px" }}>
      <header className="diet-plan-header">
        <h1>Diet Plan</h1>
        <p>Your journey to a healthier lifestyle starts here!</p>
      </header>

      <section className="categories-section">
        <h2>Browse Diet Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <img src={category.img} alt={category.name} className="category-image" />
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.recipes} recipes</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <section className="recipes-section">
          <h2>{selectedCategory.name} Recipes</h2>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>
          <div className="recipes-grid">
            {sortedRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <div className="recipe-content">
                  <h3>{recipe.name}</h3>
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                  <p><strong>Steps:</strong> {recipe.steps.join('. ')}</p>
                  <p><strong>Nutrition:</strong> {recipe.nutrition}</p>
                  <p><strong>Time:</strong> {recipe.time}</p>
                  <p><strong>Rating:</strong> {recipe.rating} stars</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DietPlan;
