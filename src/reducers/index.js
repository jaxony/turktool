import { combineReducers } from "redux";
import committedBoxes from "./committedBoxes";
import currentBox from "./currentBox";
import imageProps from "./imageProps";

const turktoolApp = combineReducers({
  committedBoxes: committedBoxes,
  currentBox: currentBox,
  imageProps: imageProps
})

export default turktoolApp;