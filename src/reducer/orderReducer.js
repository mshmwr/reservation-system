import { TODAY_DATE } from "../utils/Date";

import {
  ADD_PLAN_DATA,
  ADD_ATTENDENCE_DATA,
  CHANGE_ORDER_TIMELINE_DATA,
  REFRESH_ORDER_PAGE,
} from "../action/orderAction";

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
