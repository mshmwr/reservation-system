import React from "react";
import "./Button.css";
export const Button = ({ text, clickEvent }) => {
  return (
    <button className={`btn`} onClick={clickEvent}>
      {text}
    </button>
  );
};
