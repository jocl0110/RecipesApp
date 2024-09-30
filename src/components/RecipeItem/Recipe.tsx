import { useState } from "react";

const Recipe = ({ loading, recipes, visibleRecipes }) => {
  return (
    <ul className="recipe-container">
      {recipes && recipes.length > 0 ? (
        recipes.slice(0, visibleRecipes).map((dataItem) => (
          <li key={dataItem.id} className="recipe-card">
            <img
              alt={dataItem.title}
              className="recipe-img"
              src={dataItem.image_url}
            />
            <div className="recipe-description">
              <p>
                <strong>{dataItem.publisher}</strong> - {dataItem.title}
              </p>
            </div>
            <button className="details-btn">Recipe Details</button>
          </li>
        ))
      ) : (
        <p>Nothing to show. Please search an ingredient</p>
      )}
    </ul>
  );
};

export default Recipe;
