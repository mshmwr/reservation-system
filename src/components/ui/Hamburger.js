import React from "react";
import "./Hamburger.css";
const Hamburger = ({ isShowItem, clickHandler }) => {
  return (
    <div className="hamburgerIcon" onClick={clickHandler}>
      <div
        className={
          isShowItem
            ? "hamburgerIcon__hamburger--open"
            : "hamburgerIcon__hamburger--normal"
        }
      />
    </div>
  );
};
export default Hamburger;
