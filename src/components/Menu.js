import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import { getReservedData } from "../apis/reservedDataApi";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

const Menu = ({
  showMenu,
  isLoggedIn,
  setOrderSearchResultArr,
  setShowWindow,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const langs = t("multiLanguages", { returnObjects: true });
  const [language, setLanguage] = useState(langs["CHT"]["multiLang"]);
  const [inputOrderId, setInputOrderId] = useState("");
  const [orderSearchResultText, setOrderSearchResultText] = useState("");

  useEffect(() => {
    if (language !== null) i18n.changeLanguage(language);
  }, [language]);

  const switchLanguageClickHandler = (e) => {
    setLanguage(e.target.id);
    console.log(e.target.id);
  };
  const orderSearchClickHandler = async () => {
    const orderId = inputOrderId;
    if (orderId === "") {
      setOrderSearchResultText(orderId);
      setOrderSearchResultArr([]);
      return;
    }
    if (orderId.length < 42) {
      setOrderSearchResultText(t("features.orderSearchTexts.noResult"));
      setOrderSearchResultArr([]);
      return;
    }

    const fetchedData = await getReservedData(undefined, orderId, undefined); //only one record
    if (fetchedData === null) {
      return;
    }
    const resultData = fetchedData.result;
    if (resultData.length === 0) {
      setOrderSearchResultText(t("features.orderSearchTexts.noResult"));
      setOrderSearchResultArr([]);
      // console.log("fetch data is empty array");
    } else {
      setOrderSearchResultArr(resultData);
      setShowWindow(true);
    }
  };
  const orderInputHandler = (e) => {
    setInputOrderId(e.target.value);
  };
  const orderInputOnFocus = () => {};
  const orderInputOnBlur = () => {
    setOrderSearchResultText("");
  };

  return (
    <div className={`menu ${showMenu ? "" : "common__hidden"}`}>
      {/* <Link to="/bulletinBoard" className="common__block home__content__btn">
        <Button text="留言版" />
      </Link> */}
      <div className="common__block home__menu__language">
        {Object.keys(langs).map((key) => (
          <div
            key={langs[key].label}
            className={
              language === langs[key].multiLang
                ? "home__menu__language--selected"
                : "home__menu__language--unselected"
            }
          >
            <Button
              id={langs[key].multiLang}
              text={langs[key].label}
              clickEvent={switchLanguageClickHandler}
              isDisable={language === langs[key].multiLang}
            />
          </div>
        ))}
      </div>

      <Link to="/memberSystem" className="common__block home__menu__feature">
        <Button text={t("features.memberSystem")} />
      </Link>

      {isLoggedIn && (
        <Link to="/management" className="common__block home__menu__feature">
          <Button text={t("features.management")} />
        </Link>
      )}
      <div className="common__block home__menu__order">
        <Button
          text={t("features.orderSearch")}
          clickEvent={orderSearchClickHandler}
        />
        <input
          type="text"
          placeholder={t("features.orderSearchTexts.orderIdInput")}
          className="home__menu__order__input"
          onChange={orderInputHandler}
          onFocus={orderInputOnFocus}
          onBlur={orderInputOnBlur}
        />
        {orderSearchResultText === "" ? null : (
          <p className="home__menu__order__result">{orderSearchResultText}</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
