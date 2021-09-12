import {
  SET_FORM_INPUT_LIST,
  SET_STEP,
  SET_SELECTED_DATA,
} from "../action/features/reservationAction";

const initState = {
  formInputList: [],
  step: "",
  selectedData: {},
};

const reservationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FORM_INPUT_LIST:
      return { ...state, formInputList: action.payload.formInputList };
    case SET_STEP:
      return { ...state, step: action.payload.step };
    case SET_SELECTED_DATA:
      return { ...state, selectedData: action.payload.selectedData };
    default:
      return state;
  }
};

export default reservationReducer;
