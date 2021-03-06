import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { reservedSelectItemStyle } from "../../../css/sharedStyle"

const MyFinishResult = ({ className }) => {
    //i18n
    const { t } = useTranslation();
    const planItems = t("reservationPage.fillInStep.planItems", {
        returnObjects: true,
    });
    //redux
    const selectedData = useSelector(
        (state) => state.reservationReducer.selectedData
    );
    const userInfoForm = t("reservationPage.userinfoform", {
        returnObjects: true,
    });
    const userInfoValue = useSelector(
        (state) => state.reservationReducer.userInfoValue
    );

    return <div className={`${className} resultBlock__select`}>
        {planItems.map((item) => (
            <div
                key={`timelineResult${item.title}`}
                className="resultBlock__select__item"
            >
                <div className="resultBlock__select__item__label">{item.title}</div>
                <div className="resultBlock__select__item__content">
                    {selectedData[item.name]}
                </div>
            </div>
        ))}
        {
            userInfoForm.map((info) => (
                <div
                    key={`timelineResult${info}`}
                    className="resultBlock__select__item"
                >
                    <div className="resultBlock__select__item__label">
                        {info.label}
                    </div>
                    <div className="resultBlock__select__item__value">
                        {userInfoValue[info.name]}
                    </div>
                </div>
            ))
        }
    </div>
}


const FinishResult = styled(MyFinishResult)`
    ${reservedSelectItemStyle}  
    .resultBlock__select__item:last-child {
        margin-bottom: 0;
    }
`;

export default FinishResult;