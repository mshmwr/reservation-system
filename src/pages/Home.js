import React from "react";
import "./Home.css";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home__banner"></div>
      <div className="home__welcome">
        <p>Welcome</p>
        <p>Welcometext</p>
        <p>Welcometext</p>
      </div>
      <div className="home__content">
        <div className="home__content__instruction">
          <p>Title</p>
          <p>text</p>
        </div>
        <Link to="/notice" className="home__content__btn">
          <Button text="開始預約"></Button>
        </Link>
        <Link to="/bulletinBoard" className="home__content__btn">
          <Button text="前往留言版(臨時按鈕)"></Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
