import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import logoImg from "../../assets/img/logo_120_120.png";

function MyHeader({ className }) {
  const { t } = useTranslation();
  return (
    <header className={`${className} header`}>
      <Link to="/" className="header__logo">
        <div className="header__logo__img"></div>
      </Link>
      <div className="header__content">
        <ul className="header__content--ul">
          <li className="header__content__title common__subtitle">
            {t("header.headerTitle")}
          </li>
          <li className="header__content__subtitle common__heading">
            {t("header.headerSubtitle")}
          </li>
        </ul>
      </div>
    </header>
  );
}

const Header = styled(MyHeader)`
  --header-height: 100px;
  display: flex;
  height: var(--header-height);
  background-color: var(--main-bg);
  align-items: center;
  box-shadow: inset 0px -6px 7px -7px #e9decc;
  // color: var(--dark);

  .header__logo {
    height: calc(var(--header-height) - 2rem);
    width: calc(var(--header-height) - 2rem);
    margin: 0 1rem;
  }
  .header__logo__img {
    display: flex;
    width: 100%;
    height: 100%;
    background: url(${logoImg});
    background-size: cover;
    background-position: 50% 50%;
  }
  .header__content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  .header__content--ul {
    line-height: calc(var(--subtitle-font-size) * var(--line-height-multiple));
  }
`;

export default Header;
