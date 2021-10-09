import { useDispatch } from "react-redux";
export const SET_ORDER_SEARCH_RESULT = "SET_ORDER_SEARCH_RESULT";

const useOrderEnquiryAction = () => {
    const dispatch = useDispatch();
    const setOrderSearchResult = (result) => {
        dispatch({
            type: SET_ORDER_SEARCH_RESULT,
            payload: { orderSearchResult: result }
        })
    }
    return { setOrderSearchResult };
}

export default useOrderEnquiryAction;