import { useDispatch } from "react-redux";
export const SET_BOARD_CALENDAR_DATE = "SET_BOARD_CALENDAR_DATE";
export const SET_BOARD_IS_READ_ONLY = "SET_BOARD_IS_READ_ONLY";
export const SET_BOARD_REFRESH = "SET_BOARD_REFRESH";

export default function useBoardAction() {
  const dispatch = useDispatch();
  const setBoardCalendarDate = (inputCalendarDate) => {
    dispatch({
      type: SET_BOARD_CALENDAR_DATE,
      payload: {
        calendarDate: inputCalendarDate,
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
    setBoardIsReadOnly,
    setBoardRefresh,
  };
}
