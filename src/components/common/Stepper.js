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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .stepper__content {
    display: flex;
    justify-content: center;
    width: 62.5%;
    margin: 3rem 0;
    border-top: 1px solid var(--main-dark);
    border-bottom: 1px solid var(--main-dark);
  }
  .stepper__content__step {
    display: flex;
    align-items: center;
    clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
    min-height: 5rem;
    padding: 0px 1.5rem 0px 2rem;
    margin: -1px 0;
  }

  .stepper__content__step--primary {
  }

  .stepper__content__step--selected {
    background-color: var(--main-dark);
  }

  @media screen and (max-width: 1000px) {
    .stepper__content {
      width: 100%;
    }
  }
`;

export { Stepper };
