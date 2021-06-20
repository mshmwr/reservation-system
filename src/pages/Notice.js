import React, { useState } from "react";
import "./Notice.css";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

function Notice() {
  const noticeTitle = ["注意事項"];
  const noticeSubtitle = [
    "為了保護您以及木谷音樂中心雙方的權益，",
    "請先詳細閱讀以下預約注意事項並確認同意後，再進行預約步驟",
  ];
  const noticeList = [
    "全面禁菸、禁酒、禁檳榔、禁賭博，若店員發現且警告無效會請求立即離場，不予退費。",
    "請勿在店內使用火燭，切勿以身試法，以免觸發火警。若造成店內消防灑水會全額求償裝潢機器的損失。",
    "包廂內所有插座為「機台專用」，請勿任意使用調整，以免機器故障。包廂內都會提供一條充電專用延長線，請用該延長線充電。若機器損毀會請求照價賠償。",
    "因隔音材脆弱，請勿在店內用力踩踏，並嚴禁在店內沙發與桌子上站立與跳躍，若破損會請求照價賠償。",
    "店內禁止以下食物：泡麵、奶油蛋糕、臭豆腐（味道重的）、披薩、炸雞、鹽酥雞、雞排，若不確定可否攜帶可以私訊詢問喔。",
    "可以叫外送，但請自行去店門口領取，店員不幫代領。",
    "外食、其他垃圾請自行清理，若未清潔，造成環境髒亂或清除味道不易，會酌收10%清潔費。",
    "若攜帶食物有液體，請勿自行在廁所洗手台傾倒，以免造成惡臭或是阻塞。",
    "為確保孩童安全，8歲以下孩童禁止入店。",
    "為保護毛孩，請勿攜帶毛孩入店。（店主雖愛動物，但不希望動物受傷或是害怕）",
    "請於預約前詳閱本注意事項，並轉知一同參與之成員。",
    "請愛護與善待店員，勿拍打與怒罵，大家一同創造友善的環境。",
    "大家一起開開心心唱歌吧♡(*´∀｀*)人(*´∀｀*)♡",
  ];
  const [check, setCheck] = useState(false);
  const handleChange = () => setCheck(!check);

  return (
    <div className="notice">
      <div className="common__titleBlock">
        {noticeTitle.map((title, index) => {
          return (
            <div key={`title${index}`} className="notice__title common__title">
              <p>{title}</p>
            </div>
          );
        })}
        {noticeSubtitle.map((subtitle, index) => {
          return (
            <div
              key={`title${index}`}
              className="notice__subtitle common__subtitle"
            >
              <p>{subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className="notice__list common__text common__block">
        <ul>
          {noticeList.map((notice, index) => {
            return <li key={`notice${index}`}>{notice}</li>;
          })}
        </ul>
      </div>
      <form name="notice-form" className="notice__form" onChange={handleChange}>
        <div className="notice__form__accept common__block">
          <input
            type="checkbox"
            id="accept-notice-rule"
            name="accept-notice-rule"
            value="false"
          ></input>
          <label htmlFor="accept-notice-rule" className="common__heading">
            同意店內規則
          </label>
        </div>

        <Link
          to="/reservation"
          className={`common__block  ${check ? null : "common__hidden"}`}
        >
          <Button text="前往預約"></Button>
        </Link>
      </form>
    </div>
  );
}

export default Notice;
