import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Button from "../../components/ui/Button";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home common__pageFrame">
      <div className="home__banner"></div>
      <div className="home__welcome">
        <p className="home__welcome__title common__title common__font--bold">
          {t("homePage.welcomeTitle")}
        </p>
        <ul className="common__text">
          {t("homePage.welcomeTexts", { returnObjects: true }).map((text) => (
            <li key={`welcomeText${text}`}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="home__content">
        <div className="home__content__instruction">
          <p className="home__content__instruction__title common__subtitle common__font--bold">
            {t("homePage.instructionTitle")}
          </p>
          {t("homePage.instructionTexts", { returnObjects: true }).map(
            (text) => (
              <p
                className="home__content__instruction__texts common__text common__interval--normal "
                key={`instructionText${text}`}
              >
                {text}
              </p>
            )
          )}

          <p className="home__content__instruction__ruleTitle common__subtitle common__font--bold  ">
            {t("homePage.ruleTitle")}
          </p>
          <ul className="home__content__instruction__ruleText--ul common__text">
            {t("homePage.ruleTexts", { returnObjects: true }).map((text) => (
              <li
                className="home__content__instruction__ruleText--li"
                key={`ruleText${text}`}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/notice" className="home__content__btn">
          <Button text={t("homePage.button")}></Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
