import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/orderReducer";
import timelineReducer from "../reducer/timelineReducer";

const rootReducer = combineReducers({
  orderReducer,
  timelineReducer,
});

const store = createStore(rootReducer);

export default store;
