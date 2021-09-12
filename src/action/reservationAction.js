import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { validateInput } from "../utils/Utils";
import { postReservedData } from "../apis/reservedDataApi";

export const SET_FORM_INPUT_LIST = "SET_FORM_INPUT_LIST";
export const SET_STEP = "SET_STEP";
export const SET_SELECTED_DATA = "SET_SELECTED_DATA";

const filterFormData = (formInputList) => {
  let data = {};
  formInputList.forEach((item) => {
    data[item.name] = item.value;
  });
  return data;
};

export default function useOrderAction() {
  //history
  const history = useHistory();
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  //redux
  const formInputList = useSelector(
    (state) => state.reservationReducer.formInputList
  );
  const selectedData = useSelector(
    (state) => state.reservationReducer.selectedData
  );

  const dispatch = useDispatch();
  const setFormInputList = (formInput) => {
    console.log("action formInput = " + formInput);
    dispatch({
      type: SET_FORM_INPUT_LIST,
      payload: { formInputList: formInput },
    });
  };

  const setStep = (inputStep) => {
    console.log("action inputStep = " + inputStep);
    dispatch({
      type: SET_STEP,
      payload: { step: inputStep },
    });
  };

  const setSelectedData = (inputData) => {
    console.log("action selectedData = " + inputData);
    dispatch({
      type: SET_SELECTED_DATA,
      payload: { selectedData: inputData },
    });
  };

  const backClick = (step) => {
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

  const nextClick = async (step) => {
    console.log("nextClick: " + step);
    // return;
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

  return { setFormInputList, setStep, setSelectedData, backClick, nextClick };
}
