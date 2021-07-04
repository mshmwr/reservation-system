import React from "react";
import data from "../data.json";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  const header__logo__bg = {
    backgroundImage: `url(${data.header.logoUrl})`,
  };
  return (
    <header>
      <Link to="/" className="">
        <div className="header__logo" style={header__logo__bg}></div>
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
