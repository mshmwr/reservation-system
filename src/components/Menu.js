import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import { getReservedData } from "../apis/reservedDataApi";
import multiLang_CHT from "../data.json";
import Button from "../components/Button";

const langs = multiLang_CHT.multiLanguages;

const Menu = ({
  showMenu,
  isLoggedIn,
  setOrderSearchResultArr,
  setShowWindow,
}) => {
  const [language, setLanguage] = useState(langs[0]);
  const [inputOrderId, setInputOrderId] = useState("");
  const [orderSearchResultText, setOrderSearchResultText] = useState("");
  const switchLanguageClickHandler = (e) => {
    setLanguage(e.target.id);
  };
  const orderSearchClickHandler = async () => {
    console.log(typeof inputOrderId);
    const orderId = inputOrderId;
    console.log(orderId.length);
    if (orderId === "") {
      setOrderSearchResultText(orderId);
      setOrderSearchResultArr([]);
      return;
    }
    if (orderId.length < 42) {
      setOrderSearchResultText(
        multiLang_CHT.features.orderSearchTexts.noResult
      );
      setOrderSearchResultArr([]);
      return;
    }

    const fetchedData = await getReservedData(undefined, orderId, undefined); //only one record
    if (fetchedData === null) {
      return;
    }
    const resultData = fetchedData.result;
    if (resultData.length === 0) {
      setOrderSearchResultText(
        multiLang_CHT.features.orderSearchTexts.noResult
      );
      setOrderSearchResultArr([]);
      console.log("fetch data is empty array");
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
        {langs.map((lang) => (
          <div
            key={lang}
            className={
              language === lang
                ? "home__menu__language--selected"
                : "home__menu__language--unselected"
            }
          >
            <Button
              id={lang}
              text={lang}
              clickEvent={switchLanguageClickHandler}
              isDisable={language === lang}
            />
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        <Link to="/memberSystem" className="common__block home__menu__feature">
          <Button text={multiLang_CHT.features.memberSystem} />
        </Link>
      ) : null}
      {isLoggedIn ? (
        <Link to="/management" className="common__block home__menu__feature">
          <Button text={multiLang_CHT.features.management} />
        </Link>
      ) : null}
      <div className="common__block home__menu__order">
        <Button
          text={multiLang_CHT.features.orderSearch}
          clickEvent={orderSearchClickHandler}
        />
        <input
          type="text"
          placeholder={multiLang_CHT.features.orderSearchTexts.orderIdInput}
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
