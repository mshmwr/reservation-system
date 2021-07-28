import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { getReservedData, patchReservedData } from "../apis/reservedDataApi";
import multiLang_CHT from "../data.json";
import "./Calendar.css";

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
  const todayFormatted = `${today.getDate()}-${
    today.getMonth() + 1
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
              date: `${prevMonthStartingPoint}-${
                selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()
              }-${
                selectedDate.getMonth() === 0
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
              date: `${currentMonthCounter}-${
                selectedDate.getMonth() + 1
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
            date: `${currentMonthCounter}-${
              selectedDate.getMonth() + 1
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
            date: `${nextMonthCounter}-${
              selectedDate.getMonth() + 2 === 13
                ? 1
                : selectedDate.getMonth() + 2
            }-${
              selectedDate.getMonth() + 2 === 13
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

const showOrderDialog = (
  isShow,
  orderId,
  closeClickHandler,
  setNeedRefreshPage
) => {
  const [orderData, setOrderData] = useState(null);
  const [orderStatusButton, setOrderStatusButton] = useState(null);
  const [originOrderStatusButton, setOriginOrderStatusButton] = useState(null);
  let selectedOrderStatusButton = orderStatusButton;
  const fetchData = async () => {
    console.log("fetch data Order 有沒有在工作RRR");
    let data = await getReservedData(undefined, orderId);
    if (data.length === 0) {
      console.log("fetch data is empty array");
    } else {
      setOrderStatusButton(data[0].order_status);
      setOriginOrderStatusButton(data[0].order_status);
    }
    setOrderData(data);
  };
  const changeOrderStatusClickHandler = (e, option) => {
    setOrderStatusButton(e.target.id);
    selectedOrderStatusButton = option;
  };
  const sendOrderStatusClickHandler = () => {
    const target_column = "order_status";
    const target_value = selectedOrderStatusButton;
    const order_id = orderId;
    const patchData = {
      data: {
        target_column: target_column,
        target_value: target_value,
        order_id: order_id,
      },
    };
    patchReservedData(patchData);
    closeClickHandler();
    //refresh page (fetch again)
    setNeedRefreshPage(true);
  };
  useEffect(async () => {
    fetchData();
  }, [orderId]);

  if (isShow) {
    return (
      <div className="dialog">
        <div className="dialog__dialogMask" />
        <div className="dialog__dialogContent">
          <div className="dialog__icon" onClick={closeClickHandler}>
            <img />
          </div>
          {/* {console.log(orderData)} */}
          {orderData === null || orderData.length === 0
            ? "no reserved"
            : orderData.map((item) => (
                <div key={item.order_id} className="calendar__dialog__table">
                  {multiLang_CHT.orderTableList.map((data) => (
                    <div
                      key={data.key}
                      className="calendar__dialog__table__item"
                    >
                      <p className="calendar__dialog__table__item__label">
                        {data.label}
                      </p>

                      {data.options === undefined ? (
                        <p className="calendar__dialog__table__item__value">
                          {item[data.key]}
                        </p>
                      ) : (
                        <div className="board__buttons">
                          {data.options.map((option) => {
                            return (
                              <button
                                type="button"
                                key={option}
                                id={option}
                                className={`btn board__buttons__button ${
                                  orderStatusButton === option
                                    ? "board__buttons__button--selected"
                                    : ""
                                } 
                                ${
                                  originOrderStatusButton === option
                                    ? "common__font--bold board__buttons__button--primary"
                                    : ""
                                }`}
                                disabled={`${
                                  orderStatusButton === option ? "disabled" : ""
                                }`}
                                onClick={(e) =>
                                  changeOrderStatusClickHandler(e, option)
                                }
                              >
                                {option}
                              </button>
                            );
                          })}
                          <button
                            className="btn dialog__confirmButton"
                            onClick={sendOrderStatusClickHandler}
                          >
                            {multiLang_CHT.managementPage.dialog.confirmButton}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const showDateReservedData = (
  columnDate,
  needRefreshPage,
  setNeedRefreshPage
) => {
  const [dateData, setDateData] = useState(null);
  const fetchData = async () => {
    let data = await getReservedData(columnDate, undefined);
    if (data.length === 0) {
      console.log("fetch data is empty array");
    }

    setNeedRefreshPage(false);
    setDateData(data);
  };
  useEffect(async () => {
    fetchData();
  }, [needRefreshPage]);

  return (
    <div className="calendar__dates__date__entries">
      {dateData === null || dateData.length === 0
        ? "no reserved"
        : dateData.map((item) => (
            <div
              key={item.order_id}
              className={`calendar__dates__date__entries__col 
              ${
                item.order_status === "applied"
                  ? "calendar__dates__date__entries__col--applied"
                  : item.order_status === "reserved"
                  ? "calendar__dates__date__entries__col--reserved"
                  : "calendar__dates__date__entries__col--canceled"
              }
              
              `}
              id={item.order_id}
            >
              {`${item.room}-${item.start_time}-${item.duration}hr`}
            </div>
          ))}
    </div>
  );
};

const Calendar = () => {
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
  const [needRefreshPage, setNeedRefreshPage] = useState(false);
  const [orderId, setOrderId] = useState("0");
  const dateClickHandler = (e, date) => {
    console.log("dateClickHandler, date=" + date);
    console.log(e.target.id);
    const targetId = e.target.id;
    if (targetId === "") {
      return;
    }
    setShowDialog(true);
    setOrderId(e.target.id);
  };
  const closeClickHandler = () => {
    setShowDialog(false);
    setOrderId("");
  };

  return (
    <div className="calendar">
      {showOrderDialog(
        showDialog,
        orderId,
        closeClickHandler,
        setNeedRefreshPage
      )}
      <div className="calendar__month">
        <Button text="prev" clickEvent={getPrevMonth}></Button>{" "}
        <p className="common__subtitle common__font--bold">
          {`${
            monthNames[selectedDate.getMonth()]
          }-${selectedDate.getFullYear()}`}
        </p>
        <Button text="next" clickEvent={getNextMonth}></Button>
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
                onClick={(e) => dateClickHandler(e, col.date)}
              >
                <div className="common__font--bold common__heading">
                  <div className="calendar__dates__date__number calendar__dates__today">
                    {col.value}
                  </div>
                </div>
                {showDateReservedData(
                  reverseDate(col.date),
                  needRefreshPage,
                  setNeedRefreshPage
                )}
              </div>
            ) : (
              <div
                key={col.date}
                className={`${col.classes} calendar__dates__date calendar__dates__item`}
                onClick={(e) => dateClickHandler(e, col.date)}
              >
                <div className="calendar__dates__date__number common__font--bold common__heading">
                  {col.value}
                </div>
                <div className="calendar__dates__date__entries">
                  {reverseDate(col.date)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Calendar;
