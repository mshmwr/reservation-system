import React from "react";
import styled from "styled-components";
import { getSVGURI } from "../../utils/Utils"
import { faCaretRight, faCaretLeft, faCheck } from "@fortawesome/free-solid-svg-icons";



const getScale = (props) => {
    if (props.direction === "check") {
        return 0.8; //the check is out of range
    }
    return 1;

}

const getDirectionSVG = (props) => {
    const iconColor = "#d9c6a4";
    if (props.direction === "right") {
        return getSVGURI(faCaretRight, iconColor);
    }
    if (props.direction === "check") {
        return getSVGURI(faCheck, iconColor);
    }
    return getSVGURI(faCaretLeft, iconColor);

}

const getMarginLeft = (props) => {
    if (props.direction === "right") {
        return "2.5px"
    }
    if (props.direction === "check") {
        return "0px";
    }
    return "-2.5px";

}

const MyDirectionButton = ({ className, clickEvent }) => {
    return <div className={`${className} directionButton`} onClick={clickEvent}>
        <div className="directionButton__icon" />
    </div>
}


const DirectionButton = styled(MyDirectionButton)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--main-dark);
    cursor: pointer;
    &:hover{
        background-color: var(--dark);

    }
    .directionButton__icon{
        width: 100%;
        height: 100%;
        background-image: url(${getDirectionSVG});
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: ${getMarginLeft};
    
        transform: scale(${getScale});
    }
`



export default DirectionButton;