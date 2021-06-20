import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <Link to="/" className="">
        <div className="header__logo"></div>
      </Link>
      <div className="header__titles">
        <p className="header__titles__title">AAAAA</p>
        <p className="header__titles__subtitle">aaaaa</p>
      </div>
    </header>
  );
}

export default Header;
