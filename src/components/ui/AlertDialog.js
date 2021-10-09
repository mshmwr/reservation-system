import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useSelector } from "react-redux";

const enter = keyframes`
    0% {opacity: 0;visibility:visible;}
    25% {opacity: 1;}
    75% {opacity: 1;}
    100% {opacity: 0;visibility:hidden;}
`;

const update = keyframes`
    0% {opacity: 0;visibility:visible;}
    25% {opacity: 1;visibility:visible;}
    75% {opacity: 1;}
    100% {opacity: 0;visibility:hidden;}
`;

const show = (props) => {
    return props.isFirst ? "" :
        props.toggle
            ? css`
${update} 2s linear forwards
`
            : css`
${enter} 2s linear forwards
`
}


const Dialog = styled.div`
    --dialogWidth: 250px;
    --dialogHeight: 250px;
    position: fixed;
    width: ${props => props.width};
    height: ${props => props.height};
    color: var(--dark);
    background-color: var(--main-light);
    top: calc(50% - var(--dialogWidth) / 2);
    left: calc(50% - var(--dialogHeight) / 2);
    border-radius: calc(var(--border-radius) * 4);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    animation: ${show};
`


const AlertDialog = () => {
    const width = useSelector(
        (state) => state.dialogReducer.dialogWidth
    )
    const height = useSelector(
        (state) => state.dialogReducer.dialogHeight
    )
    const text = useSelector(
        (state) => state.dialogReducer.dialogText
    )
    const dialogToggle = useSelector(
        (state) => state.dialogReducer.dialogToggle
    )

    return <Dialog width={width} height={height} toggle={dialogToggle} isFirst={false}>{text}</Dialog>;
}



export default AlertDialog;