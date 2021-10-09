
import { SET_ORDER_SEARCH_RESULT, SET_SHOW_ORDER_WINDOW } from "../../action/ui/orderEnquiryAction"
const initState = {
    orderSearchResult: [],
    showOrderWindow: false,
}

const orderEnquiryReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_ORDER_SEARCH_RESULT:
            return { ...state, orderSearchResult: action.payload.orderSearchResult }
        case SET_SHOW_ORDER_WINDOW:
            return { ...state, showOrderWindow: action.payload.showOrderWindow }
        default:
            return state;
    }

}
export default orderEnquiryReducer;