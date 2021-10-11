import { useDispatch } from "react-redux";
export const SET_SELECTED_DTAE = "SET_SELECTED_DTAE";
export const SET_SHOW_DATE_ORDER_WINDOW = "SET_SHOW_DATE_ORDER_WINDOW";
const useDateOrderAction = () => {
    const dispatch = useDispatch();
    const setSelectedDate = (date) => {
        dispatch({
            type: SET_SELECTED_DTAE,
            payload: { selectedDate: date }
        })
    }
    const setShowDateOrderWindow = (isShow) => {
        dispatch({
            type: SET_SHOW_DATE_ORDER_WINDOW,
            payload: { showDateOrderWindow: isShow }
        })
    }
    return { setSelectedDate, setShowDateOrderWindow };
}

export default useDateOrderAction;