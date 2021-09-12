import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/orderReducer";
import timelineReducer from "../reducer/timelineReducer";
import boardReducer from "../reducer/boardReducer";

const rootReducer = combineReducers({
  orderReducer,
  timelineReducer,
  boardReducer,
});

const store = createStore(rootReducer);

export default store;
