import {
  SET_SELECTED_DTAE,
  SET_SHOW_DATE_ORDER_WINDOW,
} from "../../action/ui/dateOrderAction";
const initState = {
  maxOrdersNumber: 2, //constant number
  selectedDate: "",
  showDateOrderWindow: false,
};

const dateOrdersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_DTAE:
      return { ...state, selectedDate: action.payload.selectedDate };
    case SET_SHOW_DATE_ORDER_WINDOW:
      return {
        ...state,
        showDateOrderWindow: action.payload.showDateOrderWindow,
      };
    default:
      return state;
  }
};
export default dateOrdersReducer;
