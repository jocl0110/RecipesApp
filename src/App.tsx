import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Recipe from "./components/RecipeItem/Recipe";
import { Route, Routes, useNavigate } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Form from "./components/Form/Form";

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

function App() {
  const [ingredient, setIngredient] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isFavorite, setFavorite] = useState<RecipeType[]>([]);
  const [visibleRecipes, setVisibleRecipes] = useState<number>(8);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (recipes && recipes.length == 0) {
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }
    }
    const savedFavorites = localStorage.getItem("favorites");
    if (isFavorite && isFavorite.length == 0) {
      if (savedFavorites) {
        setFavorite(JSON.parse(savedFavorites));
      } else {
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    if (isFavorite.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(isFavorite));
    }
  }, [recipes, isFavorite]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleShowMore = () => {
    setVisibleRecipes((prev) => Math.min(prev + 8, recipes.length));
  };

  const handleShowLess = () => {
    setVisibleRecipes((prev) => Math.max(prev - 8, 8));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        } else {
          console.log("No recipes found");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setIngredient("");
      }
    }, 2000);
  };

  const handleIsFavorite = (getCurrentItem: RecipeType) => {
    console.log(getCurrentItem);
    let favoriteCopy = [...isFavorite];
    const index = favoriteCopy.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      favoriteCopy.push(getCurrentItem);
    } else {
      favoriteCopy.splice(index, 1);
    }
    setFavorite(favoriteCopy);
    if (favoriteCopy.length === 0) {
      localStorage.removeItem("favorites");
    }
  };

  const navigate = useNavigate();
  const handleRecipeDetails = (id: string) => {
    navigate(`/recipe-item/${id}`);
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {
                <Form
                  handleSubmit={handleSubmit}
                  ingredient={ingredient}
                  handleChange={handleChange}
                />
              }
              {loading ? (
                <div>
                  <p className="loading">Loading</p>
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
                  handleIsFavorite={handleIsFavorite}
                  handleRecipeDetails={handleRecipeDetails}
                />
              )}
              {recipes.length > 0 ? (
                <div className="handleShow">
                  {!loading && recipes.length > 0 && (
                    <button
                      className={`show-btn ${
                        visibleRecipes >= recipes.length ? "disabled" : ""
                      }`}
                      onClick={handleShowMore}
                      disabled={visibleRecipes >= recipes.length}
                    >
                      Show More
                    </button>
                  )}
                  {!loading && recipes.length > 0 && (
                    <button
                      className={`show-btn ${
                        visibleRecipes === 8 ? "disabled" : ""
                      }`}
                      onClick={handleShowLess}
                      disabled={visibleRecipes === 8}
                    >
                      Show Less
                    </button>
                  )}
                </div>
              ) : null}
            </>
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites
              isFavorite={isFavorite}
              handleIsFavorite={handleIsFavorite}
              handleRecipeDetails={handleRecipeDetails}
            />
          }
        ></Route>
        <Route
          path="/recipe-item/:id"
          element={
            <RecipeDetails
              isFavorite={isFavorite}
              handleIsFavorite={handleIsFavorite}
              loading={loading}
              setLoading={setLoading}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
