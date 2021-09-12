import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Button from "../../components/ui/Button";
import Hamburger from "../../components/ui/Hamburger";
import CloseIcon from "../../components/ui/CloseIcon";
import Menu from "../../components/ui/Menu";
import { checkLoggedIn } from "../../utils/API";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [orderSearchResultArr, setOrderSearchResultArr] = useState([]);
  // console.log(isLoggedIn);
  const langs = t("multiLanguages", { returnObjects: true });
  const [language, setLanguage] = useState(langs["CHT"]["multiLang"]);

  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    async function fetchData() {
      const isLogin = await checkLoggedIn();
      setIsLoggedIn(isLogin);
    }
    fetchData();
  }, [isLoggedIn]);

  const menuClickHandler = () => {
    setShowMenu(!showMenu);
  };
  const closeWindowClickHandler = () => {
    setShowWindow(false);
  };

  return (
    <div className="home common__pageFrame">
      <Hamburger isShowItem={showMenu} clickHandler={menuClickHandler} />
      <Menu
        showMenu={showMenu}
        isLoggedIn={isLoggedIn}
        setOrderSearchResultArr={setOrderSearchResultArr}
        setShowWindow={setShowWindow}
        language={language}
        setLanguage={setLanguage}
      />

      {showWindow && (
        <div className="orderResultWindow">
          <CloseIcon clickHandler={closeWindowClickHandler} />
          {orderSearchResultArr.length !== 0 &&
            orderSearchResultArr.map((item) => (
              <div key={item.order_id} className="orderResultWindow__table">
                {t("orderTableList", { returnObjects: true }).map((data) => (
                  <div
                    key={data.key}
                    className="orderResultWindow__table__item"
                  >
                    <p className="orderResultWindow__table__item__label">
                      {data.label}
                    </p>
                    <p className="orderResultWindow__table__item__value">
                      {item[data.key]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}

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
          <p className="home__content__instruction__title common__subtitle common__font--bold common__block--bilateral">
            {t("homePage.instructionTitle")}
          </p>
          {t("homePage.instructionTexts", { returnObjects: true }).map(
            (text) => (
              <p
                className="home__content__instruction__texts common__interval--normal"
                key={`instructionText${text}`}
              >
                {text}
              </p>
            )
          )}
          <p className="home__content__instruction__ruleTitle common__font--bold ">
            {t("homePage.ruleTitle")}
          </p>
          <ul>
            {t("homePage.ruleTexts", { returnObjects: true }).map((text) => (
              <li
                className="className=home__content__instruction__ruleTexts"
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
        {isLoggedIn && (
          <Link to="/management" className="common__block home__content__btn">
            <Button text={t("features.management")}></Button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/memberSystem" className="common__block home__content__btn">
            <Button text={t("features.memberSystem")}></Button>
          </Link>
        )}
      </div>
    </div>
  );
}
export default Home;
