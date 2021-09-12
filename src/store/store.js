import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/orderReducer";
import timelineReducer from "../reducer/timelineReducer";
import boardReducer from "../reducer/boardReducer";
import reservationReducer from "../reducer/reservationReducer";

const rootReducer = combineReducers({
  orderReducer,
  timelineReducer,
  boardReducer,
  reservationReducer,
});

const store = createStore(rootReducer);

export default store;
