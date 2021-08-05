import React from "react";
import "./Thankyou.css";
import multiLang_CHT from "../../data.json";
import { Stepper } from "../../components/Stepper";
import { Link, useLocation } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function Thankyou() {
  const query = useQuery();
  return (
    <div className="thankyou common__pageFrame">
      <Stepper currentStep={multiLang_CHT.stepper.steps[2]}></Stepper>
      <div className="thankyou__content">
        <p className="thankyou__content__title common__title common__font--bold">
          {multiLang_CHT.thankyouPage.title}
        </p>
        <div className="thankyou__content__orderId common__heading common__block common__font--bold">
          <p className="thankyou__content__orderId__text">
            {multiLang_CHT.thankyouPage.yourOrderId}
          </p>
          <p className="thankyou__content__orderId__text">
            {query.get("orderId")}
          </p>
        </div>

        <div className="thankyou__content__texts common__block common__subtitle common__font--bold">
          {multiLang_CHT.thankyouPage.texts.map((txt, index) => (
            <p className="thankyou__content__texts__text" key={`id${index}`}>
              {txt}
            </p>
          ))}
        </div>
        <Link to="/">
          <div className="thankyou__content__logo common__block">
            {/* <img src={require("../../img/logo_120_120.png")} alt="Background" /> */}
            {/* TODO: 這邊要判斷拿的圖片是網址還是本地 */}
            {/* 
            <div className="thankyou__content__logo--img">
              <i class="fas fa-home"></i>
            </div> */}
            <i class="fas fa-home"></i>
            <img
              className="thankyou__content__logo--img"
              src={require("../../img/home.png")}
              alt="logo"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
