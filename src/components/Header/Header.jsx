import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownIcon from "../../images/DropdownBtn.svg";
import CloseIcon from "../../images/Close_Icon.png";
import PokemonLogo from "../../images/PokePedia-Logo.png";
import "../../blocks/header.css";
import "../../index.css";

// export default function Header({ isLoggedIn, userEmail, onLogout }) {
export default function Header({
  allTypes,
  selectedType,
  onSelectType,
  onLogout,
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      if (!mobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
    navigate("/signin");
  };

  return (
    <header
      className={`header header--logged-in ${menuOpen ? "menu--open" : ""}`}
    >
      <div className="header__pageName">
        <img src={PokemonLogo} alt="PokePedia Logo" className="header__logo" />
      </div>

      <div className="header__filters">
        <button
          onClick={() => onSelectType("all")}
          className={`header__filter-btn ${
            selectedType === "all" ? "header__filter-btn--active" : ""
          }`}
        >
          All
        </button>
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`header__filter-btn header__filter-btn--${type} ${
              selectedType === type ? "header__filter-btn--active" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* <div>
        {pokemonTypes.map((type) => (
          <button key={type} className="header__button">
            {type}
          </button>
        ))}
      </div> */}
      {/** Si es móvil, mostramos toggle + dropdown */}
      {isMobile ? (
        <>
          {/* <button
            className="header__dropdown-toggle"
            onClick={toggleMenu}
            aria-label="Menú de usuario"
          >
            <img
              src={menuOpen ? CloseIcon : DropdownIcon}
              alt={menuOpen ? "Cerrar" : "Abrir"}
            />
          </button> */}

          {menuOpen && (
            <div className="header__dropdown-menu">
              {/* <span className="header__email--dropdown">{userEmail}</span> */}
              <button
                className="header__button--dropdown"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="header__auth-info">
          <button className="header__button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
