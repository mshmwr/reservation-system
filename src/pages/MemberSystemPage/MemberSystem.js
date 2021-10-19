import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import "./MemberSystem.css";
import { postUser, patchUser, deleteUser } from "../../apis/usersApi";
import Button from "../../components/ui/Button";
import { checkLoggedIn } from "../../utils/API";
import { validateInput } from "../../utils/Utils";
import { useTranslation } from "react-i18next";
import FormItem from "../../components/ui/FormItem";
import { deepCopy } from "../../utils/Utils";
import Loader from "../../components/ui/Loader";

const inputVerifier = (
  ownerFormInputList,
  formInputValue,
  setAccountActionStatus,
  multiLangList
) => {
  const [msg_invalid, msg_emptyColumns, msg_comma] = multiLangList;
  let errorMsg = "";
  const emptyColumns = ownerFormInputList.filter((col) => {
    return formInputValue[col.name] === "";
  });

  if (emptyColumns.length === 0) {
    //都有輸入資料
    //驗證合法性
    const valid = ownerFormInputList.every(
      (formItem) => validateInput(formItem, formInputValue) === true
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
      return "memberSystem__content__card__message--ok";
    case "error":
      return "memberSystem__content__card__message--error";
    default:
      return "memberSystem__content__card__message--error";
  }
};

const initOwnerLoginValue = { email: "", password: "" };

const initOwnerRegisterValue = { email: "", password: "", name: "" };

const userLoginStateEnum = {
  none: 0,
  login: 1,
  isWaitingResponse: 2,
  logout: 3,
};

function MemberSystem() {
  const history = useHistory();
  const isFirstInput = useRef(true);

  //i18n
  const { t } = useTranslation();
  const ownerLoginForm = t("memberSystemPage.ownerLoginForm", {
    returnObjects: true,
  });
  const ownerRegisterForm = t("memberSystemPage.ownerRegisterForm", {
    returnObjects: true,
  });

  const [accountStatus, setAccountStatus] = useState("login");
  const [accountActionMessage, setAccountActionMessage] = useState("");
  const [accountActionStatus, setAccountActionStatus] = useState("");
  const [formInputValue, setFormInputValue] = useState(
    deepCopy(initOwnerLoginValue)
  );
  const [loginState, setLoginState] = useState(
    userLoginStateEnum.isWaitingResponse
  );

  useEffect(() => {
    async function fetchData() {
      const isLogin = await checkLoggedIn();
      setLoginState(
        isLogin ? userLoginStateEnum.login : userLoginStateEnum.logout
      );
    }
    fetchData();
  }, []);

  const clickAccountStatusHandler = () => {
    switchAccountStatus(accountStatus, setAccountStatus);
    const value =
      accountStatus === "login"
        ? deepCopy(initOwnerRegisterValue)
        : deepCopy(initOwnerLoginValue);
    setAccountActionMessage("");
    setFormInputValue(value);
    if (!isFirstInput.current) {
      isFirstInput.current = true;
    }
  };

  const buttonClickHandler = async () => {
    //check login
    if (loginState === userLoginStateEnum.login) {
      await sendApi("logout");
      history.go(0);
      return;
    }

    //get error msg and show
    const multiLangList = [
      t("messages.invalid"),
      t("memberSystemPage.errorMessage.emptyColumns"),
      t("memberSystemPage.errorMessage.comma"),
    ];

    const errorMsg = inputVerifier(
      accountStatus === "login" ? ownerLoginForm : ownerRegisterForm,
      formInputValue,
      setAccountActionStatus,
      multiLangList
    );

    if (errorMsg !== "") {
      setAccountActionMessage(errorMsg);
      return;
    }

    //reset form input value
    const inputValue =
      accountStatus === "login"
        ? deepCopy(initOwnerLoginValue)
        : deepCopy(initOwnerRegisterValue);
    setFormInputValue(inputValue);

    //register or login
    let sendData = {};
    Object.entries(formInputValue).forEach(([key, value]) => {
      sendData[key] = value;
    });

    setLoginState(userLoginStateEnum.isWaitingResponse);
    const parsedData = await sendApi(accountStatus, sendData);
    setAccountActionStatus(parsedData.status);
    setAccountActionMessage(parsedData.message);
    if (parsedData.status !== "ok") {
      return;
    }

    history.go(0);
  };

  const handleChange = (formItem, targetValue) => {
    if (isFirstInput.current) {
      isFirstInput.current = false;
    }
    Object.keys(formInputValue).forEach((key) => {
      if (formItem.name === key) {
        setFormInputValue({ ...formInputValue, [key]: targetValue });
        return;
      }
    });
  };

  const handleInputClick = () => {
    setAccountActionMessage("");
  };

  return (
    <div className="memberSystem common__pageFrame">
      <div className="memberSystem__content">
        <p className="memberSystem__content__title common__subtitle">
          {t("memberSystemPage.welcome")}
        </p>
        <div className="memberSystem__content__card">
          {loginState === userLoginStateEnum.login ? (
            <p className="memberSystem__content__card__loggedIn common__subtitle">
              {t("memberSystemPage.loggedIn")}
            </p>
          ) : loginState === userLoginStateEnum.logout ? (
            <div className="memberSystem__content__card__form">
              <FormItem
                formList={
                  accountStatus === "login" ? ownerLoginForm : ownerRegisterForm
                }
                formInputValue={formInputValue}
                handleInputClick={handleInputClick}
                handleChange={handleChange}
                isFirstInput={isFirstInput.current}
              />
            </div>
          ) : (
            <Loader />
          )}

          {loginState === userLoginStateEnum.logout &&
            accountActionMessage !== "" && (
              <p
                className={`memberSystem__content__card__message ${switchAccountMessageColor(
                  accountActionStatus
                )}`}
              >
                {accountActionMessage}
              </p>
            )}

          {loginState !== userLoginStateEnum.isWaitingResponse && (
            <>
              <div className="memberSystem__content__card__button">
                {loginState === userLoginStateEnum.login && (
                  <Link to="/management" className="home__content__btn">
                    <Button text={t("features.management")}></Button>
                  </Link>
                )}
                <Button
                  text={
                    loginState === userLoginStateEnum.login
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

              {loginState === userLoginStateEnum.logout && (
                <div className="memberSystem__content__card__instruction ">
                  <p
                    className="memberSystem__content__card__instruction__action"
                    onClick={clickAccountStatusHandler}
                  >
                    {
                      t("memberSystemPage.card.hint", {
                        returnObjects: true,
                      })[accountStatus]
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberSystem;
