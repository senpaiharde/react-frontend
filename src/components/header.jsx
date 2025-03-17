import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import PropTypes from "prop-types";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";


export function Header() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <header className="header">
      <div className="header__container">
        
        <h1 className="header__logo">Toy Store</h1>

        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/toys">Toys</Link>
        </nav>

        <div className="header__right">
          {user ? (<div className="header__user">
            <p>Welcome, {user.fullname}!</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>) : (
            <Link to='/login'>
                <button className="login-btn">Login</button>
            </Link>
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <IoMoon /> : <IoSunny />}
          </button>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
    mockUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
};

Header.defaultProps = {
    mockUser: {name: 'guest'},

}