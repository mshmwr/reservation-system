import React, { useState, useEffect } from "react";
import { getReservedData } from "../../apis/reservedDataApi";
import CloseIcon from "../ui/CloseIcon";
import { useTranslation } from "react-i18next";
import CalendarOrderDialogButtons from "./CalendarOrderDialogButtons";
import Loader from "../ui/Loader";
import styled from "styled-components";

const MyCalendarOrderDialog = ({
  className,
  orderId,
  closeClickHandler,
  currentOrderIsConflicted,
  selectedDate,
}) => {
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState(null);
  const [originOrderStatusButton, setOriginOrderStatusButton] = useState(null);
  const [orderStatusButton, setOrderStatusButton] = useState(null);

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

  useEffect(async () => {
    fetchData();
  }, [orderId, selectedDate]);

  return (
    <div className={`${className} dialog`}>
      <div className="dialog__dialogMask" />
      <div className="dialog__dialogContent">
        <CloseIcon clickHandler={closeClickHandler} />
        {orderData === null ? (
          <Loader />
        ) : orderData.length === 0 ? (
          "no reserved"
        ) : (
          orderData.map((item) => (
            <div key={item.order_id} className="dialog__dialogContent__table">
              {t("orderTableList", { returnObjects: true }).map((data) => (
                <div
                  key={data.key}
                  className="dialog__dialogContent__table__item"
                >
                  <p className="dialog__dialogContent__table__item__label">
                    {data.label}
                  </p>

                  {data.options === undefined ? (
                    <p className="dialog__dialogContent__table__item__value">
                      {item[data.key]}
                    </p>
                  ) : (
                    <CalendarOrderDialogButtons
                      item={item}
                      data={data}
                      orderData={orderData}
                      currentOrderIsConflicted={currentOrderIsConflicted}
                      originOrderStatusButton={originOrderStatusButton}
                      orderStatusButton={orderStatusButton}
                      setOrderStatusButton={setOrderStatusButton}
                    />
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CalendarOrderDialog = styled(MyCalendarOrderDialog)`
  .dialog__dialogMask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: var(--black);
    opacity: 0.15;
    z-index: var(--zIndex-dialog);
  }

  .dialog__dialogContent {
    --dialog-width: 95%;
    --dialog-height: 85%;
    background-color: var(--white);
    position: fixed;
    width: var(--dialog-width);
    height: var(--dialog-height);
    left: calc((100% - var(--dialog-width)) / 2);
    top: calc((100% - var(--dialog-height)) / 2);
    z-index: var(--zIndex-dialogBox);
    border-radius: var(--border-radius-15);
    border: 1px solid var(--main-dark);
  }
  .dialog__icon {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 20px;
    top: 20px;
    cursor: pointer;
    border: 1px solid var(--main-normal);
  }

  .dialog__icon img {
    position: absolute;
    top: 7px;
    left: 7px;
    content: url("../../img/icon_close.png");
  }

  .dialog__dialogContent__table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    overflow: auto;
  }
  .dialog__dialogContent__table__item {
    display: flex;
    margin: 0.5rem;
    width: 30%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog__dialogContent__table__item__label {
    min-height: 2rem;
    word-wrap: break-word;
  }

  .dialog__dialogContent__table__item__value {
    min-height: 2rem;
    word-break: break-all;
  }

  .dialog__confirmButton {
    width: 50%;
    padding: 0.3rem 0.1rem;
    margin: 0.4rem 0px 0px auto;
    min-width: auto;
    background-color: var(--main-bg);
    font-size: initial;
  }
  .dialog__confirmButton--disabled {
    background-color: var(--main-bg);
    color: var(--main-gray);
    cursor: auto;
  }

  .dialog__confirmButton--disabled:hover {
    background-color: var(--main-bg);
  }

  @media screen and (max-width: 1000px) {
    .dialog__dialogContent__table__item {
      width: 80%;
      padding: 1.5rem;
      border-bottom: 1px solid var(--main-light);
    }
  }

  @media screen and (max-width: 600px) {
    .board__buttons {
      width: 80%;
    }

    .board__buttons__button {
      padding: 1rem 0.1rem;
      margin: 0.5rem 0px;
    }
  }
`;

export default CalendarOrderDialog;
