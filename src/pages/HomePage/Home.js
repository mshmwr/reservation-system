import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Button from "../../components/ui/Button";
import { checkLoggedIn } from "../../utils/API";

function Home() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const isLogin = await checkLoggedIn();
      setIsLoggedIn(isLogin);
    }
    fetchData();
  }, [isLoggedIn]);


  return (
    <div className="home common__pageFrame">
      <div className="home__banner"></div>
      <div className="home__welcome">
        <p className="home__welcome__title common__title common__font--bold">
          {t("homePage.welcomeTitle")}
        </p>
        <ul>
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
                className="home__content__instruction__texts common__interval--normal "
                key={`instructionText${text}`}
              >
                {text}
              </p>
            )
          )}

          <p className="home__content__instruction__ruleTitle common__font--bold common__heading ">
            {t("homePage.ruleTitle")}
          </p>
          <ul className="home__content__instruction__ruleText--ul">
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
        <Link to="/notice" className="common__block home__content__btn">
          <Button text={t("homePage.button")}></Button>
        </Link>
        {/* {isLoggedIn && (
          <Link to="/management" className="common__block home__content__btn">
            <Button text={t("features.management")}></Button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/memberSystem" className="common__block home__content__btn">
            <Button text={t("features.memberSystem")}></Button>
          </Link>
        )} */}
      </div>
    </div>
  );
}
export default Home;
