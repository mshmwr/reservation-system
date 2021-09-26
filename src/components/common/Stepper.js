import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const MyStepper = ({ currentStep, className }) => {
  const { t } = useTranslation();
  const STEP_STATES = t("stepper.steps", { returnObjects: true });
  const STEP_STATES_NAME = t("stepper.steps_name", { returnObjects: true });

  const STEP_COLORS = [
    "stepper__content__step--primary",
    "stepper__content__step--selected",
  ];

  return (
    <div className={className}>
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

const Stepper = styled(MyStepper).attrs({ className: "stepper" })`
  min-height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .stepper__content {
    display: flex;
    justify-content: center;
    width: 90%;
  }
  .stepper__content__step {
    display: flex;
    align-items: center;
    clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
    min-height: 40px;
    padding: 0px 1.5rem 0px 2rem;
  }

  .stepper__content__step--primary {
    background-color: var(--main-normal);
  }

  .stepper__content__step--selected {
    background-color: var(--main-dark);
  }
`;

export { Stepper };
