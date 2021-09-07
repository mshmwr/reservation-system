import { useDispatch } from "react-redux";
export const SET_BOARD_CALENDAR_DATE = "SET_BOARD_CALENDAR_DATE";
export const SET_BOARD_SELECTED_ROOM = "SET_BOARD_SELECTED_ROOM";
export const SET_BOARD_IS_READ_ONLY = "SET_BOARD_IS_READ_ONLY";
export const SET_BOARD_REFRESH = "SET_BOARD_REFRESH";

export default function useBoardAction() {
  const dispatch = useDispatch();
  const setBoardCalendarDate = (inputCalendarDate) => {
    console.log(inputCalendarDate);
    dispatch({
      type: SET_BOARD_CALENDAR_DATE,
      payload: {
        calendarDate: inputCalendarDate,
      },
    });
  };
  const setBoardSelectedRoom = (inputSelectedRoom) => {
    dispatch({
      type: SET_BOARD_SELECTED_ROOM,
      payload: {
        selectedRoom: inputSelectedRoom,
      },
    });
  };
  const setBoardIsReadOnly = (isBoardReadOnly) => {
    dispatch({
      type: SET_BOARD_IS_READ_ONLY,
      payload: {
        isReadOnly: isBoardReadOnly,
      },
    });
  };
  const setBoardRefresh = (needFresh) => {
    dispatch({
      type: SET_BOARD_REFRESH,
      payload: { needRefreshBoard: needFresh },
    });
  };

  return {
    setBoardCalendarDate,
    setBoardSelectedRoom,
    setBoardIsReadOnly,
    setBoardRefresh,
  };
}
