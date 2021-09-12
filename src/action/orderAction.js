import { useDispatch } from "react-redux";

export const ADD_PLAN_DATA = "ADD_PLAN_DATA";
export const ADD_ATTENDENCE_DATA = "ADD_ATTENDENCE_DATA";

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

  return { setPlanData, setAttendenceData };
}
