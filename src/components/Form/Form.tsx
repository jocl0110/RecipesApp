interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  ingredient: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  ingredient,
  handleChange,
}) => {
  return (
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
  );
};

export default Form;
