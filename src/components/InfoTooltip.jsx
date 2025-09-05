import CheckIcon from "../images/Check_Icon.svg";
import ErrorIcon from "../images/Error_Icon.svg";
import "./InfoTooltip.css";

export default function InfoTooltip({ registerStatus }) {
  const image = registerStatus ? CheckIcon : ErrorIcon;
  const message = registerStatus
    ? "Te has registrado correctamente!"
    : "Oops, algo salió mal. Por favor, inténtalo de nuevo.";

  return (
    <div style={{ textAlign: "center" }}>
      <img src={image} alt={message} className="popup__image" />
      <h2 className="popup__message">{message}</h2>
    </div>
  );
}
