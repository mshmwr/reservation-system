import React from "react";
import { getSVGURI } from "../../utils/Utils"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";




const MyShowMoreIcon = ({ className, clickHandler }) => {
  return (
    <div className={`${className} showMoreIcon`} onClick={clickHandler} >
      <div className="showMoreIcon__icon" />
    </div>
  );
};

//className: showMoreIcon
const ShowMoreIcon = styled(MyShowMoreIcon)`
  position: relative;
  z-index: var(--zIndex-managementWindow);
  width: calc(var(--menu-item-height));
  height: calc(var(--menu-item-height));
  cursor: pointer;
  background-color: var(--main-dark);
  border-radius:5px;
  &:hover{
    background-color: var(--dark);
  }

  .showMoreIcon__icon{
    width:100%;
    height:100%;
    transform: scale(0.8);
    background-image: url(${getSVGURI(faEllipsisH, "#FFFFFF")});
    background-position: center;
    background-size: cover;

  }

`

export default ShowMoreIcon;
