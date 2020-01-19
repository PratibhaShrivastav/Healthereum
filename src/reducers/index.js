import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import hospitalReducer from "./hospitalReducer";
import searchReducer from "./search";
export default combineReducers({
  auth: authReducer,
  app: appReducer,
  hospital: hospitalReducer,
  search: searchReducer
});
