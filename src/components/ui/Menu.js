import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";

import Dropdowns from "./Dropdowns";
import OrderEnquiry from "./OrderEnquiry";


const MyMenu = ({ className,
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
    <div className={`${className} menu`}>
      <Dropdowns className="menu__item" langs={langs} language={language} switchLanguageClickHandler={switchLanguageClickHandler} listItemHeight="40px" listItemWidth="80px" />
      <OrderEnquiry className="menu__item" setOrderSearchResultArr={setOrderSearchResultArr} setShowWindow={setShowWindow} />
    </div>
  );
};

const Menu = styled(MyMenu)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  .menu__item{
    margin-left: 0.5rem;
  }
`;

export default Menu;
