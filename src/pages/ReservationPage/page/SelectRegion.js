import React from "react";
import { Board } from "../../../components/Board";
import { Button } from "../../../components/Button";
import "./SelectRegion.css";

export const SelectRegion = ({
  backClick,
  nextClick,
  nextButtonText,
  backButtonText,
  dataListItems,
}) => {
  return (
    <div className="reservation__content__selectStep">
      <div className="reservation__content__selectStep__calenderBlock">
        <input type="date" className="calenderBlock__day"></input>
        <Board></Board>
      </div>

      <div className="reservation__content__selectStep__resultBlock">
        <div className="resultBlock__select">
          {dataListItems.map((item, index) => {
            if (Array.isArray(item.content)) {
              return (
                <select
                  key={`item${index}`}
                  className="resultBlock__select__attandeance resultBlock__select__item"
                >
                  {item.content.map((text, index) => (
                    <option key={`text${index}`}>{text}</option>
                  ))}
                </select>
              );
            } else {
              return (
                <div key={`item${index}`} className="resultBlock__select__item">
                  <div className="resultBlock__select__item__label">
                    {item.label}
                  </div>
                  <div className="resultBlock__select__item__content">
                    {item.content}
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
            <Button text={nextButtonText} clickEvent={nextClick}></Button>
          )}
        </div>
      </div>
    </div>
  );
};
