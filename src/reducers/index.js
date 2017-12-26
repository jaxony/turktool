import { combineReducers } from "redux";
import committedBoxes from "./committedBoxes";
import imageProps from "./imageProps";

const turktoolApp = combineReducers({
  committedBoxes: committedBoxes,
  imageProps: imageProps
})

export default turktoolApp;