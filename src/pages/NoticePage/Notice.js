import React, { useState } from "react";
import "./Notice.css";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Notice() {
  const { t } = useTranslation();
  const [check, setCheck] = useState(false);
  const handleChange = () => setCheck(!check);

  return (
    <div className="notice common__pageFrame">
      <div className="common__titleBlock">
        {t("noticePage.noticeTitle", { returnObjects: true }).map((title) => {
          return (
            <div
              key={title}
              className="notice__title common__title common__font--bold"
            >
              <p>{title}</p>
            </div>
          );
        })}
        {t("noticePage.noticeSubtitles", { returnObjects: true }).map(
          (subtitle) => {
            return (
              <div key={subtitle} className="notice__subtitle common__heading">
                <p>{subtitle}</p>
              </div>
            );
          }
        )}
      </div>

      <div className="notice__list common__text common__block">
        <ul>
          {t("noticePage.noticeList", { returnObjects: true }).map((notice) => {
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
            {t("noticePage.accept")}
          </label>
        </div>

        <Link
          to="/reservation"
          className={`common__block  ${check ? "" : "common__hidden"}`}
        >
          <Button text={t("noticePage.button.next")}></Button>
        </Link>
      </form>
    </div>
  );
}

export default Notice;
