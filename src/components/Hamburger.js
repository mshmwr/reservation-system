import React from "react";
import "./Hamburger.css";
const Hamburger = ({ clickHandler }) => {
  return (
    <div className="closeIcon" onClick={clickHandler}>
      <div className="closeIcon__hamburger" />
    </div>
  );
};
export default Hamburger;
