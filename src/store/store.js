import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/features/orderReducer";
import timelineReducer from "../reducer/features/timelineReducer";
import boardReducer from "../reducer/features/boardReducer";
import reservationReducer from "../reducer/features/reservationReducer";

const rootReducer = combineReducers({
  orderReducer,
  timelineReducer,
  boardReducer,
  reservationReducer,
});

const store = createStore(rootReducer);

export default store;
