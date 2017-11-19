import { combineReducers } from "redux";
import committedBoxes from "./boxes";
import currentBox from "./currentBox";

const turktoolApp = combineReducers({
  committedBoxes,
  currentBox
})

export default turktoolApp;