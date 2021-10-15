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
      <div className="notice__titleBlock">
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

      <div className="notice__list common__text">
        <div className="notice__list__frame">
          <ul className="notice__list__frame--ul">
            {t("noticePage.noticeList", { returnObjects: true }).map(
              (notice) => {
                return <li key={notice} className="notice__list__frame--li">{notice}</li>;
              }
            )}
          </ul>
        </div>
      </div>
      <form name="notice-form" className="notice__form" onChange={handleChange}>
        <div className="notice__form__accept">
          <input
            className="notice__form__accept--input"
            type="checkbox"
            id="accept-notice-rule"
            name="accept-notice-rule"
            value="false"
          ></input>
          <label htmlFor="accept-notice-rule" className="notice__form__accept--label common__heading">
            {t("noticePage.accept")}
          </label>
        </div>

        <Link
          to="/reservation"
          className={`common__block  ${check ? "notice__form__accept__button--show" : "notice__form__accept__button--hidden"}`}
        >
          <Button text={t("noticePage.button.next")}></Button>
        </Link>
      </form>
    </div>
  );
}

export default Notice;
