import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  faCheck,
  faExclamation,
  faEllipsisH,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { getSVGURI } from "../../utils/Utils";
import CloseIcon from "../ui/CloseIcon";
import useDateOrderAction from "../../action/ui/dateOrderAction";
import { CalendarDateReservedData } from "./CalendarDateReservedData";

const MyDateOrdersWindow = ({ className, dateClickHandler }) => {
  //i18n
  const { t } = useTranslation();

  //redux
  const { setShowDateOrderWindow } = useDateOrderAction();
  const selectedDate = useSelector(
    (state) => state.dateOrdersReducer.selectedDate
  );
  const showDateOrderWindow = useSelector(
    (state) => state.dateOrdersReducer.showDateOrderWindow
  );

  //functions
  const closeWindowClickHandler = () => {
    setShowDateOrderWindow(false);
  };

  return (
    <div className={`${className} orderResultWindow`}>
      <CloseIcon clickHandler={closeWindowClickHandler} />
      <div className="orderResultWindow__orders">
        <CalendarDateReservedData
          orderClassName="orderResultWindow__orders__entries"
          columnDate={selectedDate}
          dateClickHandler={dateClickHandler}
          isShowAll={showDateOrderWindow}
        />
      </div>
    </div>
  );
};

//className: "orderResultWindow"
const DateOrdersWindow = styled(MyDateOrdersWindow)`
  position: fixed;
  z-index: var(--zIndex-dialog);
  padding: 1rem;
  width: 50%;
  right: 25%;
  top: 18%;
  background-color: var(--white);
  border: 1px solid var(--main-dark);
  box-sizing: border-box;
  border-radius: var(--border-radius-15);
  --statusIconWidth: 20px;
  --statusIconHeight: 20px;

  .orderResultWindow__orders {
    margin: 0 3rem;
    overflow-y: auto;
    min-height: 200px;
    max-height: 400px;
  }

  .orderResultWindow__orders__entries {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 0 30px 0 2rem;
  }

  .orderResultWindow__orders__entries__col {
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    overflow-x: hidden;
    height: 2rem;
  }

  .orderResultWindow__orders__entries__col--applied {
    color: var(--main-dark);
  }

  .orderResultWindow__orders__entries__col--applied::before {
    width: var(--statusIconWidth);
    height: var(--statusIconHeight);
    margin-right: 0.5rem;
    content: url(${getSVGURI(faEllipsisH, "#bba278")}); //brown
  }
  .orderResultWindow__orders__entries__col--applied:hover {
    color: var(--dark);
  }

  .orderResultWindow__orders__entries__col--reserved {
    color: var(--light-green);
  }
  .orderResultWindow__orders__entries__col--reserved::before {
    width: var(--statusIconWidth);
    height: var(--statusIconHeight);
    margin-right: 0.5rem;
    content: url(${getSVGURI(faCheck, "#02bd1b")}); //green
  }
  .orderResultWindow__orders__entries__col--reserved:hover {
    color: var(--sea-green);
  }

  .orderResultWindow__orders__entries__col--canceled {
    color: var(--heavy-gray);
  }
  .orderResultWindow__orders__entries__col--canceled::before {
    width: var(--statusIconWidth);
    height: var(--statusIconHeight);
    color: var(--main-normal);
    margin-right: 0.5rem;
    content: url(${getSVGURI(faBan, "#b8b8b8")}); //grey
  }
  .orderResultWindow__orders__entries__col--canceled:hover {
    color: var(--slate-grey);
  }

  .orderResultWindow__orders__entries__col--conflicted {
    color: var(--light-red);
  }
  .orderResultWindow__orders__entries__col--conflicted::before {
    width: var(--statusIconWidth);
    height: var(--statusIconHeight);
    color: var(--main-normal);
    margin-right: 0.5rem;
    content: url(${getSVGURI(faExclamation, "#ff8484")}); //red
    transform: scale(0.3);
    margin-top: -0.5rem;
  }
  .orderResultWindow__orders__entries__col--conflicted:hover {
    color: var(--main-red);
  }

  @media screen and (max-width: 600px) {
    width: 95%;
    right: 2.5%;

    .orderResultWindow__orders {
      margin: 0 auto;
    }
  }
`;

export default DateOrdersWindow;
