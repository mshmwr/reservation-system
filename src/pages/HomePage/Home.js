import React from "react";
import "./Home.css";
import data from "../../data.json";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home common__pageFrame">
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
        {/* <Link to="/bulletinBoard" className="common__block home__content__btn">
          <Button text="前往留言版(臨時按鈕)"></Button>
        </Link> */}
        <Link to="/management" className="common__block home__content__btn">
          <Button text="前往後台"></Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
