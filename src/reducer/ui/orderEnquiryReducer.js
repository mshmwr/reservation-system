
import { SET_ORDER_SEARCH_RESULT } from "../../action/ui/orderEnquiryAction"
const initState = {
    orderSearchResult: [],
}

const orderEnquiryReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_ORDER_SEARCH_RESULT:
            return { ...state, orderSearchResult: action.payload.orderSearchResult }
        default:
            return state;
    }

}
export default orderEnquiryReducer;