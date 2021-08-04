import React from "react";
import "./Button.css";
const Button = ({ text, clickEvent, isDisable = false, id }) => {
  return (
    <button
      id={id}
      className={`btn`}
      onClick={clickEvent}
      disabled={isDisable ? "disabled" : ""}
    >
      {text}
    </button>
  );
};
export default Button;
