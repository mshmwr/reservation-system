import React, { useState } from "react";
import "./Reservation.css";
import { useHistory } from "react-router-dom";
import { SelectRegion } from "./page/SelectRegion";
import { FillInRegin } from "./page/FillInRegion";
import { Stepper } from "../../components/Stepper";
import { postReservedData } from "../../apis/reservedDataApi";
import { validateInput } from "../../utils/Utils";

import { useTranslation } from "react-i18next";

function Reservation() {
  const { t } = useTranslation();
  const history = useHistory();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const userInfoForm = t("reservationPage.userinfoform", {
    returnObjects: true,
  });
  const copyUserInfoForm = JSON.parse(JSON.stringify(userInfoForm));
  const [step, setStep] = useState(steps[0]);
  const [formInputList, setFormInputList] = useState(copyUserInfoForm);
  //TODO(問助教):黑科技，把 formInputList 傳進 form 之後，他就get到值了，不用 setFormInputList 也可以，不要問我為什麼，我才是最想知道的那個人QQ
  const [selectedData, setSelectedData] = useState({});

  const backClick = () => {
    switch (step) {
      case steps[2]:
        setStep(steps[1]);
        break;
      case steps[1]:
        setStep(steps[0]);
        break;
      default:
        history.goBack();
        break;
    }
  };
  const nextClick = async () => {
    switch (step) {
      case steps[0]:
        setStep(steps[1]);
        break;
      case steps[1]:
        //驗證輸入合法性
        const valid = formInputList.every(
          (input) => validateInput(input) === true
        );
        if (!valid) {
          alert(t("messages.invalid"));
          break;
        }
        setStep(steps[2]);
        break;
      default:
        const orderStatusData = { order_status: "applied" };
        const sendData = {
          ...selectedData,
          ...filterFormData(formInputList),
          ...orderStatusData,
        };
        let parsedData = await postReservedData({ data: sendData });
        if (parsedData === null) {
          // console.log("fetch data is null");
          break;
        }
        history.push(`/thankyou?orderId=${parsedData.order_id}`);

        break;
    }
  };

  return (
    <div className="reservation common__pageFrame">
      <Stepper currentStep={step}></Stepper>
      <div className="reservation__content">
        {step === steps[0] ? (
          <SelectRegion
            backClick={backClick}
            nextClick={nextClick}
            nextButtonText={t("reservationPage.selectStep.button.next")}
            dataListItems={t("reservationPage.selectStep.listItems", {
              returnObjects: true,
            })}
            setSelectedData={setSelectedData}
          ></SelectRegion>
        ) : (
          <FillInRegin
            titles={t("reservationPage.titles", { returnObjects: true })}
            subTitles={t("reservationPage.subTitles", { returnObjects: true })}
            planItems={t("reservationPage.fillInStep.planItems", {
              returnObjects: true,
            })}
            formInputList={formInputList}
            setFormInputList={setFormInputList}
            backClick={backClick}
            nextClick={nextClick}
            buttonTexts={t("reservationPage.fillInStep.button", {
              returnObjects: true,
            })}
            steps={steps}
            step={step}
            selectedData={selectedData}
          ></FillInRegin>
        )}
      </div>
    </div>
  );
}

export default Reservation;

const filterFormData = (formInputList) => {
  let data = {};
  formInputList.forEach((item) => {
    data[item.name] = item.value;
  });
  return data;
};
