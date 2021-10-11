import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/features/orderReducer";
import timelineReducer from "../reducer/features/timelineReducer";
import boardReducer from "../reducer/features/boardReducer";
import reservationReducer from "../reducer/features/reservationReducer";
import dialogReducer from "../reducer/ui/dialogReducer";
import orderEnquiryReducer from "../reducer/ui/orderEnquiryReducer";
import dateOrdersReducer from "../reducer/ui/dateOrdersReducer";

const rootReducer = combineReducers({
  orderReducer,
  timelineReducer,
  boardReducer,
  reservationReducer,
  dialogReducer,
  orderEnquiryReducer,
  dateOrdersReducer,
});

const store = createStore(rootReducer);

export default store;
