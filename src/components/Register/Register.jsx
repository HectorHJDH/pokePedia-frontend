import { Link } from "react-router-dom";
import { useState } from "react";
import PokemonLogo from "../../images/PokePedia-Logo.png";
// import Popup from "../Popup/Popup";

export default function Register({ onRegister /* popup, onClosePopup*/ }) {
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

    onRegister(data);
  };

  return (
    <>
      <form name="register-form" className="form" onSubmit={handleSubmit}>
        <img src={PokemonLogo} alt="PokePedia Logo" className="form__logo" />
        <h1 className="form__title">Regístrate</h1>
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
          Regístrate
        </button>
        <div className="form__link-container">
          <p>¿Ya eres miembro? </p>
          <Link to="/signin" className="form__link">
            <p className="login__signup-link"> Inicia sesión aquí</p>
          </Link>
        </div>
      </form>
    </>
  );
}
