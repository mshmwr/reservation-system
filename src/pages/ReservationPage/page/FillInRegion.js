import React from "react";
import Form from "../../../components/features/Form";
import "./FillInRegion.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const FillInRegin = () => {
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const titles = t("reservationPage.titles", { returnObjects: true });

  //redux
  const formInputList = useSelector(
    (state) => state.reservationReducer.formInputList
  );
  const step = useSelector((state) => state.reservationReducer.step);



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
