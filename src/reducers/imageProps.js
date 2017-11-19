const imageSize = (state = {}, action) => {
  switch (action.type) {
    case "SET_IMAGE_PROPS":
      return {
        width: action.width,
        height: action.height,
        offsetX: action.offsetX,
        offsetY: action.offsetY
      }
    
    default:
      return state
  }
}

export default imageSize;