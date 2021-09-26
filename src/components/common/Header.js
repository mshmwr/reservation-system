import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import logoImg from "../../assets/img/logo_120_120.png";

function MyHeader({ className }) {
  const { t } = useTranslation();
  return (
    <header className={className}>
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

const Header = styled(MyHeader)`
  display: flex;
  height: 120px;
  background-color: var(--white);
  .header__logo {
    display: flex;
    background: url(${logoImg});
    background-size: cover;
    background-position: 50% 50%;
    height: 120px;
    width: 120px;
  }
  .header__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
  }

  .header__content ul {
    line-height: calc(var(--title-font-size) * var(--line-height-multiple));
  }
`;

export default Header;
