import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TODAY_DATE } from "../../utils/Date";
import useBoardAction from "../../action/features/boardAction";
import { patchReservedData } from "../../apis/reservedDataApi";

const dateMultiple = [1000, 100, 1];

const checkDateIsEarlyThanToday = (date, today) => {
  let dateNum = 0;
  let todayNum = 0;
  const dateArr = date.split("-");
  dateArr.forEach((num, index) => {
    dateNum += num * dateMultiple[index];
  });

  const todayArr = today.split("-");
  todayArr.forEach((num, index) => {
    todayNum += num * dateMultiple[index];
  });
  return dateNum < todayNum;
};

const checkOrderStatusButtonIsDisable = (
  orderStatus,
  option,
  orderIsConflicted,
  originOrderStatusButton,
  clickDate
) => {
  if (checkDateIsEarlyThanToday(clickDate, TODAY_DATE)) {
    return true; //不能按
  }
  if (originOrderStatusButton === "canceled") {
    return true; //不能按
  }
  if (orderIsConflicted && option === "reserved") {
    return true; //不能按
  }
  if (orderStatus === option) {
    return true; //不能按
  }
  return false;
};

const MyCalendarOrderDialogButtons = ({
  className,
  item,
  data,
  orderId,
  orderData,
  orderStatusButton,
  currentOrderIsConflicted,
  originOrderStatusButton,
  setOrderStatusButton,
  closeClickHandler,
}) => {
  const { t } = useTranslation();
  //redux
  const { setBoardRefresh } = useBoardAction();

  let selectedOrderStatusButton = orderStatusButton;
  const changeOrderStatusClickHandler = (e, option) => {
    setOrderStatusButton(e.target.id);
    selectedOrderStatusButton = option;
  };
  const orderStatusConfirmButtonClickHandler = async () => {
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
    const parsedData = await patchReservedData(patchData);
    if (parsedData.status === "error") {
      const msg = `${t("apiResponse.reservationData.patchFailed")}\n${
        parsedData.message
      }`;
      alert(msg);
    }
    closeClickHandler();
    setBoardRefresh(true);
  };

  const checkConfirmButtonIsDisable = (orderStatus, option) => {
    if (orderStatus === option) {
      return true; //不能按
    }
    return false;
  };

  return (
    <div className={`${className} board__buttons"`}>
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
              }
              ${
                checkOrderStatusButtonIsDisable(
                  orderStatusButton,
                  option,
                  currentOrderIsConflicted,
                  originOrderStatusButton,
                  item.date
                )
                  ? "board__buttons__button--disabled"
                  : ""
              }
              `}
            disabled={`${
              checkOrderStatusButtonIsDisable(
                orderStatusButton,
                option,
                currentOrderIsConflicted,
                originOrderStatusButton,
                item.date
              )
                ? "disabled"
                : ""
            }`}
            onClick={(e) => changeOrderStatusClickHandler(e, option)}
          >
            {option}
          </button>
        );
      })}
      <button
        type="button"
        className={`btn board__buttons__confirmButton
          ${
            checkConfirmButtonIsDisable(
              orderStatusButton,
              originOrderStatusButton
            )
              ? "board__buttons__confirmButton--disabled"
              : "board__buttons__confirmButton--enable"
          }
          
          `}
        onClick={orderStatusConfirmButtonClickHandler}
        disabled={`${
          checkConfirmButtonIsDisable(
            orderStatusButton,
            orderData[0].order_status
          )
            ? "disabled"
            : ""
        }`}
      >
        {t("managementPage.dialog.confirmButton")}
      </button>
    </div>
  );
};

//className: board__buttons
const CalendarOrderDialogButtons = styled(MyCalendarOrderDialogButtons)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .board__buttons__button {
    box-sizing: border-box;
    padding: 0.3rem 0.1rem;
    margin: 0.2rem 0px;

    background-color: var(--main-light);
    font-size: initial;
    color: var(--heavy-gray);
  }

  .board__buttons__button--selected {
    background-color: var(--main-normal);
    color: var(--black);
  }

  .board__buttons__button--selected:hover {
    background-color: var(--main-normal);
  }
  .board__buttons__button--primary {
    font-size: var(--text-font-size);
  }
  .board__buttons__button--disabled {
    cursor: auto;
  }

  .board__buttons__confirmButton {
    width: 50%;
    padding: 0.3rem 0.1rem;
    margin: 0.4rem 0px 0px auto;
    min-width: auto;
    background-color: var(--main-bg);
    font-size: initial;
  }

  .board__buttons__confirmButton--disabled {
    background-color: var(--main-bg);
    color: var(--main-gray);
    cursor: auto;
  }
  .board__buttons__confirmButton--enable {
    color: var(--dark);
  }
  .board__buttons__confirmButton--enable:hover {
    background-color: var(--main-normal);
  }

  @media screen and (max-width: 600px) {
    width: 80%;

    .board__buttons__button {
      padding: 1rem 0.1rem;
      margin: 0.5rem 0px;
    }
  }
`;

export default CalendarOrderDialogButtons;
