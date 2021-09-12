import React from "react";
import "./Thankyou.css";
import { Stepper } from "../../components/common/Stepper";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function Thankyou() {
  const { t } = useTranslation();
  const query = useQuery();
  return (
    <div className="thankyou common__pageFrame">
      <Stepper
        currentStep={t("stepper.steps", { returnObjects: true })[2]}
      ></Stepper>
      <div className="thankyou__content">
        <p className="thankyou__content__title common__title common__font--bold">
          {t("thankyouPage.title")}
        </p>
        <div className="thankyou__content__orderId common__heading common__block common__font--bold">
          <p className="thankyou__content__orderId__text">
            {t("thankyouPage.yourOrderId")}
          </p>
          <p className="thankyou__content__orderId__text">
            {query.get("orderId")}
          </p>
        </div>

        <div className="thankyou__content__texts common__block common__subtitle common__font--bold">
          {t("thankyouPage.texts", { returnObjects: true }).map(
            (txt, index) => (
              <p className="thankyou__content__texts__text" key={`id${index}`}>
                {txt}
              </p>
            )
          )}
        </div>
        <Link to="/">
          <div className="thankyou__content__logo common__block">
            <div className="thankyou__content__logo__img">
              <img
                className=""
                // src="https://idcweb1.ches.ntpc.edu.tw/art/images/home.png"
                alt="logo"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
