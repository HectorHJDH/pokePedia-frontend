import React from "react";
import "./Popup.css";

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" type="button" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Popup;
