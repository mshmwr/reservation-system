import React, { useLayoutEffect } from "react";
import "./Reservation.css";
import { SelectRegion } from "./page/SelectRegion";
import { FillInRegin } from "./page/FillInRegion";
import { Stepper } from "../../components/Stepper";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useReservationAction from "../../action/features/reservationAction";

function Reservation() {
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const userInfoForm = t("reservationPage.userinfoform", {
    returnObjects: true,
  });
  const copyUserInfoForm = JSON.parse(JSON.stringify(userInfoForm));

  //redux
  const { setFormInputList, setStep } = useReservationAction();
  const step = useSelector((state) => state.reservationReducer.step);

  useLayoutEffect(() => {
    setFormInputList(copyUserInfoForm);
    setStep(steps[0]);
  }, []);

  return (
    <div className="reservation common__pageFrame">
      <Stepper currentStep={step}></Stepper>
      <div className="reservation__content">
        {step === steps[0] ? <SelectRegion /> : <FillInRegin />}
      </div>
    </div>
  );
}

export default Reservation;
