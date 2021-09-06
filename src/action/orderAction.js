import { useDispatch } from "react-redux";

export const ADD_PLAN_DATA = "ADD_PLAN_DATA";
export const ADD_ATTENDENCE_DATA = "ADD_ATTENDENCE_DATA";
export const CHANGE_ORDER_TIMELINE_DATA = "CHANGE_ORDER_TIMELINE_DATA";
export const REFRESH_ORDER_PAGE = "REFRESH_ORDER_PAGE";

export default function useOrderAction() {
  const dispatch = useDispatch();

  const setPlanData = (inputPlanData) => {
    dispatch({
      type: "ADD_PLAN_DATA",
      payload: { planData: inputPlanData },
    });
  };

  const setAttendenceData = (inputAttendenceData) => {
    dispatch({
      type: "ADD_ATTENDENCE_DATA",
      payload: { attendenceData: inputAttendenceData },
    });
  };
  const setDateData = (inputDateData) => {
    dispatch({
      type: "CHANGE_ORDER_TIMELINE_DATA",
      payload: { dateData: inputDateData },
    });
  };

  const setNeedRefreshPage = (needFresh) => {
    dispatch({
      type: "REFRESH_ORDER_PAGE",
      payload: { needRefreshPage: needFresh },
    });
  };

  return { setPlanData, setAttendenceData, setDateData, setNeedRefreshPage };
}
