import React from "react";
import "./CloseIcon.css";
const CloseIcon = ({ clickHandler }) => {
  return (
    <div className="closeIcon" onClick={clickHandler}>
      <div className="closeIcon__close" />
    </div>
  );
};
export default CloseIcon;
