import React, { useEffect } from "react";
import { Board } from "../../../components/features/Board";
import "./SelectRegion.css";
import { TODAY_DATE } from "../../../utils/Date";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useOrderAction from "../../../action/features/orderAction";
import useBoardAction from "../../../action/features/boardAction";
import useReservationAction from "../../../action/features/reservationAction";
import { FillInRegin } from "./FillInRegion";
import SelectResultTimeLine from "./SelectResultTimeLine";
import SelectResultAttendence from "./SelectResultAttendence";
import FinishResult from "./FinishResult";

export const SelectRegion = () => {
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]

  //redux
  const { setAttendenceData, setPlanData } = useOrderAction();
  const { setBoardCalendarDate, setBoardRefresh } = useBoardAction();
  const { checkReselect } = useReservationAction();
  const step = useSelector((state) => state.reservationReducer.step);
  const calendarDate = useSelector((state) => state.boardReducer.calendarDate);

  const handleDateChange = (e) => {
    switch (step) {
      case steps[1]:
        if (!checkReselect()) {
          //at the fillIn step
          e.target.value = calendarDate;
          return;
        }
        break;
      default:
        break;
    }

    setBoardCalendarDate(e.target.value);
    setBoardRefresh(true);
    setPlanData({});
  };

  useEffect(() => {
    setBoardCalendarDate(TODAY_DATE);
    setBoardRefresh(false);
    setAttendenceData({});
    setPlanData({});
  }, []);

  return (
    <div className="reservation__content__selectStep">
      <div className="reservation__content__selectStep__calendarBlock">
        <Board />
      </div>

      <div className="reservation__content__selectStep__resultBlock">
        {step !== steps[2] ? (
          <>
            <input
              onChange={handleDateChange}
              type="date"
              className="calendarBlock__day"
              min={TODAY_DATE}
              value={calendarDate === undefined ? TODAY_DATE : calendarDate}
            ></input>

            <SelectResultTimeLine />
            <SelectResultAttendence />
          </>
        ) : (
          <>
            <FinishResult />
          </>
        )}
        {step === steps[1] && <FillInRegin />}
      </div>
    </div>
  );
};
