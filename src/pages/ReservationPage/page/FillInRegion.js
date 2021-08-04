import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import "./FillInRegion.css";
export const FillInRegin = ({
  titles,
  subTitles,
  planItems,
  formInputList,
  setFormInputList,
  getUserInput,
  backClick,
  nextClick,
  buttonTexts,
  steps,
  step,
  selectedData,
}) => {
  return (
    <div className="reservation__content__fillInStep">
      <p className="reservation__content__fillInStep__title common__title common__font--bold">
        {titles[1]}
      </p>
      <div className="reservation__content__fillInStep__contentBlock">
        <div className="planBlock common__block">
          <div className="planBlock__plan">
            <div className="planBlock__plan__subtitle common__block common__subtitle common__font--bold">
              {subTitles[1]}
            </div>
            {planItems.map((item) => (
              <div
                key={item.title}
                className="planBlock__plan__item common__block common__heading common__font--bold"
              >
                <div className="planBlock__plan__item__title">{item.title}</div>
                <div className="planBlock__plan__item__content">
                  {selectedData[item.name]}
                </div>
              </div>
            ))}
          </div>

          <div className="planBlock__input">
            {step === steps[1] ? (
              <Form
                formInputList={formInputList}
                needSubmitButton={false}
              ></Form>
            ) : (
              formInputList.map((info, index) => (
                <div
                  key={index}
                  className="planBlock__input__info common__block common__heading common__font--bold"
                >
                  <div className="planBlock__input__info__label">
                    {info.label}
                  </div>
                  <div className="planBlock__input__info__value">
                    {info.value}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="reservation__content__fillInStep__buttonGroup common__buttonGroup">
        {step === steps[1] ? (
          <Button text={buttonTexts.back} clickEvent={backClick}></Button>
        ) : (
          <Button text={buttonTexts.back} clickEvent={backClick}></Button>
        )}

        {step === steps[1] ? (
          <Button text={buttonTexts.next} clickEvent={nextClick}></Button>
        ) : (
          <Link to="/thankyou">
            <Button text={buttonTexts.next} clickEvent={nextClick}></Button>
          </Link>
        )}
      </div>
    </div>
  );
};
