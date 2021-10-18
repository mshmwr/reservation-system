import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "./Calendar.css";
import { CalendarDateReservedData } from "./CalendarDateReservedData";
import CalendarOrderDialog from "./CalendarOrderDialog";
import DirectionButton from "../ui/DirectionButton";
import DateOrdersWindow from "../features/DateOrdersWindow";
import { reverseDate } from "../../utils/Utils";
import { useCalendar } from "../customHook/CalendarFrame";

const MyCalendar = ({
  className,
  setManagementSelectedDate,
  managementSelectedDate,
}) => {
  const {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
  } = useCalendar();
  //redux
  const showDateOrdersWindow = useSelector(
    (state) => state.dateOrdersReducer.showDateOrderWindow
  );

  //variable
  const [showDialog, setShowDialog] = useState(false);
  const [currentOrderIsConflicted, setCurrentOrderIsConflicted] =
    useState(false);
  const [orderId, setOrderId] = useState("");
  const dateClickHandler = (e, isConflicted, managementSelectedDate) => {
    const targetId = e.target.id;
    if (targetId === "") {
      return;
    }
    setShowDialog(true);
    setOrderId(e.target.id);
    setCurrentOrderIsConflicted(isConflicted);
    setManagementSelectedDate(managementSelectedDate);
  };
  const closeClickHandler = () => {
    setShowDialog(false);
    setOrderId("");
  };

  return (
    <>
      {showDialog && (
        <CalendarOrderDialog
          orderId={orderId}
          closeClickHandler={closeClickHandler}
          currentOrderIsConflicted={currentOrderIsConflicted}
          managementSelectedDate={managementSelectedDate}
        />
      )}
      <div className={`${className} calendar`}>
        <div className="calendar__month">
          <DirectionButton clickEvent={getPrevMonth} direction="left" />
          <p className="common__heading common__font--bold">
            {`${
              monthNames[selectedDate.getMonth()]
            }-${selectedDate.getFullYear()}`}
          </p>
          <DirectionButton clickEvent={getNextMonth} direction="right" />
        </div>
        <div className="calendar__dates">
          {daysShort.map((day) => (
            <div
              key={day}
              className={`calendar__dates__days calendar__dates__item common__font--bold common__text`}
            >
              {day}
            </div>
          ))}
          {Object.values(calendarRows).map((cols) =>
            cols.map((col) => {
              return col.date === todayFormatted ? (
                <div
                  key={col.date}
                  className={`${col.classes} calendar__dates__date calendar__dates__item`}
                >
                  <div className="common__font--bold common__text">
                    <div className="calendar__dates__date__number calendar__dates__today">
                      {col.value}
                    </div>
                  </div>

                  <CalendarDateReservedData
                    orderClassName="calendar__dates__date__entries"
                    columnDate={reverseDate(col.date)}
                    dateClickHandler={dateClickHandler}
                  />
                </div>
              ) : (
                <div
                  key={col.date}
                  className={`${col.classes} calendar__dates__date calendar__dates__item`}
                >
                  <div className="calendar__dates__date__number common__font--bold common__text">
                    {col.value}
                  </div>

                  <CalendarDateReservedData
                    orderClassName="calendar__dates__date__entries"
                    columnDate={reverseDate(col.date)}
                    dateClickHandler={dateClickHandler}
                  />
                </div>
              );
            })
          )}
        </div>

        {showDateOrdersWindow && (
          <DateOrdersWindow dateClickHandler={dateClickHandler} />
        )}
      </div>
    </>
  );
};

const Calendar = styled(MyCalendar)`
  width: 100%;
  margin: 0px auto;
  text-align: center;
  position: relative;
  z-index: var(--zIndex-managementCalendar);
`;

export default Calendar;
