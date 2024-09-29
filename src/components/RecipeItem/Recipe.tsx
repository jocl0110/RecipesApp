const Recipe = ({ loading, recipes }) => {
  return (
    <ul>
      {recipes ? (
        recipes.map((dataItem) => (
          <li key={dataItem.id}>
            <img
              style={{ width: "100px", height: "auto" }}
              src={dataItem.image_url}
            />
            <p>{dataItem.publisher}</p>
            <p>{dataItem.title}</p>
          </li>
        ))
      ) : (
        <div>
          {!loading && <p>Nothing to show. Please search an ingredient</p>}
        </div>
      )}
    </ul>
  );
};

export default Recipe;
