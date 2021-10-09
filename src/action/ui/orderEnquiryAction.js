import { useDispatch } from "react-redux";
export const SET_ORDER_SEARCH_RESULT = "SET_ORDER_SEARCH_RESULT";
export const SET_SHOW_ORDER_WINDOW = "SET_SHOW_ORDER_WINDOW";
const useOrderEnquiryAction = () => {
    const dispatch = useDispatch();
    const setOrderSearchResult = (result) => {
        dispatch({
            type: SET_ORDER_SEARCH_RESULT,
            payload: { orderSearchResult: result }
        })
    }
    const setShowOrderWindow = (isShow) => {
        dispatch({
            type: SET_SHOW_ORDER_WINDOW,
            payload: { showOrderWindow: isShow }
        })
    }
    return { setOrderSearchResult, setShowOrderWindow };
}

export default useOrderEnquiryAction;