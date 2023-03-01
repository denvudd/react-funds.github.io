import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__links">
        <Link className="navbar__link" to="/about">О нас</Link>
        <Link className="navbar__link" to="/posts">Посты</Link>
      </div>
    </nav>
  );
};

export default Navbar;