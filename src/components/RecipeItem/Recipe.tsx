import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Recipe = ({ recipes, visibleRecipes, isFavorite, setFavorite }) => {
  const navigate = useNavigate();
  const handleRecipeDetails = () => {
    console.log("Hello");
  };

  const handleIsFavorite = (id) => {
    setFavorite((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
              onClick={() => handleIsFavorite(dataItem.id)}
            />
            <button className="details-btn" onClick={handleRecipeDetails}>
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
