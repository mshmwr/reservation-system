import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./MemberSystem.css";
import { postUser, patchUser, deleteUser } from "../../apis/usersApi";
import Button from "../../components/ui/Button";
import { checkLoggedIn } from "../../utils/API";
import { validateInput } from "../../utils/Utils";
import { useTranslation } from "react-i18next";

const inputVerifier = (
  ownerFormInputList,
  setAccountActionStatus,
  multiLangList
) => {
  const [msg_invalid, msg_emptyColumns, msg_comma] = multiLangList;
  let errorMsg = "";
  const emptyColumns = ownerFormInputList.filter((col) => col.value === "");
  if (emptyColumns.length === 0) {
    //都有輸入資料
    //驗證合法性
    const valid = ownerFormInputList.every(
      (input) => validateInput(input) === true
    );
    if (!valid) {
      errorMsg += msg_invalid; //t("messages.invalid");
    }
    return errorMsg;
  }
  setAccountActionStatus("");
  //錯誤訊息：請輸入帳號、密碼...etc

  errorMsg += msg_emptyColumns; //t("memberSystemPage.errorMessage.emptyColumns");
  emptyColumns.forEach((col, index) => {
    errorMsg += col.label;
    errorMsg += index === emptyColumns.length - 1 ? "" : msg_comma; // t("memberSystemPage.errorMessage.comma");
  });

  return errorMsg;
};
const switchAccountStatus = (accountStatus, setAccountStatus) => {
  switch (accountStatus) {
    case "login":
      setAccountStatus("register");
      break;
    case "register":
      setAccountStatus("login");
      break;
    default:
      break;
  }
};

const sendApi = async (accountStatus, sendData) => {
  let parsedData = null;
  switch (accountStatus) {
    case "login":
      parsedData = await patchUser({ data: sendData });
      break;
    case "register":
      parsedData = await postUser({ data: sendData });
      break;
    case "logout":
      parsedData = await deleteUser();
      break;
    default:
      break;
  }
  return parsedData;
};

const switchAccountMessageColor = (accountActionStatus) => {
  switch (accountActionStatus) {
    case "ok":
      return "memberSystem__card__message--ok";
    case "error":
      return "memberSystem__card__message--error";
    default:
      return "memberSystem__card__message--error";
  }
};

function MemberSystem() {
  const { t } = useTranslation();
  const history = useHistory();
  const ownerLoginForm = t("memberSystemPage.ownerLoginForm", {
    returnObjects: true,
  });
  const ownerRegisterForm = t("memberSystemPage.ownerRegisterForm", {
    returnObjects: true,
  });

  const copyOwnerLoginForm = JSON.parse(JSON.stringify(ownerLoginForm));

  const copyOwnerRegisterForm = JSON.parse(JSON.stringify(ownerRegisterForm));

  const [accountStatus, setAccountStatus] = useState("login");
  const [accountActionMessage, setAccountActionMessage] = useState("");
  const [accountActionStatus, setAccountActionStatus] = useState("");
  const [inputClick, setInputClick] = useState(false);
  const [ownerFormInputList, setOwnerLoginFormInputList] =
    useState(copyOwnerLoginForm);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  useEffect(() => {
    async function fetchData() {
      const isLogin = await checkLoggedIn();
      setIsLoggedIn(isLogin);
    }
    fetchData();
  }, [isLoggedIn]);

  const clickAccountStatusHandler = () => {
    switchAccountStatus(accountStatus, setAccountStatus);
    const formInput =
      accountStatus === "login" ? copyOwnerRegisterForm : copyOwnerLoginForm;
    setAccountActionMessage("");
    setOwnerLoginFormInputList(formInput);
  };

  const buttonClickHandler = async () => {
    if (isLoggedIn) {
      await sendApi("logout");
      history.push("/");
      return;
    }
    console.log("buttonClickHandler");
    const multiLangList = [
      t("messages.invalid"),
      t("memberSystemPage.errorMessage.emptyColumns"),
      t("memberSystemPage.errorMessage.comma"),
    ];

    const errorMsg = inputVerifier(
      ownerFormInputList,
      setAccountActionStatus,
      multiLangList
    );
    if (errorMsg !== "") {
      // console.log(errorMsg);
      setAccountActionMessage(errorMsg);
      return;
    }

    const formInput =
      accountStatus === "login" ? copyOwnerLoginForm : copyOwnerRegisterForm;
    setOwnerLoginFormInputList(formInput);
    let sendData = {};
    ownerFormInputList.forEach((item) => {
      sendData[item.name] = item.value;
    });
    const parsedData = await sendApi(accountStatus, sendData);
    // console.log(parsedData.message);
    setAccountActionStatus(parsedData.status);
    setAccountActionMessage(parsedData.message);
    if (parsedData.status !== "ok") {
      return;
    }
    switch (accountStatus) {
      case "login":
        history.push("/");
        break;
      case "register":
        // history.go(0);
        break;
      case "logout":
        history.push("/");
        break;
      default:
        break;
    }
  };

  const handleChange = (formItem, targetValue) => {
    const list = ownerFormInputList.slice();
    for (let i = 0; i < list.length; i++) {
      if (list[i].label === formItem.label) {
        list[i].value = targetValue;
        break;
      }
    }
    setOwnerLoginFormInputList(list);
  };

  const handleInputClick = () => {
    setInputClick(true);
  };

  return (
    <div className="memberSystem common__pageFrame">
      <p className="common__block common__block--bilateral common__subtitle">
        {t("memberSystemPage.welcome")}
      </p>
      <div className="memberSystem__content">
        <div className="memberSystem__card">
          {isLoggedIn ? (
            <p className="memberSystem__card__loggedIn common__subtitle ">
              {t("memberSystemPage.loggedIn")}
            </p>
          ) : (
            <div className="memberSystem__card__form">
              <form>
                {ownerFormInputList.map((inputItem) => (
                  <div key={inputItem.label} className="form__item">
                    <label>{inputItem.label}</label>
                    <input
                      onClick={handleInputClick}
                      value={inputItem.value}
                      type={inputItem.type}
                      placeholder={inputItem.placeholder}
                      minLength={inputItem.minLength}
                      maxLength={inputItem.maxLength}
                      size={inputItem.size}
                      pattern={inputItem.pattern}
                      required={inputItem.required}
                      onChange={(e) => handleChange(inputItem, e.target.value)}
                    />
                  </div>
                ))}
              </form>
              {accountActionMessage !== "" && !inputClick && (
                <p
                  className={`memberSystem__card__message ${switchAccountMessageColor(
                    accountActionStatus
                  )}`}
                >
                  {accountActionMessage}
                </p>
              )}
            </div>
          )}

          <div className="memberSystem__card__button">
            {isLoggedIn && (
              <Link to="/management" className="home__content__btn">
                <Button text={t("features.management")}></Button>
              </Link>
            )}
            <Button
              text={
                isLoggedIn
                  ? t("memberSystemPage.card.instruction", {
                      returnObjects: true,
                    })["logout"]
                  : t("memberSystemPage.card.instruction", {
                      returnObjects: true,
                    })[accountStatus]
              }
              clickEvent={buttonClickHandler}
            />
          </div>
          {isLoggedIn ? null : (
            <div className="memberSystem__card__instruction ">
              <p
                className="memberSystem__card__instruction__action"
                onClick={clickAccountStatusHandler}
              >
                {t("memberSystemPage.card.hint")[accountStatus]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberSystem;
