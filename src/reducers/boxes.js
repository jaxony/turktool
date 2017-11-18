const boxes = (state = [], action) => {
  switch (action.type) {
    // add new box to the Redux store
    case "ADD_BOX":
      return [
        ...state,
        {
          id: action.id,
          position: action.position
        }
      ]
    
    // delete an existing box from the Redux store
    case "DELETE_BOX":
      return state.filter(box => box.id !== action.id)

    // update the position of an existing box in the Redux store
    case "UPDATE_BOX":
      return state.map(box =>
        (box.id === action.id)
        ? {...box, position: action.position}
        : box
      )

    default:
      return state
  }
}

export default boxes