import undoable, { distinctState } from 'redux-undo';

/**
 * Shape is { 1: {}, 2: {}, ... }
 */

const boxes = (state = {}, action) => {
  switch (action.type) {
    // add new box to the Redux store
    case "ADD_BOX":
      let newId = action.id;
      return {
        ...state,
        [newId]: {
          id: newId,
          position: action.position
        }
      }
    
    // delete an existing box from the Redux store
    case "DELETE_BOX":
      let deleteId = (action.id).toString();
      return Object.keys(state).reduce((result, key) => {
        if (key !== deleteId) {
          result[key] = state[key];
        }
        return result;
      }, {});

    // update the position of an existing box in the Redux store
    case "UPDATE_BOX":
      let updateId = action.id;
      return Object.keys(state).reduce((result, key) => {
        if (key === updateId) {
          let box = state[key];
          result[key] = {
            ...box,
            position: action.position
          }
        } else {
          result[key] = state[key];
        }
        return result;
      }, {});

    default:
      return state
  }
}

const undoableBoxes = undoable(boxes, {
  filter: distinctState()
});

export default undoableBoxes