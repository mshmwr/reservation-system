import React, { useRef, } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./FillInRegion.css";
import FormItem from "../../../components/ui/FormItem";
import useReservationAction from "../../../action/features/reservationAction"


export const FillInRegin = () => {
  const isFirstInput = useRef(true);

  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const titles = t("reservationPage.titles", { returnObjects: true });
  const userInfoForm = t("reservationPage.userinfoform", {
    returnObjects: true,
  });

  //redux
  const { setUserInfoValue } = useReservationAction();
  const step = useSelector((state) => state.reservationReducer.step);
  const userInfoValue = useSelector(
    (state) => state.reservationReducer.userInfoValue
  );

  const handleChange = (formItem, targetValue) => {
    if (isFirstInput.current) {
      isFirstInput.current = false;
    }
    Object.keys(userInfoValue).forEach((key) => {
      if (formItem.name === key) {
        setUserInfoValue({ ...userInfoValue, [key]: targetValue });
        return;
      }
    })
  };



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
                <FormItem
                  formList={userInfoForm}
                  formInputValue={userInfoValue}
                  handleChange={handleChange}
                  isFirstInput={isFirstInput.current}
                  borderRadius="15px"
                />
              </div>
            </div>
          </div>

        </>

        : null
      }

    </div>
  );
};
