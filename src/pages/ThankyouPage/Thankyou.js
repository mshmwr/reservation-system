import React from "react";
import data from "../../data.json";
import { Stepper } from "../../components/Stepper";
import "./Thankyou.css";
function Thankyou() {
  const thankyouContents = {
    title: "謝謝您的預約",
    texts: [
      "我們的工作人員將會於確認預約後以電子郵件回覆訊息給您。",
      "還請您再稍加等待喔，謝謝您。",
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png",
  };

  return (
    <div className="thankyou common__pageFrame">
      <Stepper currentStep={data.stepper.steps[2]}></Stepper>
      <div className="thankyou__content">
        <div className="thankyou__content__title common__title common__font--bold">
          {thankyouContents.title}
        </div>
        <div className="thankyou__content__texts common__block common__subtitle common__font--bold">
          {thankyouContents.texts.map((txt, index) => (
            <p className="thankyou__content__texts__text" key={`id${index}`}>
              {txt}
            </p>
          ))}
        </div>
        <div className="thankyou__content__logo common__block">
          {/* <img src={require("../../img/logo_120_120.png")} alt="Background" /> */}
          {/* TODO: 這邊要判斷拿的圖片是網址還是本地 */}
          <img
            className="thankyou__content__logo--img"
            src={thankyouContents.logo}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
