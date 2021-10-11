import {
  SET_USER_INFO_VALUE,
  SET_STEP,
  SET_SELECTED_DATA,
} from "../../action/features/reservationAction";

const initState = {
  userInfoValue: { name: "", phone: "", email: "" },
  step: "",
  selectedData: {},//...planData, ...attendenceData, date: calendarDate
};

const reservationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_INFO_VALUE:
      return { ...state, userInfoValue: action.payload.userInfoValue };
    case SET_STEP:
      return { ...state, step: action.payload.step };
    case SET_SELECTED_DATA:
      return { ...state, selectedData: action.payload.selectedData };
    default:
      return state;
  }
};

export default reservationReducer;
