import { Link } from "react-router-dom";
import { useState } from "react";
import PokemonLogo from "../../images/PokePedia-Logo.png";
import "../../index.css";
// import Popup from "../Popup/Popup";

export default function Login({ onLogin /*, popup, onClosePopup */ }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [valids, setValids] = useState({
    email: true,
    password: true,
  });

  const handleChange = (evt) => {
    const { name, value, validity } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValids((prev) => ({
      ...prev,
      [name]: validity.valid,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin(data);
  };

  return (
    <>
      <form className="form" name="login-form" onSubmit={handleSubmit}>
        <img src={PokemonLogo} alt="PokePedia Logo" className="form__logo" />
        <h1 className="form__title">Iniciar sesión</h1>
        <div className="form__inputs">
          <input
            name="email"
            className={`form__input ${
              valids.email ? "" : "form__input_type_error"
            }`}
            type="email"
            placeholder="Correo electrónico"
            value={data.email}
            onChange={handleChange}
            required
            maxLength="50"
            minLength="5"
          />
          <input
            name="password"
            className={`form__input ${
              valids.password ? "" : "form__input_type_error"
            }`}
            type="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
            required
            maxLength="20"
            minLength="2"
          />
        </div>
        <button className="form__submit-button" type="submit">
          Inicia sesión
        </button>
        <div className="form__link-container">
          <p>¿Aún no eres miembro? </p>
          <Link to="/signup" className="form__link">
            <p className="login__signup-link"> Regístrate aquí</p>
          </Link>
        </div>
      </form>
    </>
  );
}
