import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import multiLang_CHT from "../../data.json";
import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import CloseIcon from "../../components/CloseIcon";
import Menu from "../../components/Menu";
import { checkLoggedIn } from "../../utils/API";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [orderSearchResultArr, setOrderSearchResultArr] = useState([]);
  console.log(isLoggedIn);

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
      />

      {showWindow && (
        <div className="orderResultWindow">
          <CloseIcon clickHandler={closeWindowClickHandler} />
          {orderSearchResultArr.length !== 0 &&
            orderSearchResultArr.map((item) => (
              <div key={item.order_id} className="orderResultWindow__table">
                {multiLang_CHT.orderTableList.map((data) => (
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
          {multiLang_CHT.homePage.welcomeTitle}
        </p>
        <ul>
          {multiLang_CHT.homePage.welcomeTexts.map((text) => (
            <li key={`welcomeText${text}`}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="home__content">
        <div className="home__content__instruction">
          <p className="home__content__instruction__title common__subtitle common__font--bold common__block--bilateral">
            {multiLang_CHT.homePage.instructionTitle}
          </p>
          {multiLang_CHT.homePage.instructionTexts.map((text) => (
            <p
              className="home__content__instruction__texts common__interval--normal"
              key={`instructionText${text}`}
            >
              {text}
            </p>
          ))}
          <p className="home__content__instruction__ruleTitle common__font--bold ">
            {multiLang_CHT.homePage.ruleTitle}
          </p>
          <ul>
            {multiLang_CHT.homePage.ruleTexts.map((text) => (
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
          <Button text="開始預約"></Button>
        </Link>
        {isLoggedIn && (
          <Link to="/management" className="common__block home__content__btn">
            <Button text="前往後台"></Button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/memberSystem" className="common__block home__content__btn">
            <Button text="會員系統"></Button>
          </Link>
        )}
      </div>
    </div>
  );
}
export default Home;
