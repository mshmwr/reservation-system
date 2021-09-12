import { useDispatch } from "react-redux";

export const ADD_PLAN_DATA = "ADD_PLAN_DATA";
export const ADD_ATTENDENCE_DATA = "ADD_ATTENDENCE_DATA";
export const TEST_I18N = "TEST_I18N";

export default function useOrderAction() {
  const dispatch = useDispatch();

  const setPlanData = (inputPlanData) => {
    dispatch({
      type: ADD_PLAN_DATA,
      payload: { planData: inputPlanData },
    });
  };

  const setAttendenceData = (inputAttendenceData) => {
    dispatch({
      type: ADD_ATTENDENCE_DATA,
      payload: { attendenceData: inputAttendenceData },
    });
  };
  const setForm = (i18nInput) => {
    console.log("action i18nInput = " + i18nInput);
    dispatch({
      type: TEST_I18N,
      payload: { testI18n: i18nInput },
    });
  };

  return { setPlanData, setAttendenceData, setForm };
}
