import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import "./index.css";

interface Ingredient {
  quantity: number | null;
  description: string;
}

interface Recipe {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
  ingredients: Ingredient[];
  servings: number;
  cooking_time: number;
}

interface RecipeDetailsProps {
  isFavorite: Recipe[];
  handleIsFavorite: (recipe: Recipe) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  isFavorite,
  handleIsFavorite,
  setLoading,
}) => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  useEffect(() => {
    async function getDetails() {
      setLoading(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  return (
    <div className="container">
      {recipeDetails ? (
        <div className="recipe-container">
          <div className="header">
            <h3>
              {recipeDetails?.title} - {recipeDetails?.publisher}
            </h3>

            <img
              className="img"
              src={recipeDetails?.image_url}
              alt={recipeDetails.title}
            />
            <div className="cooking-details">
              <p>Number of servings: {recipeDetails?.servings}</p>
              <p>Cooking Time: {recipeDetails?.cooking_time} min</p>
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
          </div>

          <ul className="ingredients">
            <h3>Ingredients</h3>
            {recipeDetails?.ingredients.map(
              (ingredient: Ingredient, index: number) => (
                <li key={index}>
                  <span>{ingredient?.quantity}</span> {ingredient?.description}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
