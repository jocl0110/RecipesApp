import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li className="header">
          <h1>Recipes App</h1>
        </li>
        <li className="links">
          <Link to="/">Home</Link>
        </li>
        <li className="links">
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
