import React from "react";
import "./Stepper.css";
import { useTranslation } from "react-i18next";

export const Stepper = ({ currentStep }) => {
  const { t } = useTranslation();
  const STEP_STATES = t("stepper.steps", { returnObjects: true });
  const STEP_STATES_NAME = t("stepper.steps_name", { returnObjects: true });

  const STEP_COLORS = [
    "stepper__content__step--primary",
    "stepper__content__step--selected",
  ];

  return (
    <div className="stepper">
      <div className="stepper__content">
        {STEP_STATES.map((step, index) => (
          <div
            key={`step${step}`}
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
