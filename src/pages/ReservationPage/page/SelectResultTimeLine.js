import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { reservedSelectItemStyle } from "../../../css/sharedStyle"

const MySelectResultTimeLine = ({ className }) => {
    //i18n
    const { t } = useTranslation();
    const dataListItems = t("reservationPage.selectStep.listItems", {
        returnObjects: true,
    });

    //redux
    const planData = useSelector((state) => state.orderReducer.planData);


    return <div className={`${className} resultBlock__select`}>
        {dataListItems.filter(item => Array.isArray(item.content) === false).map((item) => {
            return (
                <div
                    key={`timelineResult${item.label}`}
                    className="resultBlock__select__item"
                >
                    <div className="resultBlock__select__item__label">
                        {item.label}
                    </div>
                    <div className="resultBlock__select__item__content">
                        {planData === {} ? "" : planData[item.name]}
                    </div>
                </div>
            );
        })}
    </div>
}



const SelectResultTimeLine = styled(MySelectResultTimeLine)`
    ${reservedSelectItemStyle}
    
`;

export default SelectResultTimeLine;