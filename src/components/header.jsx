import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

export function Header ({mockUser}) {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");



   const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${newTheme}-theme`);

    localStorage.setItem('theme',newTheme);
   };



   useEffect(()=>{
    document.documentElement.classList.remove(`${theme}-theme`);
   }, []);




return (
    <header className="header">
        <div>
        <h1 className="header_">Toy Store</h1>
        <nav className="header__nav">
            <Link to="/">Home</Link>
            <Link to="/toys">Toys</Link>
        </nav>

        <div className="header__right" >
            <p className="header__user">{mockUser.user}</p>
            <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === "light" ? <IoMoon /> : <IoSunny />}
                    </button>
        </div>
        </div>
    </header>
)
}