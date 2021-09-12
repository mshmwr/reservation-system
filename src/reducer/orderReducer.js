import {
  ADD_PLAN_DATA,
  ADD_ATTENDENCE_DATA,
} from "../action/features/orderAction";

const initState = {
  planData: {},
  attendenceData: {},
  testI18n: [],
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PLAN_DATA:
      return { ...state, planData: action.payload.planData };
    case ADD_ATTENDENCE_DATA:
      return { ...state, attendenceData: action.payload.attendenceData };
    default:
      return state;
  }
};

export default orderReducer;
