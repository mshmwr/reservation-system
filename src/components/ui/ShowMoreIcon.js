import React from "react";
import { getSVGURI } from "../../utils/Utils";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MyShowMoreIcon = ({ className, clickHandler }) => {
  return (
    <div className={`${className} showMoreIcon`} onClick={clickHandler}>
      <div className="showMoreIcon__mask" />
      <div className="showMoreIcon__icon" />
    </div>
  );
};

//className: showMoreIcon
const ShowMoreIcon = styled(MyShowMoreIcon)`
  position: absolute;
  z-index: var(--zIndex-managementWindow);
  width: 100%;
  height: 100%;
  cursor: pointer;
  .showMoreIcon__mask {
    width: 100%;
    height: 100%;
    background-color: var(--main-normal);
    opacity: 0;
  }

  .showMoreIcon__icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-image: url(${getSVGURI(faEllipsisH, "#77613b")});
    background-position: center;
    background-size: cover;
  }

  &:hover {
  }
`;

export default ShowMoreIcon;
