import { TODAY_DATE } from "../../utils/Date";
import {
  SET_BOARD_CALENDAR_DATE,
  SET_BOARD_SELECTED_ROOM,
  SET_BOARD_IS_READ_ONLY,
  SET_BOARD_REFRESH,
} from "../../action/features/boardAction";
const initState = {
  calendarDate: TODAY_DATE,
  selectedRoom: "",
  isReadOnly: false,
  needRefreshBoard: false,
};

const boardReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BOARD_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload.calendarDate };
    case SET_BOARD_SELECTED_ROOM:
      return { ...state, selectedRoom: action.payload.selectedRoom };
    case SET_BOARD_IS_READ_ONLY:
      return { ...state, isReadOnly: action.payload.isReadOnly };
    case SET_BOARD_REFRESH:
      return { ...state, needRefreshBoard: action.payload.needRefreshBoard };
    default:
      return state;
  }
};

export default boardReducer;
