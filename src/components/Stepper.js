import React from "react";
import data from "../data.json";
import "./Stepper.css";
export const Stepper = ({ currentStep }) => {
  const STEP_STATES = data.stepper.steps;
  const STEP_STATES_NAME = data.stepper.steps_CH;

  const STEP_COLORS = [
    "stepper__content__step--primary",
    "stepper__content__step--selected",
  ];

  return (
    <div className="stepper">
      <div className="stepper__content">
        {STEP_STATES.map((step, index) => (
          <div
            key={`step${index}`}
            className={`stepper__content__step ${
              currentStep === STEP_STATES[index]
                ? STEP_COLORS[1]
                : STEP_COLORS[0]
            }`}
          >
            {STEP_STATES_NAME[index]}
          </div>
        ))}
      </div>
    </div>
  );
};
