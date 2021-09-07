import React, { useEffect } from "react";
import { Board } from "../../../components/Board";
import Button from "../../../components/Button";
import "./SelectRegion.css";
import { TODAY_DATE } from "../../../utils/Date";
import { useSelector } from "react-redux";
import useOrderAction from "../../../action/orderAction";
import useBoardAction from "../../../action/boardAction";

export const SelectRegion = ({
  backClick,
  nextClick,
  nextButtonText,
  backButtonText,
  dataListItems,
  setSelectedData,
}) => {
  const { setAttendenceData, setPlanData } = useOrderAction();
  const {
    setBoardCalendarDate,
    setBoardSelectedRoom,
    setBoardRefresh,
    setBoardIsReadOnly,
  } = useBoardAction();

  const planData = useSelector((state) => state.orderReducer.planData);
  const attendenceData = useSelector(
    (state) => state.orderReducer.attendenceData
  );
  const dateData = useSelector((state) => state.orderReducer.dateData);

  const next = () => {
    console.log({ ...planData, ...attendenceData, date: dateData });
    if (!checkCanNext()) {
      return;
    }
    setSelectedData({ ...planData, ...attendenceData, date: dateData });
    nextClick();
  };
  const handleDateChange = (e) => {
    setBoardCalendarDate(e.target.value);

    setBoardRefresh(true);
  };
  const handleAttendenceChange = (e) => {
    if (Number.isNaN(parseInt(e.target.value, 10))) {
      alert("請選擇人數");
      setAttendenceData({});
      return;
    }
    setAttendenceData({ attendence: e.target.value });
  };
  const checkCanNext = () => {
    let alertStr = "請選擇";
    let canNext = true;
    if (Object.keys(planData).length === 0) {
      alertStr += "預約時間";
      canNext = false;
    }
    if (JSON.stringify(attendenceData) === "{}") {
      if (!canNext) {
        alertStr += "、";
      }
      alertStr += "人數";
      canNext = false;
    }

    if (!canNext) {
      alert(alertStr);
    }

    return canNext;
  };

  useEffect(() => {
    setBoardSelectedRoom("");
    setBoardCalendarDate(TODAY_DATE);
    setBoardIsReadOnly(false);
    setBoardRefresh(false);
    setAttendenceData({});
    setPlanData({});
  }, []);

  return (
    <div className="reservation__content__selectStep">
      <div className="reservation__content__selectStep__calendarBlock">
        <input
          onChange={handleDateChange}
          type="date"
          className="calendarBlock__day"
          defaultValue={TODAY_DATE}
          min={TODAY_DATE}
        ></input>
        <Board />
      </div>

      <div className="reservation__content__selectStep__resultBlock">
        <div className="resultBlock__select">
          {dataListItems.map((item) => {
            if (Array.isArray(item.content)) {
              //option list
              return (
                <select
                  onChange={handleAttendenceChange}
                  key={`item${item.label}`}
                  className="resultBlock__select__item "
                >
                  {item.content.map((text) => (
                    <option key={text}>{text}</option>
                  ))}
                </select>
              );
            } else {
              //draw div
              return (
                <div
                  key={`item${item.label}`}
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
            }
          })}
        </div>
        <div className="resultBlock__buttonGroup common__buttonGroup">
          {backButtonText !== undefined && (
            <Button text={backButtonText} clickEvent={backClick}></Button>
          )}
          {nextButtonText !== undefined && (
            <Button text={nextButtonText} clickEvent={next}></Button>
          )}
        </div>
      </div>
    </div>
  );
};
