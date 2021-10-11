import React, { useState } from "react";
import Button from "../ui/Button";
import "./Calendar.css";
import { CalendarDateReservedData } from "./CalendarDateReservedData";
import { CalendarOrderDialog } from "./CalandarOrderDialog";
import DirectionButton from "../ui/DirectionButton";

const daysShortArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNamesArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getDate()}-${today.getMonth() + 1
    }-${today.getFullYear()}`; //2021-07-25
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0]; // Sunday - Saturday : 0 - 6
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ); //2021-07-31
  const prevMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  ); //2021-06-30
  const daysInMonth = selectedMonthLastDate.getDate(); //31
  const firstDayInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay(); // Sunday - Saturday : 0 - 6
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint =
    prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if (i === 1) {
        if (j < startingPoint) {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: "calendar__dates__prevMonth",
              date: `${prevMonthStartingPoint}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()
                }-${selectedDate.getMonth() === 0
                  ? selectedDate.getFullYear() - 1
                  : selectedDate.getFullYear()
                }`,
              value: prevMonthStartingPoint,
            },
          ];
          prevMonthStartingPoint++;
        } else {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: "",
              date: `${currentMonthCounter}-${selectedDate.getMonth() + 1
                }-${selectedDate.getFullYear()}`,
              value: currentMonthCounter,
            },
          ];
          currentMonthCounter++;
        }
      } else if (i > 1 && currentMonthCounter < daysInMonth + 1) {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: "",
            date: `${currentMonthCounter}-${selectedDate.getMonth() + 1
              }-${selectedDate.getFullYear()}`,
            value: currentMonthCounter,
          },
        ];
        currentMonthCounter++;
      } else {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: "calendar__dates__nextMonth",
            date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13
              ? 1
              : selectedDate.getMonth() + 2
              }-${selectedDate.getMonth() + 2 === 13
                ? selectedDate.getFullYear() + 1
                : selectedDate.getFullYear()
              }`,
            value: nextMonthCounter,
          },
        ];
        nextMonthCounter++;
      }
    }
  }
  const getPrevMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    );
  };
  const getNextMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    );
  };

  return {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
  };
};

const reverseDate = (date) => {
  let dates = date
    .split("-")
    .reverse()
    .map((num) => num.padStart(2, "0")); //十位數補零
  return dates.join("-");
};

const Calendar = ({
  needRefreshPage,
  setNeedRefreshPage,
  selectedRoom = "",
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
    <div className="calendar">
      <CalendarOrderDialog
        isShow={showDialog}
        orderId={orderId}
        closeClickHandler={closeClickHandler}
        setNeedRefreshPage={setNeedRefreshPage}
        currentOrderIsConflicted={currentOrderIsConflicted}
        managementSelectedDate={managementSelectedDate}
      />
      <div className="calendar__month">
        <DirectionButton clickEvent={getPrevMonth} direction="left" />
        {/* <Button text="prev" clickEvent={getPrevMonth} /> */}
        <p className="common__subtitle common__font--bold">
          {`${monthNames[selectedDate.getMonth()]
            }-${selectedDate.getFullYear()}`}
        </p>
        <DirectionButton clickEvent={getNextMonth} direction="right" />
        {/* <Button text="next" clickEvent={getNextMonth} /> */}
      </div>
      <div className="calendar__dates">
        {daysShort.map((day) => (
          <div
            key={day}
            className={`calendar__dates__days calendar__dates__item common__font--bold common__subtitle`}
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
                <div className="common__font--bold common__heading">
                  <div className="calendar__dates__date__number calendar__dates__today">
                    {col.value}
                  </div>
                </div>

                <CalendarDateReservedData
                  columnDate={reverseDate(col.date)}
                  needRefreshPage={needRefreshPage}
                  setNeedRefreshPage={setNeedRefreshPage}
                  dateClickHandler={dateClickHandler}
                  selectedRoom={selectedRoom}
                  setManagementSelectedDate={setManagementSelectedDate}
                />
              </div>
            ) : (
              <div
                key={col.date}
                className={`${col.classes} calendar__dates__date calendar__dates__item`}
              >
                <div className="calendar__dates__date__number common__font--bold common__heading">
                  {col.value}
                </div>

                <CalendarDateReservedData
                  columnDate={reverseDate(col.date)}
                  needRefreshPage={needRefreshPage}
                  setNeedRefreshPage={setNeedRefreshPage}
                  dateClickHandler={dateClickHandler}
                  selectedRoom={selectedRoom}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Calendar;
