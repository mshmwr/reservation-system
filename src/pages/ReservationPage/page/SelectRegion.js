import React from "react";
import { Button } from "../../../components/Button";
import "./SelectRegion.css";

export const SelectRegion = ({
  backClick,
  nextClick,
  nextButtonText,
  backButtonText,
}) => {
  return (
    <div className="reservation__content__selectStep">
      <div className="reservation__content__selectStep__calenderBlock">
        <input type="date" className="calenderBlock__day"></input>
        <div className="calenderBlock__reservationBoard common__block">
          ReservationBoard
        </div>
      </div>

      <div className="reservation__content__selectStep__resultBlock">
        <div className="resultBlock__select">
          <p className="resultBlock__select__room resultBlock__select--item">
            select__room
          </p>
          <p className="resultBlock__select__startTime resultBlock__select--item">
            select__startTime
          </p>
          <p className="resultBlock__select__duration resultBlock__select--item">
            select__duration
          </p>
          <select className="resultBlock__select__attandeance resultBlock__select--item">
            <option>選擇人數</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Hamster</option>
            <option>Parrot</option>
            <option>Spider</option>
            <option>Goldfish</option>
          </select>
        </div>
        <div className="resultBlock__buttonGroup common__buttonGroup">
          {backButtonText === undefined ? null : (
            <Button text={backButtonText} clickEvent={backClick}></Button>
          )}
          {nextButtonText === undefined ? null : (
            <Button text={nextButtonText} clickEvent={nextClick}></Button>
          )}
        </div>
      </div>
    </div>
  );
};
