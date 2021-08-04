import React, { useState } from "react";
import data from "../../data.json";
import "./Notice.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Notice() {
  const [check, setCheck] = useState(false);
  const handleChange = () => setCheck(!check);

  return (
    <div className="notice common__pageFrame">
      <div className="common__titleBlock">
        {data.noticePage.noticeTitle.map((title) => {
          return (
            <div
              key={title}
              className="notice__title common__title common__font--bold"
            >
              <p>{title}</p>
            </div>
          );
        })}
        {data.noticePage.noticeSubtitles.map((subtitle) => {
          return (
            <div key={subtitle} className="notice__subtitle common__subtitle">
              <p>{subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className="notice__list common__text common__block">
        <ul>
          {data.noticePage.noticeList.map((notice) => {
            return <li key={notice}>{notice}</li>;
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
            {data.noticePage.accept}
          </label>
        </div>

        <Link
          to="/reservation"
          className={`common__block  ${check ? "" : "common__hidden"}`}
        >
          <Button text={data.noticePage.button.next}></Button>
        </Link>
      </form>
    </div>
  );
}

export default Notice;
