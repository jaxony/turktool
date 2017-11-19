export const addBox = (id, position) => {
  return {
    type: "ADD_BOX",
    id: id,
    position
  }
}

export const deleteBox = (id) => {
  return {
    type: "DELETE_BOX",
    id: id
  }
}

/**
 * Update position of an existing box.
 * @param {int} id 
 * @param {Object} position 
 */
export const updateBox = (id, position) => {
  return {
    type: "UPDATE_BOX",
    id: id,
    position
  }
}

export const startDrawing = (state) => {
  return {
    type: "START_DRAWING",
    state
  }
}

export const updateDrawing = (state) => {
  return {
    type: "UPDATE_DRAWING",
    state
  }
}

export const refreshDrawing = () => {
  return {
    type: "REFRESH_DRAWING"
  }
}

export const setImageProps = (height, width, offsetX, offsetY) => {
  return {
    type: "SET_IMAGE_PROPS",
    height,
    width,
    offsetX,
    offsetY
  }
}