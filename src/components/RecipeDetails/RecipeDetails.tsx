import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const RecipeDetails = ({ isFavorite, handleIsFavorite }) => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  useEffect(() => {
    async function getDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      if (data?.data?.recipe) {
        setRecipeDetails(data.data.recipe);
        console.log(data);
      }
    }
    getDetails();
  }, [id]);

  return (
    <div className="container">
      <img src={recipeDetails?.image_url} />
      <h3>{recipeDetails?.title}</h3>
      <h3>{recipeDetails?.publisher}</h3>
      <ul>
        <h3>Ingredients</h3>
        {recipeDetails?.ingredients.map((ingredient, index) => (
          <li key={index}>
            <span>{ingredient.quantity}</span> {ingredient.description}
          </li>
        ))}
      </ul>
      <p>Number of servings: {recipeDetails?.servings}</p>
      <AiFillStar
        id="favorite-btn"
        className={
          isFavorite.some((item) => item.id === recipeDetails?.id)
            ? "favorite"
            : "not-favorite"
        }
        onClick={() => handleIsFavorite(recipeDetails)}
      />
    </div>
  );
};

export default RecipeDetails;
