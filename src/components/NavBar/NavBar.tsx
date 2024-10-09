import "./index.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const home = useNavigate();
  const handleHome = () => {
    home("/");
  };
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li className="header">
          <h1 onClick={handleHome}>🍴Recipes App</h1>
        </li>
        <li className="links">
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
