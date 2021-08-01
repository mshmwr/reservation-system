import React, { useState } from "react";
import { Board } from "../../../components/Board";
import { Button } from "../../../components/Button";
import "./SelectRegion.css";

export const SelectRegion = ({
  backClick,
  nextClick,
  nextButtonText,
  backButtonText,
  dataListItems,
  setSelectedData,
}) => {
  const [planData, setPlanData] = useState({});
  const [dateData, setDateData] = useState(TODAY_DATE);
  const [attendenceData, setAttendenceData] = useState({});

  const next = () => {
    if (!checkCanNext()) {
      return;
    }
    setSelectedData({ ...planData, ...attendenceData, date: dateData });
    nextClick();
  };
  const handleDateChange = (e) => {
    setDateData(e.target.value);
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
        <Board
          setPlanData={setPlanData}
          calendarDate={dateData}
          isReadOnly={false}
        ></Board>
      </div>

      <div className="reservation__content__selectStep__resultBlock">
        <div className="resultBlock__select">
          {dataListItems.map((item) => {
            if (Array.isArray(item.content)) {
              //option list
              return (
                <select
                  onChange={handleAttendenceChange}
                  key={`item${item}`}
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
                <div key={`item${item}`} className="resultBlock__select__item">
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
          {backButtonText === undefined ? null : (
            <Button text={backButtonText} clickEvent={backClick}></Button>
          )}
          {nextButtonText === undefined ? null : (
            <Button text={nextButtonText} clickEvent={next}></Button>
          )}
        </div>
      </div>
    </div>
  );
};

const TODAY_DATE = (() => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const today = localISOTime.slice(0, 10);
  return today;
})();
