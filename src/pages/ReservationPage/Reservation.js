import React, { useEffect, useLayoutEffect } from "react";
import "./Reservation.css";
import { SelectRegion } from "./page/SelectRegion";
import { Stepper } from "../../components/common/Stepper";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useReservationAction from "../../action/features/reservationAction";
import useBoardAction from "../../action/features/boardAction";
import DirectionButton from "../../components/ui/DirectionButton";

const initUserInfoValue = { name: "", phone: "", email: "" };

function Reservation() {
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]


  //redux
  const { setBoardIsReadOnly } = useBoardAction();
  const { setUserInfoValue, setStep, setSelectedData, backClick, nextClick } = useReservationAction();
  const step = useSelector((state) => state.reservationReducer.step);
  const planData = useSelector((state) => state.orderReducer.planData);
  const attendenceData = useSelector(
    (state) => state.orderReducer.attendenceData
  );
  const calendarDate = useSelector((state) => state.boardReducer.calendarDate);


  //button action functions
  const nextToFillIn = () => {
    console.log("select region: next");
    console.log({ ...planData, ...attendenceData, date: calendarDate });
    if (!checkCanNext()) {
      return;
    }
    setSelectedData({ ...planData, ...attendenceData, date: calendarDate });
    nextClick(step);
  };

  const nextToFinsh = () => {
    if (!checkCanNext()) {
      return;
    }
    setSelectedData({ ...planData, ...attendenceData, date: calendarDate });
    nextClick(step);
  };

  const useSwitchPageButton = (step, steps) => {
    switch (step) {
      case steps[0]:
        return <DirectionButton className="reservation__content__buttons__button" direction="right" clickEvent={nextToFillIn} />;
      case steps[1]:
        return <>
          <DirectionButton className="reservation__content__buttons__button" direction="left" clickEvent={() => backClick(step)} />
          <DirectionButton className="reservation__content__buttons__button" direction="right" clickEvent={nextToFinsh} />
        </>;
      default:
        return <>
          <DirectionButton className="reservation__content__buttons__button" direction="left" clickEvent={() => backClick(step)} />
          <DirectionButton className="reservation__content__buttons__button" direction="check" clickEvent={() => nextClick(step)} />
        </>;
    }

  }


  const checkCanNext = () => {
    let alertStr = t("reservationPage.selectStep.errorMessage.pleaseChoose"); //請選擇
    let canNext = true;
    if (Object.keys(planData).length === 0) {
      alertStr += t("reservationPage.selectStep.errorMessage.time"); //預約時間
      canNext = false;
    }
    if (JSON.stringify(attendenceData) === "{}") {
      if (!canNext) {
        alertStr += t("reservationPage.selectStep.errorMessage.comma"); //"、"
      }
      alertStr += t("reservationPage.selectStep.errorMessage.attendence"); //人數
      canNext = false;
    }

    if (!canNext) {
      alert(alertStr);
    }

    return canNext;
  };

  const setBoardReadOnlyState = () => {
    console.log("setBoardReadOnlyState");
    switch (step) {
      case steps[2]:
        console.log("setBoardReadOnlyState steps2");
        setBoardIsReadOnly(true);
        break;
      default:
        console.log("setBoardReadOnlyState steps default");
        setBoardIsReadOnly(false);
        break;
    }
  }

  useEffect(() => {
    setBoardReadOnlyState();
  }, [step]);

  useLayoutEffect(() => {
    setUserInfoValue(initUserInfoValue);
    setStep(steps[0]);
  }, []);

  return (
    <div className="reservation common__pageFrame">
      <Stepper currentStep={step}></Stepper>
      <div className="reservation__content">
        <SelectRegion />


        <div className="reservation__content__buttons">
          {useSwitchPageButton(step, steps)}

        </div>
      </div>
    </div>
  );
}

export default Reservation;
