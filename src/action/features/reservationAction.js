import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { validateInput } from "../../utils/Utils";
import { postReservedData } from "../../apis/reservedDataApi";

export const SET_USER_INFO_VALUE = "SET_USER_INFO_VALUE";
export const SET_STEP = "SET_STEP";
export const SET_SELECTED_DATA = "SET_SELECTED_DATA";



export default function useOrderAction() {
  //history
  const history = useHistory();
  const dispatch = useDispatch();
  //i18n
  const { t } = useTranslation();
  const steps = t("stepper.steps", { returnObjects: true }); //["select", "fillIn", "finish"]
  const messageCheckReselect = t("messages.checkReselect"); //Are you sure you want to change it?"
  const userInfoForm = t("reservationPage.userinfoform", { returnObjects: true, });
  //redux
  const userInfoValue = useSelector(
    (state) => state.reservationReducer.userInfoValue
  );
  const selectedData = useSelector(
    (state) => state.reservationReducer.selectedData
  );

  //actions  
  const setUserInfoValue = (inputValue) => {
    dispatch({
      type: SET_USER_INFO_VALUE,
      payload: { userInfoValue: inputValue },
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

  const getReservedData = () => {
    const orderStatusData = { order_status: "applied" };
    const sendData = {
      ...selectedData,
      ...userInfoValue,
      ...orderStatusData,
    };
    return sendData;
  }

  const getDataSavedResponse = async (sendData) => {
    const parsedData = await postReservedData({ data: sendData });
    return parsedData;
  }

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
    //驗證輸入合法性
    const valid = userInfoForm.every((formItem) => validateInput(formItem, userInfoValue) === true);
    switch (step) {
      case steps[0]:
        setStep(steps[1]);
        break;
      case steps[1]:
        if (!valid) {
          alert(t("messages.invalid"));
          break;
        }

        setStep(steps[2]);
        break;

      default:
        if (!valid) {
          alert(t("messages.invalid"));
          break;
        }

        const parsedData = await getDataSavedResponse(getReservedData());
        history.push(`/thankyou?orderId=${parsedData.order_id}`);
        break;
    }
  };



  const checkReselect = () => {
    // Check whether reselect or not
    if (confirm(messageCheckReselect)) {
      // Save it!
      return true;
    } else {
      // Do nothing!
      return false;
    }
  }

  return { setUserInfoValue, setStep, setSelectedData, backClick, nextClick, checkReselect };
}
