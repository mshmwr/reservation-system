import React from "react";
import Form from "../../../components/features/Form";
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

      {step === steps[1] ?
        <>
          <p className="reservation__content__fillInStep__title">
            {titles[1]}
          </p>
          <div className="reservation__content__fillInStep__contentBlock">
            <div className="planBlock">
              <div className="planBlock__input">

                <Form
                  formInputList={formInputList}
                  needSubmitButton={false}
                ></Form>
              </div>
            </div>
          </div>

        </>

        : null
      }

    </div>
  );
};
