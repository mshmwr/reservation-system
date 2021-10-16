import React from "react";
import styled from "styled-components";
import { Stepper } from "../../components/common/Stepper";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getSVGURI } from "../../utils/Utils";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MyThankyou = ({ className }) => {
  const { t } = useTranslation();
  const query = useQuery();
  return (
    <div className={`${className} thankyou common__pageFrame`}>
      {/* <Stepper
        currentStep={t("stepper.steps", { returnObjects: true })[2]}
      ></Stepper> */}
      <div className="thankyou__content">
        <div className="thankyou__content__messages">
          <p className="thankyou__content__title common__subtitle common__font--bold">
            {t("thankyouPage.title")}
          </p>
          <div className="thankyou__content__orderId common__title common__block common__font--bold">
            <p className="thankyou__content__orderId__text">
              {t("thankyouPage.yourOrderId")}
            </p>
            <p className="thankyou__content__orderId__text">
              {query.get("orderId")}
            </p>
          </div>

          <div className="thankyou__content__texts common__block common__text">
            {t("thankyouPage.texts", { returnObjects: true }).map(
              (txt, index) => (
                <p
                  className="thankyou__content__texts__text"
                  key={`id${index}`}
                >
                  {txt}
                </p>
              )
            )}
          </div>
          <Link to="/">
            <div className="thankyou__content__logo">
              <div className="thankyou__content__logo__icon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

//className: thankyou
const Thankyou = styled(MyThankyou)`
  background-color: var(--main-bg);

  .thankyou__content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .thankyou__content__messages {
    width: 62.5%;
    border: 1px solid var(--main-dark);
    border-radius: var(--border-radius-15);
    padding: 2rem;
  }

  .thankyou__content__title {
    text-align: center;
    margin: 2rem auto;
  }
  .thankyou__content__texts {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .thankyou__content__texts__text {
    margin: 0 auto var(--text-font-size);
    line-height: 1.3;
  }
  .thankyou__content__logo {
    height: var(--logo-height);
    width: var(--logo-width);
    border-radius: 50%;
    background-color: var(--main-dark);
    margin: 2rem auto 0 auto;
  }

  .thankyou__content__logo:hover {
    background-color: var(--dark);
  }

  .thankyou__content__logo__icon {
    height: 100%;
    width: 100%;
    position: relative;
    background-image: url(${getSVGURI(faHome, "#FFFFFF")});
    background-position: center;
    background-size: cover;
    transform: scale(0.7);
  }

  .thankyou__content__orderId {
    width: 100%;
    word-break: break-all;
  }
  .thankyou__content__orderId__text {
    color: var(--light-red);
    margin: 0.5rem auto;
  }

  @media screen and (max-width: 600px) {
    .thankyou__content__messages {
      width: 80%;
    }
    .thankyou__content__orderId,
    .thankyou__content__texts {
      width: 90%;
    }
  }
  @media screen and (max-width: 360px) {
    .thankyou__content__messages {
      width: 95%;
    }
    .thankyou__content__texts {
      margin: 0 auto;
    }
  }
`;

export default Thankyou;
