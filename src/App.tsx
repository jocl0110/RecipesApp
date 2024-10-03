import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Recipe from "./components/RecipeItem/Recipe";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isFavorite, setFavorite] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState(8);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (recipes && recipes.length == 0) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  const handleChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleShowMore = () => {
    if (visibleRecipes + 8 >= recipes.length) {
      if (visibleRecipes == recipes.length) {
        setVisibleRecipes(recipes.length);
      }
      setVisibleRecipes(8);
    } else {
      setVisibleRecipes(visibleRecipes + 8);
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setIngredient("");
    setTimeout(async () => {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${ingredient}`
        );

        const data = await res.json();
        if (data.data.recipes) {
          setRecipes(data.data.recipes);
          setLoading(false);
          setIngredient("");
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    }, 2000);
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                  id="search"
                  autoFocus={true}
                  className="search-input"
                  value={ingredient}
                  type="text"
                  placeholder="Enter an ingredient..."
                  onChange={handleChange}
                />
              </form>
              {loading ? (
                <div>
                  <p>Loading</p>
                  <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                  </div>
                </div>
              ) : (
                <Recipe
                  isFavorite={isFavorite}
                  recipes={recipes}
                  setFavorite={setFavorite}
                  visibleRecipes={visibleRecipes}
                />
              )}
              {recipes.length > 8 && !loading && (
                <button onClick={handleShowMore}>Show More</button>
              )}
            </main>
          }
        ></Route>
        <Route
          path="/favorites"
          element={<Favorites isFavorite={isFavorite} />}
        ></Route>
        <Route path="/recipe-item/:id" element={<RecipeDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
