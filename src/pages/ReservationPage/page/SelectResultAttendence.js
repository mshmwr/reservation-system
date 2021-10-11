import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useOrderAction from "../../../action/features/orderAction";
import useReservationAction from "../../../action/features/reservationAction";

import { reservedSelectItemStyle } from "../../../css/sharedStyle"

const MySelectResultAttendence = ({ className }) => {
    //i18n
    const { t } = useTranslation();
    const dataListItems = t("reservationPage.selectStep.listItems", {
        returnObjects: true,
    });
    const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]

    //redux
    const step = useSelector((state) => state.reservationReducer.step);
    const attendenceData = useSelector(
        (state) => state.orderReducer.attendenceData
    );
    const { setAttendenceData } = useOrderAction();
    const { checkReselect } = useReservationAction();


    const handleAttendenceChange = (e) => {
        switch (step) {
            case steps[1]:
                if (!checkReselect()) { //at the fillIn step
                    e.target.value = attendenceData.attendence;
                    // backClick(step);
                    return;
                }

                break;
            default:
                break;
        }

        if (Number.isNaN(parseInt(e.target.value, 10))) {
            alert(
                t("reservationPage.selectStep.errorMessage.pleaseChoose") +
                t("reservationPage.selectStep.errorMessage.attendence")
            ); //請選擇人數
            setAttendenceData({});
            return;
        }
        setAttendenceData({ attendence: e.target.value });
    };
    return <div className={`${className} resultBlock__select`}>
        {dataListItems.filter(item => Array.isArray(item.content) === true).map((item) => {
            //option list
            return (
                <select
                    onChange={handleAttendenceChange}
                    key={`attendenceResult${item.label}`}
                    className="resultBlock__select__item resultBlock__select__select"
                    value={attendenceData.attendence === undefined ? "" : attendenceData.attendence}
                >
                    {
                        item.content.map((text) => (
                            <option key={text}>{text}</option>
                        ))
                    }
                </select>
            );
        })}
    </div >
}


const SelectResultAttendence = styled(MySelectResultAttendence)`
    ${reservedSelectItemStyle}
`;

export default SelectResultAttendence;