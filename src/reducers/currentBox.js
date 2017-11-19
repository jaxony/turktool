const initialState = {
  isDrawing: false,
  currentBoxId: 0,
  startX: null,
  startY: null,
  currX: null,
  currY: null
}

const currentBox = (state = initialState, action) => {
  switch (action.type) {
    // add new box to the Redux store
    case "START_DRAWING":
      return {
        ...state,
        isDrawing: true,
        startX: action.state.startX,
        startY: action.state.startY,
        currX: action.state.currX,
        currY: action.state.currY
      }
    
    // delete an existing box from the Redux store
    case "UPDATE_DRAWING":
      return {
        ...state,
        currX: action.state.currX,
        currY: action.state.currY
      }

    // update the position of an existing box in the Redux store
    case "REFRESH_DRAWING":
      return {
        ...state,
        isDrawing: false,
        currentBoxId: state.isDrawing
          ? state.currentBoxId + 1
          : state.currentBoxId,
        startX: null,
        startY: null,
        currX: null,
        currY: null
      }

    default:
      return state
  }
}

export default currentBox;