import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context";

import MyButton from "../button/MyButton";

import './navbar.css';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar__links">
          <Link className="navbar__link" to="/about">О нас</Link>
          <Link className="navbar__link" to="/posts">Посты</Link>
        </div>
        {isAuth 
            ? <MyButton onClick={logout}>Выйти</MyButton> 
            : null
        }
      </nav>    
    </div>
  );
};

export default Navbar;