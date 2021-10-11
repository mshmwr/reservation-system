import React, { useState, useEffect } from "react";
import { getReservedData, patchReservedData } from "../../apis/reservedDataApi";
import { TODAY_DATE } from "../../utils/Date";
import CloseIcon from "../ui/CloseIcon";
import { useTranslation } from "react-i18next";

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

export const CalendarOrderDialog = ({
  isShow,
  orderId,
  closeClickHandler,
  setNeedRefreshPage,
  currentOrderIsConflicted,
  selectedDate,
}) => {
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState(null);
  const [orderStatusButton, setOrderStatusButton] = useState(null);
  const [originOrderStatusButton, setOriginOrderStatusButton] = useState(null);
  let selectedOrderStatusButton = orderStatusButton;
  const fetchData = async () => {
    const fetchedData = await getReservedData(undefined, orderId, undefined); //only one record
    if (fetchedData === null) {
      return;
    }
    const resultData = fetchedData.result;
    if (resultData.length === 0) {
      // console.log("fetch data is empty array");
    } else {
      setOrderStatusButton(resultData[0].order_status);
      setOriginOrderStatusButton(resultData[0].order_status);
    }

    setOrderData(resultData);
  };
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
      const msg = `${t("apiResponse.reservationData.patchFailed")}\n${parsedData.message
        }`;
      alert(msg);
    }
    closeClickHandler();
    setNeedRefreshPage(true);
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
  const checkConfirmButtonIsDisable = (orderStatus, option) => {
    if (orderStatus === option) {
      return true; //不能按
    }
    return false;
  };

  useEffect(async () => {
    fetchData();
  }, [orderId, selectedDate]);

  if (isShow) {
    return (
      <div className="dialog">
        <div className="dialog__dialogMask" />
        <div className="dialog__dialogContent">
          <CloseIcon clickHandler={closeClickHandler} />
          {orderData === null || orderData.length === 0
            ? "no reserved"
            : orderData.map((item) => (
              <div key={item.order_id} className="calendar__dialog__table">
                {t("orderTableList", { returnObjects: true }).map((data) => (
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
                              className={`btn board__buttons__button ${orderStatusButton === option
                                ? "board__buttons__button--selected"
                                : ""
                                } 
                                ${originOrderStatusButton === option
                                  ? "common__font--bold board__buttons__button--primary"
                                  : ""
                                }
                                ${checkOrderStatusButtonIsDisable(
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
                              disabled={`${checkOrderStatusButtonIsDisable(
                                orderStatusButton,
                                option,
                                currentOrderIsConflicted,
                                originOrderStatusButton,
                                item.date
                              )
                                ? "disabled"
                                : ""
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
                          type="button"
                          className={`btn dialog__confirmButton
                            ${checkConfirmButtonIsDisable(
                            orderStatusButton,
                            originOrderStatusButton
                          )
                              ? "dialog__confirmButton--disabled"
                              : ""
                            }
                            
                            `}
                          onClick={orderStatusConfirmButtonClickHandler}
                          disabled={`${checkConfirmButtonIsDisable(
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
