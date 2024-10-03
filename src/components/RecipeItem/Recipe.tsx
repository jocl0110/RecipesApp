import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Recipe = ({
  recipes,
  isFavorite,
  setFavorite,
  visibleRecipes,
  handleIsFavorite,
}) => {
  console.log(isFavorite);
  const navigate = useNavigate();
  const handleRecipeDetails = (id) => {
    navigate(`/recipe-item/${id}`);
  };

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
        ))
      ) : (
        <p>Nothing to show. Please search an ingredient</p>
      )}
    </ul>
  );
};

export default Recipe;
