import { useState } from "react";

const Recipe = ({ loading, recipes, visibleRecipes }) => {
  return (
    <ul className="recipe-card">
      {recipes && recipes.length > 0 ? (
        recipes.slice(0, visibleRecipes).map((dataItem) => (
          <li key={dataItem.id}>
            <img
              alt={dataItem.title}
              className="recipe-img"
              style={{ width: "200px", height: "200px" }}
              src={dataItem.image_url}
            />
            <p className="recipe-publisher">{dataItem.publisher}</p>
            <p className="recipe-title">{dataItem.title}</p>
          </li>
        ))
      ) : (
        <p>Nothing to show. Please search an ingredient</p>
      )}
    </ul>
  );
};

export default Recipe;
