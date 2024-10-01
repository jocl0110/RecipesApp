import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Recipe = ({ loading, recipes, visibleRecipes, isFavorite }) => {
  const navigate = useNavigate();
  const handleDetailsClick = (id) => {
    navigate(`/recipe/${id}`);
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
              className={isFavorite ? "favorite" : "not-favorite"}
            />
            <button
              className="details-btn"
              onClick={() => handleDetailsClick(dataItem.id)}
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
