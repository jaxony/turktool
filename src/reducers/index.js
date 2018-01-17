import { combineReducers } from "redux";
import committedBoxes from "./committedBoxes";
import imageProps from "./imageProps";

const turktoolApp = combineReducers({
  turktool: {
    committedBoxes: committedBoxes,
    imageProps: imageProps
  }
})

export default turktoolApp;
