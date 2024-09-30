import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Recipe from "./components/RecipeItem/Recipe";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState(9);

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
    if (visibleRecipes + 9 >= recipes.length) {
      if (visibleRecipes == recipes.length) {
        setVisibleRecipes(recipes.length);
      }
      setVisibleRecipes(9);
    } else {
      setVisibleRecipes(visibleRecipes + 9);
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
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
    <main className="">
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input
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
          recipes={recipes}
          loading={loading}
          visibleRecipes={visibleRecipes}
        />
      )}
      {recipes.length > 6 && !loading && (
        <button onClick={handleShowMore}>Show More</button>
      )}
    </main>
  );
}

export default App;
