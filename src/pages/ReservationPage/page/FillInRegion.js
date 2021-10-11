import React, { useRef } from "react";
import Form from "../../../components/features/Form";
import "./FillInRegion.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const FillInRegin = () => {
  const isFirstInput = useRef(true);

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
                  isFirstInput={isFirstInput}
                  borderRadius="15px"
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
