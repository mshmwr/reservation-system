import React, { useState, useEffect } from "react";
import "./Home.css";
import data from "../../data.json";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import Hamburger from "../../components/Hamburger";
import { checkLoggedIn } from "../../utils/API";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn(setIsLoggedIn);
  }, []);

  const closeClickHandler = () => {};
  const orderSearchClickHandler = () => {};

  return (
    <div className="home common__pageFrame">
      <Hamburger clickHandler={closeClickHandler} />
      <div className="featureButtonGroup">
        {/* <Link to="/bulletinBoard" className="common__block home__content__btn">
          <Button text="留言版" />
        </Link> */}
        {isLoggedIn ? (
          <Link to="/memberSystem" className="common__block home__content__btn">
            <Button text="會員系統" />
          </Link>
        ) : null}
        {isLoggedIn ? (
          <Link to="/management" className="common__block home__content__btn">
            <Button text="前往後台" />
          </Link>
        ) : null}
        <div className="common__block home__content__btn">
          <Button text="訂單查詢" clickEvent={orderSearchClickHandler} />
          <input type="text" />
        </div>
      </div>
      <div className="home__banner"></div>
      <div className="home__welcome">
        <p className="home__welcome__title common__title common__font--bold">
          {data.homePage.welcomeTitle}
        </p>
        <ul>
          {data.homePage.welcomeTexts.map((text, index) => (
            <li key={`welcomeText${index}`}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="home__content">
        <div className="home__content__instruction">
          <p className="home__content__instruction__title common__subtitle common__font--bold common__block--bilateral">
            {data.homePage.instructionTitle}
          </p>
          {data.homePage.instructionTexts.map((text, index) => (
            <p
              className="home__content__instruction__texts common__interval--normal"
              key={`instructionText${index}`}
            >
              {text}
            </p>
          ))}
          <p className="home__content__instruction__ruleTitle common__font--bold ">
            {data.homePage.ruleTitle}
          </p>
          <ul>
            {data.homePage.ruleTexts.map((text, index) => (
              <li
                className="className=home__content__instruction__ruleTexts"
                key={`ruleText${index}`}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/notice" className="common__block home__content__btn">
          <Button text="開始預約"></Button>
        </Link>
        <Link to="/management" className="common__block home__content__btn">
          <Button text="前往後台"></Button>
        </Link>

        <Link to="/memberSystem" className="common__block home__content__btn">
          <Button text="會員系統"></Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
