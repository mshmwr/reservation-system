import { createStore, combineReducers } from "redux";
import orderReducer from "../reducer/orderReducer";

const rootReducer = combineReducers({
  orderReducer,
});

const store = createStore(rootReducer);

export default store;
