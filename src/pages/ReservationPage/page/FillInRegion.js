import React from "react";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import "./FillInRegion.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useReservationAction from "../../../action/features/reservationAction";

export const FillInRegin = () => {
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const titles = t("reservationPage.titles", { returnObjects: true });
  const subTitles = t("reservationPage.subTitles", { returnObjects: true });
  const planItems = t("reservationPage.fillInStep.planItems", {
    returnObjects: true,
  });
  const fillInButtonTexts = t("reservationPage.fillInStep.button", {
    returnObjects: true,
  });
  const finishInButtonTexts = t("reservationPage.finishStep.button", {
    returnObjects: true,
  });

  //redux
  const { backClick, nextClick } = useReservationAction();
  const formInputList = useSelector(
    (state) => state.reservationReducer.formInputList
  );
  const step = useSelector((state) => state.reservationReducer.step);
  const selectedData = useSelector(
    (state) => state.reservationReducer.selectedData
  );

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
          <Button
            text={fillInButtonTexts.back}
            clickEvent={() => backClick(step)}
          ></Button>
        ) : (
          <Button
            text={finishInButtonTexts.back}
            clickEvent={() => backClick(step)}
          ></Button>
        )}

        {step === steps[1] ? (
          <Button
            text={fillInButtonTexts.next}
            clickEvent={() => nextClick(step)}
          ></Button>
        ) : (
          <Button
            text={finishInButtonTexts.next}
            clickEvent={() => nextClick(step)}
          ></Button>
        )}
      </div>
    </div>
  );
};
