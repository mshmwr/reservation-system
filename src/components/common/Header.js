import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <Link to="/" className="">
        <div className="header__logo"></div>
      </Link>
      <div className="header__content">
        <ul>
          <li className="header__content__title common__title common__font--bold">
            {t("header.headerTitle")}
          </li>
          <li className="header__content__subtitle common__subtitle">
            {t("header.headerSubtitle")}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
