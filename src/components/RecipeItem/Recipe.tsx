import { AiFillStar } from "react-icons/ai";
import "./index.css";

interface Ingredient {
  quantity: number | null;
  description: string;
}

interface RecipeType {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
  ingredients: Ingredient[];
  servings: number;
  cooking_time: number;
}

interface RecipeProps {
  recipes: RecipeType[];
  isFavorite: RecipeType[];
  setFavorite: React.Dispatch<React.SetStateAction<RecipeType[]>>;
  visibleRecipes: number;
  handleIsFavorite: (recipe: RecipeType) => void;
  handleRecipeDetails: (getCurrentItem: string) => void;
}

const Recipe: React.FC<RecipeProps> = ({
  recipes,
  isFavorite,
  visibleRecipes,
  handleIsFavorite,
  handleRecipeDetails,
}) => {
  console.log(isFavorite);

  return (
    <ul className="recipe-container">
      {recipes.length > 0 ? (
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
            <div className="buttons">
              <AiFillStar
                id="favorite-btn"
                className={
                  isFavorite.some((item) => item.id === dataItem.id)
                    ? "favorite"
                    : "not-favorite"
                }
                onClick={() => handleIsFavorite(dataItem)}
              />
              <button
                className="details-btn"
                onClick={() => handleRecipeDetails(dataItem.id)}
              >
                Recipe Details
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="nothing-p">
          Nothing to show. Please search an ingredient
        </p>
      )}
    </ul>
  );
};

export default Recipe;
