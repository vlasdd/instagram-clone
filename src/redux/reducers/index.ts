import { combineReducers, CombinedState } from "redux";
import { userReducer } from "./userReducers";

const reducers = combineReducers({
    currentUser: userReducer
})

export default reducers;