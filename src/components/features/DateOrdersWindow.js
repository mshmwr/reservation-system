import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CloseIcon from "../ui/CloseIcon";
import useDateOrderAction from "../../action/ui/dateOrderAction";
import { CalendarDateReservedData } from "./CalendarDateReservedData"

const MyDateOrdersWindow = ({ className, dateClickHandler, selectedRoom }) => {
    //i18n
    const { t } = useTranslation();

    //redux
    const { setShowDateOrderWindow } = useDateOrderAction();
    const selectedDate = useSelector((state) => state.dateOrdersReducer.selectedDate);
    const showDateOrderWindow = useSelector((state) => state.dateOrdersReducer.showDateOrderWindow);

    //functions
    const closeWindowClickHandler = () => {
        setShowDateOrderWindow(false);
    };


    return <div className={`${className} orderResultWindow`}>
        <CloseIcon clickHandler={closeWindowClickHandler} />
        <div className="orderResultWindow__orders">
            <CalendarDateReservedData
                columnDate={selectedDate}
                dateClickHandler={dateClickHandler}
                selectedRoom={selectedRoom}
                isShowAll={showDateOrderWindow}
            />
        </div>
    </div>
}

//className: "orderResultWindow"
const DateOrdersWindow = styled(MyDateOrdersWindow)`
    position: fixed;
    z-index: var(--zIndex-dialog);
    padding: 1rem;
    width: 90%;
    min-height: 200px;
    max-height: 400px;
    overflow-y: scroll;
    right: 20px;
    top: 18%;
    background-color: var(--main-bg);
    border: 1px solid var(--main-normal);
    box-sizing: border-box;
    border-radius: var(--border-radius-15);
.orderResultWindow__orders{
    margin: 0 3rem;
}
    
`

export default DateOrdersWindow;