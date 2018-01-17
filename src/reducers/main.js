import { combineReducers } from "redux";
import committedBoxes from "./committedBoxes";
import imageProps from "./imageProps";

const main = combineReducers({ 
  committedBoxes: committedBoxes,
  imageProps: imageProps
})

export default main;
