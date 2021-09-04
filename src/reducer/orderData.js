import { TODAY_DATE } from "../utils/Date";

const ADD_PLAN_DATA = "ADD_PLAN_DATA";
const ADD_ATTENDENCE_DATA = "ADD_ATTENDENCE_DATA";
const CHANGE_ORDER_TIMELINE_DATA = "CHANGE_ORDER_TIMELINE_DATA";
const REFRESH_ORDER_PAGE = "REFRESH_ORDER_PAGE";

const initState = {
  planData: {},
  attendenceData: {},
  dateData: TODAY_DATE,
  needRefreshPage: false,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PLAN_DATA:
      return { ...state, planData: action.payload.planData };
    case ADD_ATTENDENCE_DATA:
      return { ...state, attendenceData: action.payload.attendenceData };
    case CHANGE_ORDER_TIMELINE_DATA:
      return { ...state, dateData: action.payload.dateData };
    case REFRESH_ORDER_PAGE:
      return { ...state, needRefreshPage: action.payload.needRefreshPage };
    default:
      return state;
  }
};

export default orderReducer;
