import { AiFillStar } from "react-icons/ai";

const Favorites = ({ isFavorite, handleIsFavorite, handleRecipeDetails }) => {
  return (
    <div>
      <h1>Favorite Recipes</h1>
      <ul className="recipe-container">
        {isFavorite && isFavorite.length > 0 ? (
          isFavorite.map((dataItem) => (
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
                  isFavorite[dataItem.id] ? "favorite" : "not-favorite"
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
    </div>
  );
};

export default Favorites;
