import React, { useState, useEffect } from "react";

import "./Menu.css";
import { useTranslation } from "react-i18next";

import Dropdowns from "./Dropdowns";
import OrderEnquiry from "./OrderEnquiry";

const Menu = ({
  isLoggedIn,
  setOrderSearchResultArr,
  setShowWindow,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();


  const langs = t("multiLanguages", { returnObjects: true });
  const [language, setLanguage] = useState(langs["CHT"]["multiLang"]);

  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const switchLanguageClickHandler = (e) => {
    setLanguage(e.target.id);
  };

  return (
    <div className="menu">
      <Dropdowns langs={langs} language={language} switchLanguageClickHandler={switchLanguageClickHandler} listItemHeight="40px" listItemWidth="80px" />
      <OrderEnquiry setOrderSearchResultArr={setOrderSearchResultArr} setShowWindow={setShowWindow} />
    </div>
  );
};

export default Menu;
