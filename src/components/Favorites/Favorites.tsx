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

interface FavoritesProps {
  isFavorite: RecipeType[];
  handleIsFavorite: (recipe: RecipeType) => void;
  handleRecipeDetails: (getCurrentItem: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  isFavorite,
  handleIsFavorite,
  handleRecipeDetails,
}) => {
  return (
    <div>
      <h1>Favorite Recipes</h1>
      {isFavorite.length === 0 ? (
        <p className="empty-message">
          Nothing to show. Please add a recipe to your favorites section.
        </p>
      ) : (
        <ul className="recipe-container">
          {isFavorite.map((dataItem) => (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
