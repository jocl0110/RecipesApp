import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const handleChange = (e) => {
    setIngredient(e.target.value);
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
        }
      } catch (e) {
        console.log(e);
      }
    }, 2000);
  }

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input
          value={ingredient}
          type="text"
          placeholder="Enter ingredient..."
          onChange={handleChange}
        />
      </form>
      <ul>
        {recipes && recipes.length > 0 ? (
          recipes.map((dataItem) => (
            <li>
              {dataItem.title}
              <img
                style={{ width: "100px", height: "auto" }}
                src={dataItem.image_url}
              />
            </li>
          ))
        ) : (
          <div>{loading && <p>Loading...</p>}</div>
        )}
      </ul>
    </div>
  );
}

export default App;
