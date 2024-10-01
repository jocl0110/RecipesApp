import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { loading, setLoading } = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();
        setRecipeDetails(data.data.recipe);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details");
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p>Loading Recipe Details</p>;
  }

  if (!RecipeDetails) {
    return <p>No details found for this recipe.</p>;
  }
  console.log(recipeDetails);
  return (
    <>
      <div className="recipe-details">
        <p>{RecipeDetails}</p>
      </div>
    </>
  );
};

export default RecipeDetails;
