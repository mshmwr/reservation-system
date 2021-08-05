import React from "react";
import data from "../data.json";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  // const header__logo__bg = {
  //   // backgroundImage: `url(${data.header.logoUrl})`,
  //   backgroundImage: `url("../img/logo_120_120.png")`,
  // };
  return (
    <header>
      <Link to="/" className="">
        <div className="header__logo"></div>
      </Link>
      <div className="header__content">
        <ul>
          <li className="header__content__title common__title common__font--bold">
            {data.header.headerTitle}
          </li>
          <li className="header__content__subtitle common__subtitle">
            {data.header.headerSubtitle}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
