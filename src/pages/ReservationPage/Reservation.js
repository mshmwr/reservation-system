import React, { useState } from "react";
import "./Reservation.css";
import data from "../../data.json";
import { useHistory } from "react-router-dom";
import { SelectRegion } from "./page/SelectRegion";
import { FillInRegin } from "./page/FillInRegion";
import { Stepper } from "../../components/Stepper";

function Reservation() {
  let history = useHistory();
  const steps = data.stepper.steps;

  const backClick = () => {
    switch (step) {
      case steps[2]:
        setStep(steps[1]);
        break;
      case steps[1]:
        setStep(steps[0]);
        break;
      default:
        history.goBack();
        break;
    }
  };
  const nextClick = () => {
    switch (step) {
      case steps[0]:
        setStep(steps[1]);
        break;
      case steps[1]:
        setStep(steps[2]);
        break;
      default:
        break;
    }
  };
  const [step, setStep] = useState(steps[0]);
  const [formInputList, setFormInputList] = useState([
    { label: "姓名", value: "" },
    { label: "手機", value: "" },
    { label: "E-mail", value: "" },
    //TODO(問助教):黑科技，把 formInputList 傳進 form 之後，他就get到值了，不用 setFormInputList 也可以，不要問我為什麼，我才是最想知道的那個人QQ
  ]);
  return (
    <div className="reservation common__pageFrame">
      <Stepper currentStep={step}></Stepper>
      <div className="reservation__content">
        {step === steps[0] ? (
          <SelectRegion
            backClick={backClick}
            nextClick={nextClick}
            nextButtonText={data.reservationPage.selectStep.button.next}
            dataListItems={data.reservationPage.selectStep.listItems}
          ></SelectRegion>
        ) : (
          <FillInRegin
            titles={data.reservationPage.titles}
            subTitles={data.reservationPage.subTitles}
            planItems={data.reservationPage.fillInStep.planItems}
            formInputList={formInputList}
            backClick={backClick}
            nextClick={nextClick}
            buttonTexts={data.reservationPage.fillInStep.button}
            steps={steps}
            step={step}
          ></FillInRegin>
        )}
      </div>
    </div>
  );
}

export default Reservation;
