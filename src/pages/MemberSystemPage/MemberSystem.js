import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import "./MemberSystem.css";
import multiLang_CHT from "../../data.json";
import { postUser, patchUser, deleteUser } from "../../apis/usersApi";
import Button from "../../components/Button";
import { checkLoggedIn } from "../../utils/API";
import { validateInput } from "../../utils/Utils";

const inputVerifier = (ownerFormInputList, setAccountActionStatus) => {
  let errorMsg = "";
  const emptyColumns = ownerFormInputList.filter((col) => col.value === "");
  if (emptyColumns.length === 0) {
    //都有輸入資料
    //驗證合法性
    const valid = ownerFormInputList.every(
      (input) => validateInput(input) === true
    );
    if (!valid) {
      errorMsg += multiLang_CHT.messages.invalid;
    }
    return errorMsg;
  }
  setAccountActionStatus("");
  //錯誤訊息：請輸入帳號、密碼...etc
  errorMsg += multiLang_CHT.memberSystemPage.errorMessage.emptyColumns;
  emptyColumns.forEach((col, index) => {
    errorMsg += col.label;
    errorMsg +=
      index === emptyColumns.length - 1
        ? ""
        : multiLang_CHT.memberSystemPage.errorMessage.comma;
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
  const ownerLoginForm = multiLang_CHT.memberSystemPage.ownerLoginForm;
  const ownerRegisterForm = multiLang_CHT.memberSystemPage.ownerRegisterForm;

  const copyOwnerLoginForm = JSON.parse(JSON.stringify(ownerLoginForm));

  const copyOwnerRegisterForm = JSON.parse(JSON.stringify(ownerRegisterForm));

  const [accountStatus, setAccountStatus] = useState("login");
  const [accountActionMessage, setAccountActionMessage] = useState("");
  const [accountActionStatus, setAccountActionStatus] = useState("");
  const [inputClick, setInputClick] = useState(false);
  const [ownerFormInputList, setOwnerLoginFormInputList] =
    useState(copyOwnerLoginForm);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoggedIn(setIsLoggedIn);
  }, []);

  const clickAccountStatusHandler = () => {
    switchAccountStatus(accountStatus, setAccountStatus);
    const formInput =
      accountStatus === "login" ? copyOwnerRegisterForm : copyOwnerLoginForm;
    setAccountActionMessage("");
    setOwnerLoginFormInputList(formInput);
  };

  const buttonClickHandler = async () => {
    if (isLoggedIn) {
      const parsedData = await sendApi("logout");
      console.log(parsedData.message);
      return;
    }

    setInputClick(false);
    const errorMsg = inputVerifier(ownerFormInputList, setAccountActionStatus);
    if (errorMsg !== "") {
      console.log(errorMsg);
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
    console.log(parsedData.message);
    setAccountActionStatus(parsedData.status);
    setAccountActionMessage(parsedData.message);
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

  if (accountStatus === "register") {
    // return <Redirect to="/memberSystem" />
  }
  return (
    <div className="memberSystem common__pageFrame">
      <p className="common__block common__block--bilateral common__subtitle">
        {multiLang_CHT.memberSystemPage.welcome}
      </p>
      <div className="memberSystem__content">
        <div className="memberSystem__card">
          {isLoggedIn ? (
            <p className="memberSystem__card__loggedIn common__subtitle ">
              {multiLang_CHT.memberSystemPage.loggedIn}
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
              <Link
                to="/management"
                className="common__block home__content__btn"
              >
                <Button text="前往後台"></Button>
              </Link>
            )}
            <Button
              text={
                isLoggedIn
                  ? multiLang_CHT.memberSystemPage.card.instruction["logout"]
                  : multiLang_CHT.memberSystemPage.card.instruction[
                      accountStatus
                    ]
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
                {multiLang_CHT.memberSystemPage.card.hint[accountStatus]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberSystem;
